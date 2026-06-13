export const SESSION_COOKIE = 'wc_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 дней

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length > 0) return secret;
  // В dev допускаем дефолт, в проде он небезопасен — настройте ADMIN_SESSION_SECRET.
  return 'dev-insecure-secret-change-me';
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === 'production' ? '' : 'admin');
}

const encoder = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Копирует байты в свежий ArrayBuffer (корректный BufferSource для WebCrypto). */
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const out = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(out).set(bytes);
  return out;
}

async function importKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Подписанный токен сессии: base64url(payload).base64url(hmac). */
export async function createSessionToken(): Promise<string> {
  const payload = { exp: Date.now() + SESSION_TTL_SECONDS * 1000 };
  const data = b64urlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await importKey();
  const signature = await crypto.subtle.sign('HMAC', key, toArrayBuffer(encoder.encode(data)));
  return `${data}.${b64urlEncode(new Uint8Array(signature))}`;
}

/** Проверяет подпись и срок жизни токена. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [data, signature] = token.split('.');
  if (!data || !signature) return false;

  try {
    const key = await importKey();
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      toArrayBuffer(b64urlDecode(signature)),
      toArrayBuffer(encoder.encode(data)),
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(data))) as { exp?: number };
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/** Постоянное по времени сравнение пароля с ADMIN_PASSWORD. */
export function verifyPassword(input: string): boolean {
  const expected = getPassword();
  if (expected.length === 0) return false;
  const a = encoder.encode(input);
  const b = encoder.encode(expected);
  // Сравниваем за константное время, не раскрывая длину раньше.
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
