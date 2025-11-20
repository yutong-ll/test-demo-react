import { Typography } from 'antd'
import type { HeaderSectionProps } from '../interface'
import { tagComponentPageClasses } from '../style'

const { Title, Paragraph } = Typography

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, description }) => (
  <div className={tagComponentPageClasses.header}>
    <div>
      <Title level={4} className="!mb-1">
        {title}
      </Title>
      <Paragraph type="secondary" className="!mb-0">
        {description}
      </Paragraph>
    </div>
  </div>
)

export default HeaderSection
