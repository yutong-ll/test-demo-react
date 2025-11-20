import type { FC } from 'react'
import { Button, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { testCasePageClasses } from '../style'

const HeaderSection: FC = () => (
  <section className={testCasePageClasses.header}>
    <div>
      <Typography.Title level={3} className="!mb-1">
        Test Cases Management
      </Typography.Title>
      <Typography.Paragraph className="!mb-0 text-gray-500">
        Manage and organize your test cases efficiently
      </Typography.Paragraph>
    </div>
    <Button icon={<UploadOutlined />}>Import</Button>
  </section>
)

export default HeaderSection

