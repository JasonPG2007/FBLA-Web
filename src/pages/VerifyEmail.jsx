import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function VerifyEmail() {
  // Variables
  let [isVerifying, setIsVerifying] = useState("");
  let [statusVerify, setStatusVerify] = useState(null);
  const [searchParams] = useSearchParams();

  // Handle verify email
  const handleVerifyEmail = async () => {
    setIsVerifying(true);

    try {
      const response = await axiosInstance.get(
        `/Users/verify-email?token=${searchParams.get("token")}&isForgotPassword=false`,
        {
          // withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        },
      );

      if (response.status === 200) {
        setStatusVerify(response.data.message);

        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: response.data.message,
              status: "success",
            },
          }),
        );
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message || "Server error";

        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: message,
              status: "error",
            },
          }),
        );
      } else if (error.request) {
        // If offline
        if (!navigator.onLine) {
          window.dispatchEvent(
            new CustomEvent("app-error", {
              detail: {
                message: "Network error. Please check your internet connection",
                status: "error",
              },
            }),
          );
        } else {
          // Server offline
          window.dispatchEvent(
            new CustomEvent("app-error", {
              detail: {
                message:
                  "Server is currently unavailable. Please try again later.",
                status: "error",
              },
            }),
          );
        }
      } else {
        // Other errors
        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: "Something went wrong. Please try again",
              status: "error",
            },
          }),
        );
      }
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Verify Email | Back2Me </title>
      </Helmet>

      <h1 style={{ textAlign: "center", marginTop: "70px" }}>
        {isVerifying ? "Verifying email..." : statusVerify}
      </h1>
    </>
  );
}
