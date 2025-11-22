import fs from 'fs';
import path from 'path';

console.log('🚀 main.ts started');

const reportPath = path.join(process.cwd(), 'report.json');
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString() }, null, 2));

console.log('✅ Report generated at', reportPath);
