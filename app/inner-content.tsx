'use client';
import {Layout, theme} from "antd";
import {PropsWithChildren} from "react";

const InnerContent = ({ children }: PropsWithChildren) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
            { children }
        </Layout>
    );
};

InnerContent.displayName = 'InnerContent';

export default InnerContent;