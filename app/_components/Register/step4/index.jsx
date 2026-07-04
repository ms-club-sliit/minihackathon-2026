"use client";
import { React, useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, Space, Col, Row, Upload } from "antd";

import { handleUpload, validateFileUpload, validateName, validateEmail, validateUniId, validateContact } from "@/app/utils";

const { Option } = Select;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const injectValuesToForm = (form, key, value) => {
  if (value != null) {
    form.setFieldValue(key, value);
  }
};

const Step4 = (props) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    injectValuesToForm(form, "name", props.stepData.name);
    injectValuesToForm(form, "contact", props.stepData.contact);
    injectValuesToForm(form, "email", props.stepData.email);
    injectValuesToForm(form, "uniId", props.stepData.uniId);
    injectValuesToForm(form, "faculty", props.stepData.faculty);
    injectValuesToForm(form, "academicYear", props.stepData.academicYear);

    if (props.stepData.img != null) {
      console.log(props.stepData.img);
      form.setFieldsValue({ "dragger": [...props.stepData.img] });
    }
  }, [form, props.stepData]);

  const uploadHandleWrapper = ({ file, onSuccess, onError, onProgress }) => {
    const setImageUrl = (url) => {
      props.stepData.imgUrl = url;
    };

    handleUpload(file, onSuccess, onError, onProgress, setFileList, setImageUrl);
  };

  const onFinish = (values) => {
    let stepData = {
      name: values.name,
      contact: values.contact,
      email: values.email,
      uniId: values.uniId,
      academicYear: values.academicYear,
      faculty: values.faculty,
      img: values.dragger,
      imgUrl: props.stepData.imgUrl
    };

    props.setHook("step4", stepData);
    console.log("Success:", values);
    props.next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Form
          size="large"
          name="basic"
          form={form}
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Member Name"
                name="name"
                rules={[{ validator: validateName }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Member's Contact"
                name="contact"
                rules={[{ validator: validateContact }]}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Member's Email"
                name="email"
                rules={[{ required: true, validator: validateEmail }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="SLIIT ID"
                name="uniId"
                rules={[{ required: true, validator: validateUniId }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="faculty"
                label="SLIIT Faculty"
                hasFeedback
                rules={[{ required: true, message: "Please select your Faculty!" }]}
              >
                <Select placeholder="Please select a faculty">
                  <Option value="Faculty of Computing">Faculty of Computing</Option>
                  <Option value="Faculty of Engineering">Faculty of Engineering</Option>
                  <Option value="Faculty of Business">Faculty of Business</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="academicYear"
                label="Academic Year"
                hasFeedback
                rules={[{ required: true, message: "Please select your current academic year!" }]}
              >
                <Select placeholder="Please select an academic year">
                  <Option value="Year 01 Semester 01">Year 01 Semester 01</Option>
                  <Option value="Year 01 Semester 02">Year 01 Semester 02</Option>
                  <Option value="Year 02 Semester 01">Year 02 Semester 01</Option>
                  <Option value="Year 02 Semester 02">Year 02 Semester 02</Option>
                  <Option value="Year 03 Semester 01">Year 03 Semester 01</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col xs={24}>
              <Form.Item label="Upload Image">
                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                  rules={[{ validator: validateFileUpload }]}
                >
                  <Upload.Dragger
                    name="files"
                    maxCount={1}
                    customRequest={uploadHandleWrapper}
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload profile image
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row> */}

          <Form.Item>
            <Space direction="vertical" size="middle" className="w-full">
              <Row gutter={16} justify="center">
                <Col>
                  <Button
                    htmlType="button"
                    onClick={() => props.BackHook()}
                  >
                    Previous
                  </Button>
                </Col>
                <Col>
                  <Button type="primary"
              htmlType="submit"
              className="w-full"
              style={{ backgroundColor: '#000000', borderColor: '#000000' }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Step4;