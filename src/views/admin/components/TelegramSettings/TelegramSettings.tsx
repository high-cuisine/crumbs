'use client';

import { useState } from 'react';
import styles from './TelegramSettings.module.scss';

interface TelegramSettingsProps {
  initialRecipients: string[];
  botConfigured: boolean;
}

export function TelegramSettings({ initialRecipients, botConfigured }: TelegramSettingsProps) {
  const [recipients, setRecipients] = useState<string[]>(initialRecipients);
  const [newRecipient, setNewRecipient] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  function handleRecipientChange(index: number, value: string) {
    setRecipients((prev) => prev.map((r, i) => (i === index ? value : r)));
  }

  function handleRemove(index: number) {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAdd() {
    const trimmed = newRecipient.trim();
    if (!trimmed) return;
    setRecipients((prev) => [...prev, trimmed]);
    setNewRecipient('');
  }

  function handleAddKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAdd();
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    setIsError(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramRecipients: recipients.filter(Boolean) }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Ошибка сохранения');
      }

      setStatus('Настройки сохранены');
    } catch (err) {
      setIsError(true);
      setStatus(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Telegram-бот</div>
        <div
          className={`${styles.tokenStatus} ${botConfigured ? styles.tokenOk : styles.tokenMissing}`}
        >
          {botConfigured ? '✓ Токен настроен' : '✗ Токен не задан'}
        </div>
        {!botConfigured && (
          <div className={styles.sectionNote}>
            Задайте переменную окружения <strong>TELEGRAM_BOT_TOKEN</strong> для активации
            уведомлений.
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Получатели уведомлений</div>
        <div className={styles.sectionNote}>
          Укажите Telegram chat_id или @username получателей заказов.
        </div>

        {recipients.length > 0 && (
          <div className={styles.recipients}>
            {recipients.map((recipient, index) => (
              <div key={index} className={styles.recipientRow}>
                <input
                  className={styles.recipientInput}
                  value={recipient}
                  onChange={(e) => handleRecipientChange(index, e.target.value)}
                  placeholder="chat_id или @username"
                />
                <button
                  className={styles.removeBtn}
                  type="button"
                  onClick={() => handleRemove(index)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.addRow}>
          <input
            className={styles.addInput}
            value={newRecipient}
            onChange={(e) => setNewRecipient(e.target.value)}
            onKeyDown={handleAddKeyDown}
            placeholder="Новый получатель"
          />
          <button className={styles.addBtn} type="button" onClick={handleAdd}>
            Добавить
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <button className={styles.saveBtn} type="button" onClick={handleSave} disabled={saving}>
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
        {status && (
          <div className={`${styles.status} ${isError ? styles.statusError : ''}`}>{status}</div>
        )}
      </div>
    </div>
  );
}
