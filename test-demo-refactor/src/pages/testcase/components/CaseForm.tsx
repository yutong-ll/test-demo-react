import type { FC } from 'react'
import { Checkbox, Divider, Form, Input, Row, Col, Select, Space } from 'antd'
import { BugOutlined, ThunderboltOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd/es/form'
import type { DefaultOptionType } from 'antd/es/select'
import type { CaseFormValues } from '../interface'

const { TextArea } = Input

interface CaseFormProps {
  form: FormInstance<CaseFormValues>
  tagOptions: DefaultOptionType[]
  projectOptions: DefaultOptionType[]
  componentOptions: DefaultOptionType[]
  featureOptions: DefaultOptionType[]
  ownerOptions: DefaultOptionType[]
  priorityOptions: DefaultOptionType[]
  testTypeOptions: DefaultOptionType[]
}

const CaseForm: FC<CaseFormProps> = ({
  form,
  tagOptions,
  projectOptions,
  componentOptions,
  featureOptions,
  ownerOptions,
  priorityOptions,
  testTypeOptions,
}) => (
  <Form form={form} layout="vertical" requiredMark="optional">
    <Row gutter={24}>
      <Col span={16}>
        <Form.Item
          label="Test Case Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Enter test case name" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Select tags" options={tagOptions} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      label="Steps"
      name="steps"
      rules={[{ required: true, message: 'Steps are required' }]}
    >
      <TextArea rows={4} placeholder="1. Step one..." />
    </Form.Item>

    <Form.Item
      label="Expected Result"
      name="expectedResult"
      rules={[{ required: true, message: 'Expected Result is required' }]}
    >
      <TextArea rows={2} placeholder="Expected outcome..." />
    </Form.Item>

    <Divider orientation="left" className="!my-3">
      Optional Details
    </Divider>

    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label="Project" name="project">
          <Select placeholder="Select Project" options={projectOptions} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Component" name="component">
          <Select placeholder="Select Component" options={componentOptions} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Feature" name="feature">
          <Select placeholder="Select Feature" options={featureOptions} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label="Owner" name="owner">
          <Select placeholder="Select Owner" options={ownerOptions} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Priority" name="priority">
          <Select options={priorityOptions} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Test Type" name="testType">
          <Select options={testTypeOptions} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item label="Options" className="!mb-2">
      <Space size="large">
        <Form.Item name="isAutomated" valuePropName="checked" noStyle>
          <Checkbox>
            <ThunderboltOutlined className="mr-1" />
            Automated
          </Checkbox>
        </Form.Item>
        <Form.Item name="isRegression" valuePropName="checked" noStyle>
          <Checkbox>
            <BugOutlined className="mr-1" />
            Regression
          </Checkbox>
        </Form.Item>
      </Space>
    </Form.Item>

    <Form.Item label="Description" name="description">
      <TextArea rows={3} placeholder="Additional description (optional)..." />
    </Form.Item>
  </Form>
)

export default CaseForm

