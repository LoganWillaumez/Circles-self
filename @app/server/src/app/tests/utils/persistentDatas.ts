import path from 'path';
import fs from 'fs';

export const getPersistedDatas = (): any => {
  const tempFilePath = path.join(process.cwd(), 'temp-user-info.json');
  const info = fs.readFileSync(tempFilePath, 'utf-8');
  return JSON.parse(info);
};
