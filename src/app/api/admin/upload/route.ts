import { NextResponse } from 'next/server';
import { UploadError, saveUploadedFile } from '@/server/media/storage';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
    }
    const media = await saveUploadedFile(file);
    return NextResponse.json({ url: media.url, media });
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('[admin/upload]', error);
    return NextResponse.json({ error: 'Не удалось загрузить файл' }, { status: 500 });
  }
}
