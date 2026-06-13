'use client';

import { useState } from 'react';
import styles from './ImageField.module.scss';

type ImageFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ImageField({ value, onChange }: ImageFieldProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error ?? 'Ошибка загрузки');
        return;
      }
      onChange(json.url);
    } catch {
      setError('Ошибка сети');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.field}>
      <div className={styles.preview}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={styles.image} />
        ) : (
          <span className={styles.empty}>нет изображения</span>
        )}
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          className={styles.url}
          value={value}
          placeholder="/uploads/... или URL"
          onChange={(event) => onChange(event.target.value)}
        />
        <label className={styles.upload}>
          {busy ? 'Загрузка…' : 'Загрузить файл'}
          <input type="file" accept="image/*" hidden onChange={handleFile} disabled={busy} />
        </label>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
