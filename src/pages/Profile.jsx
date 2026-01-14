import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InputMask from "react-input-mask";
import SidebarProfile from "../components/SidebarProfile";
import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";

export default function Profile() {
  // Variables
  let [user, setUser] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [dateOfBirth, setDateOfBirth] = useState("");
  let [avatarPreview, setAvatarPreview] = useState(null);
  let [selectedFileAvatar, setSelectedFileAvatar] = useState(null);
  let [isChangeDateOfBirth, setIsChangeDateOfBirth] = useState(false);
  let [isModify, setIsModify] = useState(false);
  let [isInProcessing, setIsInProcessing] = useState(false);

  // APIs

  // Functions
  // Handle change avatar
  const handleChangeAvatar = (file) => {
    if (!file) return;
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1014 * 1014; // 5MB

      // Check type of file
      if (!allowedTypes.includes(file.type)) {
        alert("Only accept JPG, PNG or WebP files");
        return;
      }

      if (file.size > maxSize) {
        alert("The image exceeds 5MB. Please select a smaller image");
        return;
      }

      // To upload to server
      setSelectedFileAvatar(file);

      // To preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsModify(true);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      file.target.value = "";
    }
  };

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];
    handleChangeAvatar(file);
  };

  const handleDropAvatar = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleChangeAvatar(file);
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

        // Set details
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setDateOfBirth(response.data.dateOfBirth);
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

  // Update profile
  const updateProfile = async (e) => {
    e.preventDefault();

    setIsInProcessing(true);

    const formData = new FormData();
    selectedFileAvatar && formData.append("avatarUpload", selectedFileAvatar); // Image
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (dateOfBirth && dateOfBirth.trim() != "" && !dateOfBirth.includes("_")) {
      formData.append("dateOfBirth", dateOfBirth);
    }

    try {
      const response = await axios.put(
        "https://localhost:44306/api/Users/update-user",
        formData,
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        await getMyProfile();

        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: response.data,
              status: "success",
            },
          })
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
        className="sidebar-and-content"
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
        <div
          className="profile-info-container"
          style={{ display: "flex", marginTop: "100px" }}
        >
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
            <form onSubmit={updateProfile}>
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
                      {!isInProcessing ? (
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
                          className="skeleton-input"
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
                      {!isInProcessing ? (
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
                          className="skeleton-input"
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
                      DOB:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {!isInProcessing ? (
                        <InputMask
                          mask={"99/99/9999"}
                          placeholder="mm/dd/yyyy"
                          value={
                            isChangeDateOfBirth
                              ? dateOfBirth
                              : dayjs(dateOfBirth).format("MM/DD/YYYY") || ""
                          }
                          className="form-control-input-label-top"
                          onChange={(e) => {
                            setDateOfBirth(e.target.value);
                            setIsChangeDateOfBirth(true);
                            setIsModify(true);
                          }}
                        ></InputMask>
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
                      {!isInProcessing ? (
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
                          className="skeleton-input"
                          height={45}
                          width={630}
                          style={{ marginBottom: "5px" }}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ fontWeight: "600" }}>
                      <label>Email: </label>
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {!isInProcessing ? (
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
                          className="skeleton-input"
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
                className="notify-me-section"
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
                  backgroundColor:
                    isModify && !isInProcessing ? "#ec7207" : "#d3d3d3",
                  color: isModify && !isInProcessing ? "#fff" : "#8c8c8c",
                  cursor:
                    isModify && !isInProcessing ? "pointer" : "not-allowed",
                  pointerEvents: isModify && !isInProcessing ? "auto" : "none",
                  opacity: isModify && !isInProcessing ? 1 : 0.6,
                }}
                disabled={!isModify || isInProcessing}
              >
                {isInProcessing ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Save changes"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Avatar */}
        <div
          style={{ marginLeft: "100px" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropAvatar}
        >
          {isInProcessing ? (
            <Skeleton
              height={420}
              width={420}
              style={{
                borderRadius: "12px",
                marginTop: "150px",
              }}
            />
          ) : (
            <img
              src={
                avatarPreview
                  ? avatarPreview
                  : user?.avatar
                  ? user.urlAvatar
                  : "./Image/user_icon.png"
              }
              alt="avatar"
              style={{
                borderRadius: "12px",
                width: "420px",
                height: "420px",
                objectFit: "cover",
                marginTop: "150px",
              }}
              loading="lazy"
            />
          )}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginLeft: "90px",
            }}
          >
            <div style={{ display: "flex" }}>
              <label
                className="btn"
                style={{
                  borderColor: "#ec7207",
                }}
                htmlFor="update-avatar"
              >
                Change
              </label>
              <input
                type="file"
                id="update-avatar"
                style={{ display: "none" }}
                onChange={handleUploadAvatar}
              />
            </div>
            <div>
              <button
                className="btn-with-border"
                style={{
                  borderColor: "#ec7207",
                }}
                type="button"
                onClick={() => {
                  setAvatarPreview(null);
                  setIsModify(false);
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
