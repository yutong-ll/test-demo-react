import { Button, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { reportPageClasses } from '../style'

interface HeaderSectionProps {
  onExport: () => void
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onExport }) => (
  <div className={reportPageClasses.header}>
    <div>
      <Typography.Title level={3} className="!mb-1">
        Test Report
      </Typography.Title>
      <Typography.Text type="secondary">Analyze quality metrics and plan evaluations</Typography.Text>
    </div>
    <Button icon={<DownloadOutlined />} onClick={onExport}>
      Export Report
    </Button>
  </div>
)

export default HeaderSection

