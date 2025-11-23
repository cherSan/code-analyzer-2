import path from "path";
import { existsSync, unlinkSync } from "node:fs";
import { readJSONSync, writeJSONSync } from "fs-extra";
import { v4 as uuidv4 } from 'uuid';

export const createMainReport = (files: string[]) => {
  const analyticPath = process.env.NEXT_PUBLIC_REPORT_DIR;
  if (!analyticPath) throw new Error('No analytic path provided');
  const file = 'report.json';
  const reportPath = path.join(analyticPath, file);
  const existedData: Record<string, string> = existsSync(reportPath) ? readJSONSync(reportPath) : {};
  const newData = files.reduce<Record<string, string>>((accum, file) => {
    if (
      file.endsWith('.ts')
      || file.endsWith('.tsx')
    ) {
      if (existedData[file]) accum[file] = existedData[file];
      else accum[file] = `${uuidv4()}.json`
    }
    return accum;
  }, {});

  Object.entries(existedData).forEach(([f, reportFile]) => {
    if (!newData[f]) {
      const filePath = path.join(analyticPath, reportFile);
      if (existsSync(filePath)) unlinkSync(filePath);
    }
  });

  writeJSONSync(reportPath, newData, { spaces: 2 });

  return newData;
}