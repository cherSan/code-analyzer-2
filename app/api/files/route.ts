import { NextResponse } from 'next/server';
import simpleGit from 'simple-git';
import type { TreeDataNode } from 'antd';

interface FileWithStatus {
    path: string;
    status: 'modified' | 'deleted' | 'created' | 'conflicted' | 'not_added' | 'staged';
}

export interface TreeNodeMap {
    title: string;
    key: string;
    children: Record<string, TreeNodeMap>;
    status?: FileWithStatus['status'];
    color?: string;
}

const statusColors: Record<FileWithStatus['status'], string> = {
    created: "green",
    modified: "orange",
    deleted: "red",
    conflicted: "purple",
    not_added: "gray",
    staged: "blue",
};

function buildTree(files: FileWithStatus[]): TreeDataNode[] {
    const tree: Record<string, TreeNodeMap> = {};

    files.forEach(({ path, status }) => {
        const parts = path.split('/');
        let current: Record<string, TreeNodeMap> = tree;

        parts.forEach((part, idx) => {
            const isFile = idx === parts.length - 1;

            if (!current[part]) {
                current[part] = {
                    title: `${isFile ? `[${status.substring(0, 3).toUpperCase()}] ` : ''}${part}`,
                    key: parts.slice(0, idx + 1).join('/'),
                    children: {},
                    status: isFile ? status : undefined,
                    color: isFile ? statusColors[status] : undefined,
                };
            }

            current = current[part].children;
        });
    });

    function convert(obj: Record<string, TreeNodeMap>): TreeDataNode[] {
        return Object.values(obj).map(({ title, key, children, color }) => {
            const childrenNodes = convert(children);
            return {
                title,
                key,
                children: childrenNodes.length > 0 ? childrenNodes : undefined,
                isLeaf: childrenNodes.length === 0,
                style: { color },
            };
        });
    }

    return convert(tree);
}

export const GET = async () => {
    const git = simpleGit();
    const status = await git.status();

    const files: FileWithStatus[] = [
        ...status.created.map<FileWithStatus>((p) => ({ path: p, status: 'created' })),
        ...status.modified.map<FileWithStatus>((p) => ({ path: p, status: 'modified' })),
        ...status.deleted.map<FileWithStatus>((p) => ({ path: p, status: 'deleted' })),
        ...status.conflicted.map<FileWithStatus>((p) => ({ path: p, status: 'conflicted' })),
        ...status.not_added.map<FileWithStatus>((p) => ({ path: p, status: 'not_added' })),
        ...status.staged.map<FileWithStatus>((p) => ({ path: p, status: 'staged' })),
    ];

    const treeData: TreeDataNode[] = buildTree(files);

    return NextResponse.json(treeData);
};
