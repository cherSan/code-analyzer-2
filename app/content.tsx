'use client';
import { Layout } from "antd";
import {PropsWithChildren} from "react";

const Content = (
    {children}: PropsWithChildren
) => (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
        {children}
    </Layout.Content>
);

Content.displayName = 'AppContent';
export default Content;