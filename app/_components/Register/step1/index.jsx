"use client";
import React from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { validateTeamName, validateURL } from "@/app/utils";

const Step1 = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    let stepData = {
      teamname: values.teamname,
      link: values.link
    }
    props.setHook("step1", stepData);
    props.next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="step-title text-center font-bold text-gray-900 text-xl sm:text-2xl mb-8 tracking-tight">
          Team Details
        </h2>
        <Form
          size="large"
          name="basic"
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
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">TEAM NAME <span className="text-red-500 font-bold">*</span></span>}
                name="teamname"
                rules={[
                  { required: true, message: "Please input your Team Name!" },
                  { validator: validateTeamName }
                ]}
                initialValue={props.stepData.teamname ?? ""}
              >
                <Input className="custom-input" placeholder="Enter team name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={<span className="text-xs font-bold text-gray-700 tracking-wider">ASSETS LINK <span className="text-red-500 font-bold">*</span></span>}
                name="link"
                rules={[
                  { required: true, message: "Please input your uploaded drive link!" },
                  { validator: validateURL }
                ]}
                initialValue={props.stepData.link ?? ""}
              >
                <Input className="custom-input" placeholder="https://github.com/... or Google Drive" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-center mt-6">
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn rounded-xl font-bold bg-black border-black text-white hover:bg-gray-800 hover:border-gray-800 h-12 px-12 transition-all duration-300"
                style={{ backgroundColor: '#111111', borderColor: '#111111' }}
              >
                NEXT
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Step1;