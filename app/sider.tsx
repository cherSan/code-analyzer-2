'use client';
import {Alert, Layout, theme, Tree, TreeDataNode} from "antd";
import { useRouter } from "next/navigation";
import {use, useEffect, useRef, useState} from "react";

const Sider = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [files, setFiles] = useState<TreeDataNode[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const load = async () => {
            setError(undefined);
            try{
                const res = await fetch("/api/files", { cache: "no-store" });
                setFiles(await res.json());
            } catch (err) {
                setFiles([]);
                setError(err?.toString());
            } finally {
                timer.current = setTimeout(load, 30000);
            }
        };
        load();
        return () => {
            if (timer.current) clearTimeout(timer.current);
        }
    }, []);

    const router = useRouter();

    return (
        <Layout.Sider style={{ background: colorBgContainer }} width={500}>
            {
                error
                    ? (
                        <Alert description={error} type="error" />
                    )
                    : (
                        <Tree.DirectoryTree
                            checkable
                            selectable
                            defaultExpandAll

                            onSelect={el => el[0] && router.push(`/file-viewer?path=${encodeURIComponent(el[0] as string)}`)}
                            treeData={files}
                        />
                    )
            }
        </Layout.Sider>
    );
}

Sider.displayName = "AppSider";

export default Sider;
