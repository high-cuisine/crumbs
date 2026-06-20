/**
 * `crypto.randomUUID()` доступен только в secure context (https или localhost) —
 * на проде без TLS он отсутствует и кидает TypeError. Здесь не нужна
 * криптографическая случайность, только уникальность id корзины.
 */
export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
