import { Spin } from 'antd'

const Loader: React.FC = () => (
  <div className="flex h-screen items-center justify-center bg-surface">
    <Spin size="large" />
  </div>
)

export default Loader
