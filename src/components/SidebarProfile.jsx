import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SidebarProfile() {
  // Variables
  let [user, setUser] = useState("");
  let [isInProcessing, setIsInProcessing] = useState(false);

  // APIs

  // Functions
  // Sign out
  const signOut = async () => {
    // e.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:44306/api/Users/sign-out`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status == 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get my profile
  const getMyProfile = async () => {
    setIsInProcessing(true);

    try {
      const response = await axios.get(
        "https://localhost:44306/api/Users/profile",
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsInProcessing(false);
    }
  };

  // UseEffect
  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : "Loading..."}{" "}
          | Back2Me{" "}
        </title>
      </Helmet>

      <div className="sidebarProfile">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Avatar */}
          {isInProcessing ? (
            <Skeleton height={60} width={60} style={{ borderRadius: "50%" }} />
          ) : user?.avatar ? (
            <img
              src={user.urlAvatar}
              alt="avatar"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src="./Image/user_icon.png"
              alt="avatar"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
            />
          )}
          <div className="user-info">
            <h3 className="user-name">
              {user.firstName ? (
                user.firstName
              ) : (
                <Skeleton height={30} width={110} />
              )}
            </h3>
            <h4 className="user-sub">
              {user.role ? (
                user.student.studentId ? (
                  `ID: ${user.student.studentId}`
                ) : (
                  user.role
                )
              ) : (
                <Skeleton height={20} width={92} style={{ marginTop: "5px" }} />
              )}
            </h4>
          </div>
        </div>

        {/* Personal information  */}
        <a
          href="/profile"
          style={{
            fontWeight: "400",
            lineHeight: "50px",
          }}
        >
          {" "}
          <i className="fa-solid fa-user"></i> Personal information
        </a>
        <br />
        {/* My post */}
        <a
          href="/my-post"
          style={{
            fontWeight: "400",
            lineHeight: "50px",
          }}
        >
          {" "}
          <i className="fa-solid fa-sim-card"></i> My post
        </a>
        <br />
        {/* Messeges */}
        <a
          href="/messeges"
          style={{
            fontWeight: "400",
            lineHeight: "50px",
          }}
        >
          {" "}
          <i className="fa-solid fa-envelope"></i> Messeges
        </a>
        <br />
        {/* Notifications */}
        <a
          href="/notifications"
          style={{
            fontWeight: "400",
            lineHeight: "50px",
          }}
        >
          {" "}
          <i className="fa-solid fa-bell"></i> Notifications
        </a>
        <br />

        {/* Log out */}
        <a
          href=""
          style={{
            fontWeight: "400",
            position: "absolute",
            bottom: "20px",
          }}
          onClick={(e) => {
            e.preventDefault();

            signOut();
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out
        </a>
      </div>
    </>
  );
}
