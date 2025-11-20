import { Button, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { ActionToolbarProps } from '../interface'
import { tagComponentPageClasses } from '../style'

const { Search } = Input

const ActionToolbar: React.FC<ActionToolbarProps> = ({ placeholder, buttonLabel, searchValue, onSearch, onChange, onCreate }) => (
  <div className={tagComponentPageClasses.toolbar}>
    <Search
      value={searchValue}
      placeholder={placeholder}
      allowClear
      enterButton={<SearchOutlined />}
      size="middle"
      onSearch={onSearch}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-sm"
    />
    <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
      {buttonLabel}
    </Button>
  </div>
)

export default ActionToolbar
