import { useMemo, useState } from 'react'
import { Modal, Select, Space, Typography, message } from 'antd'
import type { ReportExportOption } from '../interface'

interface ExportModalProps {
  open: boolean
  options: ReportExportOption[]
  onClose: () => void
}

const ExportModal: React.FC<ExportModalProps> = ({ open, options, onClose }) => {
  const defaultFormat = useMemo(() => options[0]?.value ?? 'pdf', [options])
  const [format, setFormat] = useState(defaultFormat)
  const selectValue = options.some((option) => option.value === format) ? format : defaultFormat

  const handleOk = () => {
    message.success('Report exported successfully')
    setFormat(defaultFormat)
    onClose()
  }

  const handleCancel = () => {
    setFormat(defaultFormat)
    onClose()
  }

  return (
    <Modal open={open} title="Export Report" onCancel={handleCancel} onOk={handleOk} okText="Download">
      <Typography.Paragraph>Select the format and sections you wish to include in your report.</Typography.Paragraph>
      <Space direction="vertical" className="w-full" size="large">
        <div>
          <div className="mb-2 font-medium">Format</div>
          <Select value={selectValue} className="w-full" options={options} onChange={setFormat} />
        </div>
      </Space>
    </Modal>
  )
}

export default ExportModal

