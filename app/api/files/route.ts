import { NextResponse } from 'next/server';
import type { TreeDataNode } from 'antd';
import { FileWithStatus, getModifiedFiles } from "@/utils/git.unit";

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
                selectable: childrenNodes.length === 0,
                style: { color },
            };
        });
    }

    return convert(tree);
}

export const GET = async () => {
    const files = await getModifiedFiles();
    const treeData = buildTree(files);
    return NextResponse.json(treeData);
};
