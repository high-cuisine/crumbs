import { notFound } from 'next/navigation';
import { getPageContent } from '@/server/content/repository';
import { PAGE_KEYS, type PageKey } from '@/server/content/schema';
import { ContentEditor } from '@/views/admin/components/ContentEditor';
import { sectionTitle } from '@/views/admin/helpers/fields';
import { saveSection } from './actions';
import styles from './section.module.scss';

export const dynamic = 'force-dynamic';

type PageParams = Promise<{ section: string }>;

export default async function AdminSectionPage({ params }: { params: PageParams }) {
  const { section } = await params;
  if (!PAGE_KEYS.includes(section as PageKey)) {
    notFound();
  }

  const content = getPageContent(section as PageKey);

  return (
    <div>
      <h1 className={styles.title}>{sectionTitle(section)}</h1>
      <p className={styles.hint}>
        Изменения применяются к сайту сразу после сохранения.
      </p>
      <ContentEditor section={section} initial={content} action={saveSection} />
    </div>
  );
}
