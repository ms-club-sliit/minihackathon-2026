"use client";
import { React, useEffect } from "react";
import { notification, Spin } from "antd";

import { registerTeam } from "@/app/utils";

const step6 = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, error, description) => {
    api[type]({
      message: error,
      description: description,
    });
  };

  useEffect(() => {
    const registerAndNotify = async () => {
      try {
        props?.onSubmitComplete(await registerTeam(props.teamData));
        openNotificationWithIcon(
          "info",
          "Registration completed",
          "Thank you for registering Minihackathon 2025. We'll send your email invitation shortly. Keep in touch with us."
        );
      } catch (error) {
        console.error(error);
        openNotificationWithIcon(
          "error",
          "Registration failed",
          "Kindly contact Minihackathon 2025 organizing committee and share this traceback message: " +
          error
        );
      }
    };

    registerAndNotify();
  }, []);

  return (
    <main>
      <div className="my-20">{contextHolder}</div>
      <div className="flex justify-center items-center h-screen">
        Generating Registration Ticket ... &nbsp; <Spin size="large" />
      </div>
    </main>
  );
};

export default step6;
