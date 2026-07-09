"use client";
import { React, useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Select, Form, Input, Space, Col, Row, Upload } from "antd";

import {
  handleUpload,
  validateFileUpload,
  validateName,
  validateEmail,
  validateUniId,
  validateContact
} from "@/app/utils";

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

const Step5 = (props) => {
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
      form.setFieldsValue({ dragger: [...props.stepData.img] });
    }
  }, [form, props.stepData]);

  const uploadHandleWrapper = ({ file, onSuccess, onError, onProgress }) => {
    const setImageUrl = (url) => {
      props.stepData.imgUrl = url;
    };

    handleUpload(
      file,
      onSuccess,
      onError,
      onProgress,
      setFileList,
      setImageUrl
    );
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

    props.setHook("step5", stepData);
    console.log("Success:", values);
    props.next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="step-title text-center font-bold text-gray-900 text-xl sm:text-2xl mb-8 tracking-tight">
          Member 4 (Optional) Details
        </h2>
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
          requiredMark={false}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">MEMBER NAME</span>}
                name="name"
                rules={[{ validator: validateName }]}
              >
                <Input className="custom-input" placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">MEMBER'S CONTACT</span>}
                name="contact"
                rules={[{ validator: validateContact }]}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              >
                <Input className="custom-input" placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">MEMBER'S EMAIL <span className="text-red-500 font-bold">*</span></span>}
                name="email"
                rules={[{ required: true, validator: validateEmail }]}
              >
                <Input className="custom-input" placeholder="Email Address" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">SLIIT ID <span className="text-red-500 font-bold">*</span></span>}
                name="uniId"
                rules={[{ required: true, validator: validateUniId }]}
              >
                <Input className="custom-input" placeholder="e.g. IT2104820" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="faculty"
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">SLIIT FACULTY <span className="text-red-500 font-bold">*</span></span>}
                hasFeedback
                rules={[{ required: true, message: "Please select your Faculty!" }]}
              >
                <Select placeholder="Select Faculty" className="custom-select">
                  <Option value="Faculty of Computing">Faculty of Computing</Option>
                  <Option value="Faculty of Engineering">Faculty of Engineering</Option>
                  <Option value="Faculty of Business">Faculty of Business</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="academicYear"
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">ACADEMIC YEAR <span className="text-red-500 font-bold">*</span></span>}
                hasFeedback
                rules={[{ required: true, message: "Please select your current academic year!" }]}
              >
                <Select placeholder="Select Year/Semester" className="custom-select">
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Form.Item className="mb-0 w-full sm:w-auto text-center">
              <Button
                htmlType="button"
                onClick={() => props.BackHook()}
                className="custom-btn rounded-xl font-bold border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black h-12 px-8 transition-all duration-300 w-full sm:w-auto"
                style={{ minWidth: '120px' }}
              >
                PREVIOUS
              </Button>
            </Form.Item>
            <Form.Item className="mb-0 w-full sm:w-auto text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn rounded-xl font-bold bg-black border-black text-white hover:bg-gray-800 hover:border-gray-800 h-12 px-8 transition-all duration-300 w-full sm:w-auto"
                style={{ backgroundColor: '#111111', borderColor: '#111111', minWidth: '120px' }}
              >
                NEXT
              </Button>
            </Form.Item>
            <Form.Item className="mb-0 w-full sm:w-auto text-center">
              <Button
                type="primary"
                htmlType="button"
                className="custom-btn rounded-xl font-bold bg-black border-black text-white hover:bg-gray-800 hover:border-gray-800 h-12 px-8 transition-all duration-300 w-full sm:w-auto"
                style={{ backgroundColor: '#111111', borderColor: '#111111', minWidth: '160px' }}
                onClick={() => props.next()}
              >
                SKIP AND REGISTER
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Step5;