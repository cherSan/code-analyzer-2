import simpleGit from "simple-git";

export interface FileWithStatus {
  path: string;
  status: 'modified' | 'deleted' | 'created' | 'conflicted' | 'not_added' | 'staged';
}

export const getModifiedFiles = async () => {
  const git = simpleGit();
  const status = await git.status();
  console.log(status);

  return [
    ...status.created.map<FileWithStatus>((p) => ({ path: p, status: 'created' })),
    ...status.modified.map<FileWithStatus>((p) => ({ path: p, status: 'modified' })),
    ...status.deleted.map<FileWithStatus>((p) => ({ path: p, status: 'deleted' })),
    ...status.conflicted.map<FileWithStatus>((p) => ({ path: p, status: 'conflicted' })),
    ...status.not_added.map<FileWithStatus>((p) => ({ path: p, status: 'not_added' })),
    ...status.staged.map<FileWithStatus>((p) => ({ path: p, status: 'staged' })),
  ];
}