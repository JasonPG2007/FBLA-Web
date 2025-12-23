import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SidebarProfile from "../components/SidebarProfile";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
  // Variables
  let [user, setUser] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [isModify, setIsModify] = useState(false);
  let [isInProcessing, setIsInProcessing] = useState(false);

  // APIs

  // Functions
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

        // Set details
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
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
          })
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
            })
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
            })
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
          })
        );
      }
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "15% 50% 15%",
          gap: "50px",
          // backgroundColor: "pink",
          position: "relative",
        }}
      >
        {/* Menu for profile */}
        <SidebarProfile></SidebarProfile>

        {/* Name of profile */}
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ width: "100%" }}>
            <h1
              style={{
                fontFamily: "Mochiy Pop One, sans-serif",
                fontSize: "20px",
                fontWeight: "100",
                marginLeft: "10px",
              }}
            >
              My profile
            </h1>
            <form>
              <table
                border="0"
                style={{
                  padding: "10px",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <tbody>
                  <tr className="table-tr">
                    <th
                      style={{
                        fontWeight: "600",
                        paddingRight: "100px",
                        width: "200px",
                      }}
                    >
                      First Name:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {user.firstName ? (
                        <input
                          placeholder="Ex: Jennie Nguyen"
                          type="text"
                          className="form-control-input-label-top"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);

                            setIsModify(true);
                          }}
                        />
                      ) : (
                        <Skeleton
                          height={45}
                          width={630}
                          style={{ marginBottom: "5px" }}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th
                      style={{
                        fontWeight: "600",
                        paddingRight: "100px",
                        width: "200px",
                      }}
                    >
                      Last Name:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {user.lastName ? (
                        <input
                          placeholder="Ex: Jennie Nguyen"
                          type="text"
                          className="form-control-input-label-top"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);

                            setIsModify(true);
                          }}
                        />
                      ) : (
                        <Skeleton
                          height={45}
                          width={630}
                          style={{ marginBottom: "5px" }}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ fontWeight: "600" }}>Role: </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {user.role ? (
                        <input
                          placeholder="Ex: 123 456 789"
                          type="text"
                          className="form-control-input-label-top"
                          value={user.role}
                          style={{ cursor: "not-allowed" }}
                          disabled
                        />
                      ) : (
                        <Skeleton
                          height={45}
                          width={630}
                          style={{ marginBottom: "5px" }}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ fontWeight: "600" }}>
                      <label>School Email: </label>
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {user.email ? (
                        <input
                          placeholder="Ex: demo@ex.io"
                          type="email"
                          className="form-control-input-label-top"
                          value={user.email}
                          style={{ cursor: "not-allowed" }}
                          disabled
                        />
                      ) : (
                        <Skeleton
                          height={45}
                          width={630}
                          style={{ marginBottom: "5px" }}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Notify me */}
              <div
                style={{
                  padding: "10px 10px 30px",
                }}
              >
                <div
                  style={{
                    padding: " 10px 0 10px",
                  }}
                >
                  <div className="notify-me">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#072138",
                        marginRight: "50%",
                        className: "notify-text",
                        marginBottom: "10px",
                      }}
                    >
                      Notify me when there is a new lost stuff post
                    </label>
                  </div>

                  <div className="notify-me">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#072138",
                        marginRight: "48%",
                        className: "notify-text",
                        marginBottom: "10px",
                      }}
                    >
                      Notify me when there is a new found stuff post
                    </label>
                  </div>

                  <div className="notify-me">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#072138",
                        marginRight: "45%",
                        className: "notify-text",
                      }}
                      htmlFor="notify-similar-mine"
                    >
                      Notify me when there is a post that similar to mine
                    </label>
                  </div>
                </div>
              </div>
              <button
                className="btn-yellow"
                style={{
                  width: "100%",
                  backgroundColor: isModify ? "#ec7207" : "#d3d3d3",
                  color: isModify ? "#fff" : "#8c8c8c",
                  cursor: isModify ? "pointer" : "not-allowed",
                  pointerEvents: isModify ? "auto" : "none",
                  opacity: isModify ? 1 : 0.6,
                }}
                disabled={!isModify}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>

        {/* Avatar */}
        <div style={{ marginLeft: "100px" }}>
          {isInProcessing ? (
            <Skeleton
              height={420}
              width={420}
              style={{
                borderRadius: "12px",
                marginTop: "150px",
              }}
            />
          ) : user?.avatar ? (
            <img
              src={`${user.urlAvatar}`}
              alt="avatar"
              style={{
                borderRadius: "12px",
                width: "420px",
                marginTop: "150px",
              }}
            />
          ) : (
            <img
              src="./Image/user_icon.png"
              alt="avatar"
              style={{
                borderRadius: "12px",
                width: "420px",
                marginTop: "150px",
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginLeft: "90px",
            }}
          >
            <div>
              <button
                className="btn"
                style={{
                  borderColor: "#ec7207",
                }}
              >
                Change
              </button>
            </div>
            <div>
              <button
                className="btn-with-border"
                style={{
                  borderColor: "#ec7207",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
