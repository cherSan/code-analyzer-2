import {ESLint} from 'eslint';
import { getConfig } from "@/utils/config";
import path from "path";

export const createEslintReport = async (files: string[]) => {
  const config = getConfig();
  const eslintConfig = config.eslint;
  const eslint = new ESLint({
    ignore: false,
    overrideConfig: eslintConfig,
    fix: false,
  });

  const projectPath = process.env.NEXT_PUBLIC_PROJECT_ROOT;

  if (!projectPath) throw new Error('No project path exist');

  const mapped = files.reduce<Record<string, string>>((accum, file) => {
    if (
      file.endsWith('.ts')
      || file.endsWith('.tsx')
    ) accum[path.join(projectPath, file)] = file;
    return accum;
  }, {});
  return await eslint.lintFiles(Object.keys(mapped));
}