'use client';
import {Layout, theme, Tree, TreeDataNode} from "antd";
import { useRouter } from "next/navigation";

const Sider = ({
   files
}: Readonly<{
    files: TreeDataNode[]
}>) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();

    return (
        <Layout.Sider style={{ background: colorBgContainer }} width={500}>
            <Tree.DirectoryTree
                checkable
                selectable
                defaultExpandAll
                onSelect={el => el[0] && router.push(`/file-viewer?path=${encodeURIComponent(el[0] as string)}`)}
                treeData={files}
            />
        </Layout.Sider>
    );
}

Sider.displayName = "AppSider";

export default Sider;
