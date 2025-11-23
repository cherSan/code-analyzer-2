'use client';

import {Button, Flex, Layout} from "antd";

const ActionPanel = () => {

    return (
        <Layout.Sider width="400">
            <Flex vertical gap="small" style={{ width: '100%' }}>
                <Button>Analyze</Button>
                <Button>Analyze</Button>
            </Flex>
        </Layout.Sider>
    )
}

ActionPanel.displayName = 'ActionPanel';

export default ActionPanel;