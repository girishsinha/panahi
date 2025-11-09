import fs from 'fs';
import path from 'path';

/**
 * Saves an uploaded File (from FormData) to a temporary folder.
 * @param file - A File object from FormData
 * @returns The local file path where the image was saved
 */
export async function saveImage(file: File): Promise<string> {
  if (!file) throw new Error('No file provided');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(tempDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return filePath;
  
}
