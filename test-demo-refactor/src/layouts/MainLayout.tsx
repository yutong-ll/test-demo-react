import { useMemo, useState } from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd'
import {
  AppstoreOutlined,
  DashboardOutlined,
  DownOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { globalClasses } from '@/styles/global'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const userMenu = {
  items: [{ key: 'logout', danger: true, label: '退出登录' }],
}

const menuItems = [
  { key: '/', label: '仪表盘', icon: <DashboardOutlined /> },
  { key: '/testcase', label: '测试用例', icon: <ExperimentOutlined /> },
  { key: '/testplan', label: '测试计划', icon: <FileTextOutlined /> },
  { key: '/testreport', label: '测试报告', icon: <AppstoreOutlined /> },
  { key: '/tag-component', label: '标签与组件', icon: <TagsOutlined /> },
]

interface BreadcrumbItem {
  label: string
  to?: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [{ label: '首页' }],
  '/testcase': [
    { label: '首页', to: '/' },
    { label: '测试用例' },
  ],
  '/testplan': [
    { label: '首页', to: '/' },
    { label: '测试计划' },
  ],
  '/testreport': [
    { label: '首页', to: '/' },
    { label: '测试报告' },
  ],
  '/tag-component': [
    { label: '首页', to: '/' },
    { label: '标签与组件' },
  ],
}

const MainLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const activeKey = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => breadcrumbMap[activeKey] ?? [{ label: '首页' }],
    [activeKey],
  )

  return (
    <Layout className="min-h-screen bg-surface">
      <Sider
        width={240}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        className="bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
            TM
          </div>
          {!collapsed && (
            <div>
              <Text strong className="block text-base">
                Test Management
              </Text>
              <Text type="secondary" className="text-xs">
                Quality Ops Suite
              </Text>
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-white px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((prev) => !prev)}
            />
            <Breadcrumb>
              {breadcrumbs.map((crumb) => (
                <Breadcrumb.Item key={crumb.label}>
                  {crumb.to ? (
                    <a onClick={() => navigate(crumb.to!)}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          <Dropdown menu={userMenu} trigger={['click']}>
            <Space className="cursor-pointer rounded-full px-3 py-2 transition hover:bg-gray-50">
              <Avatar src="https://picsum.photos/id/1005/200/200" size={40} />
              <div className="leading-tight">
                <Text strong>John Doe</Text>
                <div className="text-xs text-gray-500">QA Lead</div>
              </div>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>
        <Content className="p-8">
          <div className={globalClasses.page}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
