'use client';
import {App, ConfigProvider, theme} from 'antd';
import { PropsWithChildren } from 'react';

export const AntdThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                {children}
            </ConfigProvider>
        </App>
    );
};