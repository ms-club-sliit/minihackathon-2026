"use client";
import React from "react";
import { Button, Form, Input } from "antd";
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
      <div className="max-w-md mx-auto my-6">
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
        >
          <Form.Item
            label="Team Name"
            name="teamname"
            rules={[
              { required: true, message: "Please input your Team Name!" },
              { validator: validateTeamName }
            ]}
            initialValue={props.stepData.teamname ?? ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Assets Link"
            name="link"
            rules={[
              { required: true, message: "Please input your uploaded drive link!" },
              { validator: validateURL }
            ]}
            initialValue={props.stepData.link ?? ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              style={{ backgroundColor: '#000000', borderColor: '#000000' }}
            >
            Next
            </Button>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Step1;