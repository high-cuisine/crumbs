import type { Metadata } from 'next';
import { loginAction } from './actions';
import styles from './login.module.scss';

export const metadata: Metadata = {
  title: 'Вход — Админка WOW! CRUMBS',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string; next?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, next } = await searchParams;

  return (
    <main className={styles.page}>
      <form className={styles.card} action={loginAction}>
        <h1 className={styles.title}>Админка WOW! CRUMBS</h1>
        <p className={styles.subtitle}>Введите пароль для доступа к управлению контентом.</p>

        <input type="hidden" name="next" value={next ?? '/admin'} />
        <label className={styles.label}>
          <span>Пароль</span>
          <input
            className={styles.input}
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
          />
        </label>

        {error ? <p className={styles.error}>Неверный пароль</p> : null}

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </main>
  );
}
