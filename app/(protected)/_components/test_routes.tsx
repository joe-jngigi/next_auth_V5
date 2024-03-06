"use client";

import { adminServerAction } from "@/src/server-actions/test_server_action";
import React from "react";
import { AiOutlineApi } from "react-icons/ai";
import { toast } from "sonner";

export const TestRoutes = () => {
  const dateToday = new Date();
  const todayDate = new Date(dateToday.toISOString());

  const onAPIClick = async () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("This is an Admin Authorized API route", {
            dismissible: true,
            description: <>{todayDate.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });

          return response.text();
        } else {
          return response.text().then((text) => {
            // Extract error details from response body (if available)
            try {
              const errorData = JSON.parse(text);
              toast.error("The User is not an Admin", {
                dismissible: true,
                description: <>{dateToday.toDateString()}</>,
                cancel: {
                  label: "Cancel",
                  onClick: () => toast.info("Cancelled"),
                },
              });
              return Promise.reject(errorData.error || "Request failed."); // Handle specific error message if present
            } catch (error) {
              // If parsing fails, use generic error message
              toast.error("The User is not an Admin", {
                dismissible: true,
                description: <>{todayDate.toDateString()}</>,
                cancel: {
                  label: "Cancel",
                  onClick: () => toast.info("Cancelled"),
                },
              });
              return Promise.reject("Request failed.");
            }
          });
        }
      })
      .then((data) => {
        const parsedData = JSON.parse(data);
        console.log({ parsedData });
      });
  };

  const onServerActionClick = () => {
    try {
      adminServerAction().then((data) => {
        if (data.success) {
          toast.success("Test Server Action successful. The user is an admin", {
            dismissible: true,
            description: <>{todayDate.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
        if (data.error) {
          toast.error("The User is not an Admin", {
            dismissible: true,
            description: <>{todayDate.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-3 w-full h-full rounded-md flex flex-col items-center gap-5 ">
      {/* API Routes */}
      <div className="w-full flex-between items-center rounded-lg shadow-md p-2 border dark:border-gray-900 ">
        <p>API routes</p>
        <button
          onClick={onAPIClick}
          className="outline_btn w-48 text-xs dark:border-slate-800 dark:text-white "
        >
          Test API Route
          <AiOutlineApi size={17} className="ml-2" />
        </button>
      </div>

      {/* Server Action */}
      <div className="w-full flex-between items-center rounded-lg shadow-md p-2 border dark:border-gray-900 ">
        <p>Server Action</p>
        <button
          onClick={onServerActionClick}
          className="outline_btn w-48 text-xs dark:border-slate-800 dark:text-white "
        >
          Test Server Action
          <AiOutlineApi size={17} className="ml-2" />
        </button>
      </div>
    </div>
  );
};
