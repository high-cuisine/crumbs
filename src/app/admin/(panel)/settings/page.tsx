import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from '@/server/auth/session';
import { getSettings } from '@/server/settings/repository';
import { TelegramSettings } from '@/views/admin/components/TelegramSettings';
import styles from '../[section]/section.module.scss';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    redirect('/admin/login');
  }

  const settings = getSettings();
  const botConfigured = Boolean(process.env.TELEGRAM_BOT_TOKEN);

  return (
    <div>
      <h1 className={styles.title}>Настройки</h1>
      <TelegramSettings initialRecipients={settings.telegramRecipients} botConfigured={botConfigured} />
    </div>
  );
}
