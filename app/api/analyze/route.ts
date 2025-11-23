import { NextResponse } from 'next/server';
import { getModifiedFiles } from "@/utils/git.unit";
import { createMainReport } from "@/utils/report.util";
import { createEslintReport } from "@/utils/lint.util";

export const GET = async () => {
    const files = await getModifiedFiles();
    const mapped = files.map(file => file.path);
    createMainReport(mapped);
    const eslint = await createEslintReport(mapped);

  return NextResponse.json(eslint);
};
