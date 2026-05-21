import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'content/blog/assets');

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const filePath = path.resolve(ASSETS_DIR, ...segments);

  // 防止路径穿越
  if (!filePath.startsWith(ASSETS_DIR + path.sep) && filePath !== ASSETS_DIR) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
