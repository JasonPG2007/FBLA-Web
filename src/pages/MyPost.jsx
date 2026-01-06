import { Suspense, useEffect, useState } from "react";
import SidebarProfile from "../components/SidebarProfile";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import NotFoundPost from "../assets/animations/Not-Found-Post.json";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function MyPost() {
  // Variables
  const [posts, setPosts] = useState([]);
  const [isInProcessing, setIsInProcessing] = useState(false);
  const [user, setUser] = useState("");
  const [handoverStatus, setHandoverStatus] = useState({});
  const [objectToShowPopup, setObjectToShowPopup] = useState({
    name: "",
    code: "",
    postId: "",
  });

  // APIs

  // Functions
  // Realtime
  const connectToSignalR = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(
          "https://coat-responsible-frank-crm.trycloudflare.com/SystemHub"
        )
        .withAutomaticReconnect()
        .build();

      // Listen event from backend
      // Get new lost post code
      connection.on("ReceivePostHandedOver", (data) => {
        setPosts((prePosts) => {
          return prePosts.filter((p) => p.postId !== data.postId);
        });
      });

      connection.on("ReceiveStatusPost", (data) => {
        setHandoverStatus((preStatus) => {
          return {
            ...preStatus,
            [data.postId]: {
              ...preStatus[data.postId],
              status: data.status,
            },
          };
        });
      });

      connection.on("ReceiveStatusPostCancelled", (data) => {
        setHandoverStatus((preStatus) => {
          return {
            ...preStatus,
            [data.postId]: {
              ...preStatus[data.postId],
              status: data.status,
            },
          };
        });

        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: "Your request was not approved by the admin",
              status: "warning",
            },
          })
        );
      });

      // Start realtime
      await connection.start();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Handover to admin
  const handleCreateRequest = async () => {
    setIsInProcessing(true);

    try {
      const response = await axios.post(
        "https://coat-responsible-frank-crm.trycloudflare.com/api/TransferRequests",
        {
          postId: objectToShowPopup.postId,
          oldUserId: user.userId,
        },
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: response.data?.message,
              status: "success",
            },
          })
        );

        document.getElementById("popup-confirm-handover").style.display =
          "none";
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

  // Get my profile
  const getMyProfile = async () => {
    setIsInProcessing(true);

    try {
      const response = await axios.get(
        "https://coat-responsible-frank-crm.trycloudflare.com/api/Users/profile",
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

  // Get posts
  const handleFetchPosts = async () => {
    setIsInProcessing(true);

    try {
      const response = await axios.get(
        "https://coat-responsible-frank-crm.trycloudflare.com/api/Post/my-posts",
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        setPosts(response.data);
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

  // Get posts
  const handleGetStatusHandover = async () => {
    setIsInProcessing(true);

    const results = {};

    for (const post of posts) {
      if (post.typePost === "Found") {
        try {
          const response = await axios.get(
            `https://coat-responsible-frank-crm.trycloudflare.com/api/TransferRequests/status-request-post/${post.postId}`,
            {
              withCredentials: true,
              validateStatus: (status) =>
                status === 200 || status === 401 || status === 404,
            }
          );

          results[post.postId] = response.data;
        } catch (error) {
          console.log(error);

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
                    message:
                      "Network error. Please check your internet connection",
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
      }
    }
    console.log(isInProcessing);
    setHandoverStatus(results);
  };

  // Fetch data from API
  useEffect(() => {
    handleFetchPosts();
    getMyProfile();
    connectToSignalR(); // Run realtime
  }, []);

  useEffect(() => {
    handleGetStatusHandover();
  }, [posts]);

  useEffect(() => {
    const handleCodeToPrint = (event) => {
      const code = event.detail;

      document.getElementById("print-code").innerHTML = code;
      window.print();
    };

    window.addEventListener("codeToPrint", handleCodeToPrint);

    return () => {
      window.removeEventListener("codeToPrint", handleCodeToPrint);
    };
  }, []);

  return (
    <>
      <div
        className="sidebar-and-content"
        style={{
          display: "grid",
          gridTemplateColumns: "15% 85%",
          gap: "50px",
          // backgroundColor: "pink",
          position: "relative",
        }}
      >
        {/* Menu for profile */}
        <SidebarProfile></SidebarProfile>

        {/* Post similar to you */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "100px",
            gap: "30px",
          }}
        >
          <div className="status-filter">
            <p
              style={{
                backgroundColor: "#072138",
                width: "max-content",
                color: "white",
                padding: "1px 30px",
                borderRadius: "8px",
                position: "absolute",
                top: "-50%",
                left: "0",
                marginTop: "20px",
              }}
            >
              Status
            </p>
            <input type="radio" name="status" id="search-all" defaultChecked />{" "}
            <label htmlFor="search-all" id="search-all-label">
              <strong>All</strong>
            </label>
            <input
              type="radio"
              name="status"
              id="lost"
              style={{ marginLeft: "20px", marginTop: "25px" }}
            />{" "}
            <label htmlFor="lost" style={{ marginRight: "25px" }}>
              <strong>Lost</strong>
            </label>
            <input type="radio" name="status" id="found" />{" "}
            <label htmlFor="found">
              <strong>Found</strong>
            </label>
          </div>

          {/* Cards */}
          <div className="newest-post-container">
            {isInProcessing ? (
              <div style={{ display: "flex", gap: "20px" }}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="" key={index}>
                    <Skeleton
                      height={290}
                      style={{ marginBottom: "10px", borderRadius: "20px" }}
                    />
                    <div className="">
                      <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                        <Skeleton height={35} width={345} />
                      </h3>
                      <p>
                        <Skeleton count={3} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div className="card card-my-post" key={post.postId}>
                  {/* Image */}
                  {post.image ? (
                    <img
                      src={post.image ? post.urlImage : ""}
                      alt="picture of stuff"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        backgroundColor: "white",
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <i className="icon-image"></i>
                      <span>No image</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="card-text" style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                        <a href={`/detail-post/${post.postId}`}>{post.title}</a>
                      </h3>
                      {post.oldUserId && (
                        <label
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#6b7280",
                          }}
                        >
                          (Transferred)
                        </label>
                      )}
                    </div>
                    <a href={`/detail-post/${post.postId}`}>
                      <ReactMarkdown
                        children={post.description}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      ></ReactMarkdown>
                    </a>
                  </div>

                  {/* Status */}
                  <div
                    className={
                      post.typePost === "Lost"
                        ? "status-post-lost"
                        : "status-post-found"
                    }
                  >
                    {post.typePost}
                  </div>

                  {/* Show Code */}
                  {(post.typePost === "Lost" || user.role === "Admin") && (
                    <div className="show-code">{post.code}</div>
                  )}

                  {post.typePost === "Found" && user.role !== "Admin" && (
                    <button
                      className="btn"
                      style={{ width: "100%" }}
                      onClick={() => {
                        document.getElementById(
                          "popup-confirm-handover"
                        ).style.display = "flex";
                        document.body.style.overflow = "hidden";

                        setObjectToShowPopup({
                          name: post.title,
                          code: post.code,
                          postId: post.postId,
                        });
                      }}
                      disabled={
                        handoverStatus[post.postId]?.status === "Pending"
                      }
                    >
                      {handoverStatus[post.postId]?.status === "Pending"
                        ? "Pending"
                        : "Handed over to admin"}
                    </button>
                  )}

                  {user.role === "Admin" && post.typePost === "Found" && (
                    <button
                      className="btn"
                      style={{ width: "100%" }}
                      onClick={() => {
                        const code = `Code: ${post.code}`;

                        window.dispatchEvent(
                          new CustomEvent("codeToPrint", {
                            detail: code,
                          })
                        );
                      }}
                    >
                      Print Code
                    </button>
                  )}
                </div>
              ))
            ) : (
              <>
                <div
                  style={{
                    marginLeft: "100%",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "50px",
                  }}
                >
                  <Suspense fallback={<p>Loading animation...</p>}>
                    <Lottie
                      animationData={NotFoundPost}
                      className="m-auto"
                      style={{ width: "60%", margin: "auto" }}
                    />
                  </Suspense>
                  <h1>No posts yet</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="print-code" id="print-code"></div>

      {/* Popup confirm handover to admin */}
      <div className="modal" id="popup-confirm-handover">
        <div className="modal-content">
          <h2 style={{ backgroundColor: "transparent" }}>
            Have you handed{" "}
            <span style={{ color: "#ec7207" }}>{objectToShowPopup.name}</span>{" "}
            over to the admin?
          </h2>

          <div className="policy-section">
            <p
              style={{
                fontSize: "16px",
                color: "#555",
                fontStyle: "italic",
                marginTop: "4px",
              }}
            >
              Please confirm that you have handed the {objectToShowPopup.name}{" "}
              over to the admin.
            </p>
          </div>

          <div style={{ marginTop: "40px" }}>
            <button
              className="btn"
              onClick={() => {
                handleCreateRequest();
              }}
            >
              Confirm
            </button>
            <button
              className="btn-yellow"
              onClick={() => {
                document.getElementById(
                  "popup-confirm-handover"
                ).style.display = "none";
                document.body.style.overflow = "auto";
              }}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
