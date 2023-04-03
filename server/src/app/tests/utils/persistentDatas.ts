import path from "path";
import fs from 'fs';

export const getPersistedDatas = (): any => {
    const tempFilePath = path.join(process.cwd(), 'temp-user-info.json');
    const info = fs.readFileSync(tempFilePath, 'utf-8');
    console.log('🚀 ~ info:', info);
    return JSON.parse(info);
}