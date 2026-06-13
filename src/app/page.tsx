import { HomePage } from '@/views/home';

// Контент читается из CMS (БД) на каждый запрос — без устаревания после правок.
export const dynamic = 'force-dynamic';

export default function Page() {
  return <HomePage />;
}
