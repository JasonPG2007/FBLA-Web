import axios from "axios";
import dayjs from "dayjs";
import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
const Lottie = lazy(() => import("lottie-react"));
import EmptyGhost from "../assets/animations/empty_ghost.json";
import LoadingFiles from "../assets/animations/Loading_Files.json";
import axiosInstance from "../api/axiosInstance";

export default function DetailPost() {
  // Variables
  let [isInProcessing, setIsInProcessing] = useState(false);
  let [isRequesting, setIsRequesting] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  let [suggestPosts, setSuggestPosts] = useState([]);
  let [post, setPost] = useState("");
  let [user, setUser] = useState("");
  let [code, setCode] = useState("");
  const postId = location.pathname.split("/").pop();

  const handleChangeImage = (srcOld, srcNew, idImg) => {
    document.getElementById("big-img").src = srcNew;
    document.getElementById(idImg).src = srcOld;
  };

  // Get my profile
  const getMyProfile = async () => {
    setIsInProcessing(true);

    try {
      const response = await axiosInstance.get("/Users/profile", {
        // withCredentials: true,
        validateStatus: (status) =>
          status === 200 || status === 401 || status === 404,
      });

      if (response.status === 200) {
        setUser(response.data);
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
      setIsInProcessing(false);
    }
  };

  // Get random string include letters and numbers
  const getRandomString = (length) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      // Math random to get a random index
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  };

  // Handle match post
  const handleMatchPost = async (lostPostId, foundPostId) => {
    setIsRequesting(true);

    const codeIntoDb = getRandomString(6);
    setCode(codeIntoDb);

    const payload = {
      matchId: 0,
      lostPostId: lostPostId,
      foundPostId: foundPostId,
      code: codeIntoDb,
    };

    try {
      const response = await axiosInstance.post("/Match", payload, {
        // withCredentials: true,
        validateStatus: (status) =>
          status === 200 || status === 401 || status === 404,
      });

      if (response.status === 200) {
        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: "Match request sent successfully",
              status: "success",
            },
          }),
        );

        setIsShowPopup(true); // Show popup notice code
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
      setIsRequesting(false);
    }
  };

  // Get posts
  const handleFetchPosts = async () => {
    setIsInProcessing(true);

    try {
      const response = await axiosInstance.get(`/Post/${postId}`, {
        // withCredentials: true,
        validateStatus: (status) =>
          status === 200 || status === 401 || status === 404,
      });

      if (response.status === 200) {
        setPost(response.data);
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
      setIsInProcessing(false);
    }
  };

  // Get posts
  const handleFetchSuggestPost = async () => {
    setIsInProcessing(true);

    try {
      const response = await axiosInstance.get(`/Post/suggest-post/${postId}`, {
        // withCredentials: true,
        validateStatus: (status) =>
          status === 200 || status === 401 || status === 404,
      });

      if (response.status === 200) {
        setSuggestPosts(response.data);
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
      setIsInProcessing(false);
    }
  };

  // Call fetch data from API
  useEffect(() => {
    handleFetchPosts();
    handleFetchSuggestPost();
    getMyProfile();
  }, []);

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>{post.title || "Post"} | Back2Me </title>
      </Helmet>

      {/* Menu bar for post */}
      <div
        style={{
          display: "flex",
          // justifyContent: "flex-start",
          alignItems: "center",
          padding: "30px 1px",
          fontWeight: "300",
          color: "#072138",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 1px",
          }}
        >
          <a href="/">
            <p>Home</p>
          </a>
          <i className="fa-solid fa-angle-right icon-light"></i>
          <a href="/search">
            <p>Search</p>
          </a>
          <i className="fa-solid fa-angle-right icon-light"></i>
          <a href="">
            <p>Post</p>
          </a>
        </div>
      </div>

      {/* Check post if available */}
      {isInProcessing ? (
        <div className="not-found">
          <Suspense fallback={<p>Loading animation...</p>}>
            <Lottie
              animationData={LoadingFiles}
              style={{ width: "50%", margin: "auto" }}
            />
          </Suspense>
          <h1 style={{ fontSize: "40px", marginTop: "20px" }}>Loading...</h1>
        </div>
      ) : post ? (
        <>
          <div
            style={{
              display: "flex",
            }}
          >
            <h1
              style={{
                color: "#072138",
                padding: "20px 0",
                fontSize: "40px",
              }}
            >
              {isInProcessing ? (
                <Skeleton
                  height={45}
                  width={300}
                  style={{
                    borderRadius: "12px",
                  }}
                />
              ) : (
                post.title
              )}
            </h1>
            {user.email !== post.user?.email ? (
              <button
                style={{
                  marginLeft: "auto",
                  height: "max-content",
                }}
                className="btn-yellow"
                onClick={() => {
                  // const chatPopup = document.getElementById("chatPopup");
                  // chatPopup.style.display = "flex";

                  const chatBubble = document.getElementById("chatBubble");
                  const chatPopup = document.getElementById("chatPopup");
                  if (chatPopup.style.display === "flex") {
                    chatPopup.style.display = "none";
                  } else {
                    chatPopup.style.display = "flex";
                  }

                  // Click outside to close
                  document.addEventListener("click", (e) => {
                    if (
                      chatBubble.contains(e.target) &&
                      chatPopup.contains(e.target)
                    ) {
                      chatPopup.style.display = "none";
                    }
                  });

                  const temporaryMsg = {
                    message:
                      post.typePost === "Lost"
                        ? `Hello, I'm contacting you regarding your lost item post: "${post.title}" (Post ID: ${post.postId}). I may have information related to it.`
                        : `Hello, I'm contacting you regarding your found item post: "${post.title}" (Post ID: ${post.postId}). I think this item might belong to me.`,
                    urlAvatar: post.user.urlAvatar,
                    firstName: post.user.firstName,
                    lastName: post.user.lastName,
                    userIdSend: user.userId,
                    userIdReceive: post.user.userId,
                    postId: post.postId,
                  };

                  window.dispatchEvent(
                    new CustomEvent("contact-owner", {
                      detail: temporaryMsg,
                    }),
                  );
                }}
              >
                <i className="fa-solid fa-comments"></i> Contact owner
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "auto",
                  height: "max-content",
                }}
                className="btn-yellow"
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>
            )}
          </div>

          {/* Image of post */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "100px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80% 20%",
                gap: "20px",
              }}
            >
              <div className="post-image-container">
                <div>
                  {isInProcessing ? (
                    <Skeleton
                      height={400}
                      width={432}
                      style={{
                        borderRadius: "12px",
                      }}
                    />
                  ) : post.image ? (
                    <img
                      src={post.image ? post.urlImage : ""}
                      alt="picture of stuff"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        backgroundColor: "white",
                        borderRadius: "20px",
                      }}
                      id="big-img"
                    ></img>
                  ) : (
                    <div className="image-placeholder">
                      <i className="icon-image"></i>
                      <span>No image</span>
                    </div>
                  )}
                </div>

                <h3
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    padding: "5px 10px 10px 0",
                  }}
                >
                  ID: {post.postId}
                </h3>
              </div>

              {/* Post image mini */}
              <div className="post-image-mini">
                {post.image2 ? (
                  <img
                    src={post.image2 ? post.urlImage2 : ""}
                    alt="picture of stuff"
                    loading="lazy"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                    id="img-1"
                    onClick={() =>
                      handleChangeImage(
                        document.getElementById("big-img").src,
                        document.getElementById("img-1").src,
                        "img-1",
                      )
                    }
                  ></img>
                ) : (
                  <div
                    className="image-placeholder"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <i className="icon-image"></i>
                    <span>No image</span>
                  </div>
                )}
                {post.image2 ? (
                  <img
                    src={post.image2 ? post.urlImage2 : ""}
                    alt="picture of stuff"
                    loading="lazy"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                    id="img-1"
                    onClick={() =>
                      handleChangeImage(
                        document.getElementById("big-img").src,
                        document.getElementById("img-1").src,
                        "img-1",
                      )
                    }
                  ></img>
                ) : (
                  <div
                    className="image-placeholder"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <i className="icon-image"></i>
                    <span>No image</span>
                  </div>
                )}
                {post.image2 ? (
                  <img
                    src={post.image2 ? post.urlImage2 : ""}
                    alt="picture of stuff"
                    loading="lazy"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                    id="img-1"
                    onClick={() =>
                      handleChangeImage(
                        document.getElementById("big-img").src,
                        document.getElementById("img-1").src,
                        "img-1",
                      )
                    }
                  ></img>
                ) : (
                  <div
                    className="image-placeholder"
                    style={{
                      width: "80%",
                      height: "80px",
                      objectFit: "cover",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <i className="icon-image"></i>
                    <span>No image</span>
                  </div>
                )}
              </div>
            </div>

            {/* About me */}
            <div>
              <h1
                style={{
                  fontFamily: "Mochiy Pop One, sans-serif",
                  fontSize: "25px",
                  marginBottom: "10px",
                  fontWeight: "100",
                  marginLeft: "10px",
                }}
              >
                About this item
              </h1>
              <table
                border="0"
                style={{
                  padding: "10px",
                  textAlign: "left",
                  verticalAlign: "top",
                }}
              >
                <tbody>
                  <tr className="table-tr">
                    <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                      Category:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {isInProcessing ? (
                        <Skeleton
                          height={30}
                          width={80}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : post.categoryPost?.categoryPostName ? (
                        post.categoryPost?.categoryPostName
                      ) : (
                        "Not available"
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                      Date posted:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {isInProcessing ? (
                        <Skeleton
                          height={30}
                          width={120}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : post.createdAt ? (
                        dayjs(post.createdAt).format("MM/DD/YYYY")
                      ) : (
                        "Not available"
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                      Status:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {isInProcessing ? (
                        <Skeleton
                          height={30}
                          width={50}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : post.typePost ? (
                        post.typePost
                      ) : (
                        "Not available"
                      )}
                    </td>
                  </tr>
                  <tr className="table-tr">
                    <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                      Description:
                    </th>
                    <td style={{ verticalAlign: "top" }} className="table-td">
                      {isInProcessing ? (
                        <Skeleton
                          height={100}
                          width={700}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : (
                        <ReactMarkdown
                          children={post.description}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        ></ReactMarkdown>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Contacts */}
              <div>
                <h1
                  style={{
                    fontFamily: "Mochiy Pop One, sans-serif",
                    fontSize: "20px",
                    fontWeight: "100",
                    marginLeft: "10px",
                  }}
                >
                  Contacts
                </h1>
                <table
                  border="0"
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    verticalAlign: "top",
                  }}
                >
                  <tbody>
                    <tr className="table-tr">
                      <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                        Name:{" "}
                      </th>
                      <td style={{ verticalAlign: "top" }} className="table-td">
                        {isInProcessing ? (
                          <Skeleton
                            height={30}
                            width={200}
                            style={{ marginBottom: "20px" }}
                          />
                        ) : post.user ? (
                          `${post.user.firstName} ${post.user.lastName}`
                        ) : (
                          "Not available"
                        )}
                      </td>
                    </tr>
                    <tr className="table-tr">
                      <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                        Email:{" "}
                      </th>
                      <td style={{ verticalAlign: "top" }} className="table-td">
                        {isInProcessing ? (
                          <Skeleton
                            height={30}
                            width={230}
                            style={{ marginBottom: "20px" }}
                          />
                        ) : post.user ? (
                          post.user.email
                        ) : (
                          "Not available"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                className="btn-yellow"
                style={{ marginTop: "20px", width: "100%" }}
              >
                <i className="fa-solid fa-magnifying-glass"></i> I Found It
              </button>
            </div>
          </div>

          {post.typePost === "Lost" &&
            user.email === post.user?.email &&
            !post.isReceived && (
              <div className="suggestion-lost-item">
                <div className="suggestion-content">
                  <h1 style={{ textAlign: "center" }}>
                    Suggestions for your lost item
                  </h1>
                  <div
                    className="suggestion-card-container"
                    style={{
                      gridTemplateColumns: suggestPosts.length === 0 && "unset",
                    }}
                  >
                    {suggestPosts.length > 0 ? (
                      suggestPosts.map((suggestion) => (
                        <div
                          className="card suggestion-card"
                          key={suggestion.postId}
                        >
                          {suggestion.image ? (
                            <img
                              src={suggestion.urlImage}
                              alt="picture of stuff"
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                backgroundColor: "white",
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="image-placeholder">
                              <i className="icon-image"></i>
                              <span>No image</span>
                            </div>
                          )}
                          <div
                            className="card-text suggestion-card-text"
                            style={{ marginBottom: "40px" }}
                          >
                            <div className="info-user-suggestion">
                              <img
                                src={suggestion.user.urlAvatar}
                                alt="avatar"
                                width={50}
                                height={50}
                                style={{ borderRadius: "50%" }}
                                loading="lazy"
                              />
                              <span>{`${suggestion.user.firstName} ${suggestion.user.lastName}`}</span>
                            </div>
                            <h3
                              style={{
                                fontWeight: "700",
                                marginBottom: "10px",
                              }}
                            >
                              <a href={`/detail-post/${suggestion.postId}`}>
                                {suggestion.title}
                              </a>
                            </h3>
                            <a href={`/detail-post/${suggestion.postId}`}>
                              <ReactMarkdown
                                children={suggestion.description}
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                              ></ReactMarkdown>
                            </a>
                          </div>

                          <button
                            className="btn"
                            style={{ width: "90%", marginLeft: "5%" }}
                            onClick={() => {
                              handleMatchPost(post.postId, suggestion.postId);
                            }}
                            disabled={isRequesting}
                          >
                            {isRequesting ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <>
                                <i className="fa-solid fa-hand-point-up"></i>{" "}
                                This is my item
                              </>
                            )}
                          </button>

                          {/* Status */}
                          <div
                            className={
                              suggestion.typePost === "Found"
                                ? "status-post-found"
                                : "status-post-lost"
                            }
                          >
                            {suggestion.typePost}
                          </div>

                          {/* Show score */}
                          <div className="show-code">{suggestion.score}%</div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          width: "100%",
                          margin: "auto",
                        }}
                      >
                        <h3>No suggestions found</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Popup notice code */}
          {isShowPopup && (
            <div
              className="modal"
              id="popup-notice-verification-code"
              style={{ display: "flex" }}
            >
              <div className="modal-content">
                <h2 style={{ backgroundColor: "transparent" }}>Your Code:</h2>

                <div className="policy-section">
                  <h3>{code || "Not available"}</h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontStyle: "italic",
                      marginTop: "4px",
                    }}
                  >
                    This code is used to verify ownership when retrieving your
                    lost item. Share it only with the person who has your item.
                    Keep it private.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <button
                    className="btn"
                    onClick={() => {
                      setIsShowPopup(false);
                    }}
                  >
                    Okay
                  </button>
                  {user.role === "Admin" && (
                    <button
                      className="btn-yellow"
                      onClick={() => {
                        window.print();

                        document.getElementById(
                          "popup-notice-code",
                        ).style.display = "none";
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Print this code
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="not-found">
          <Suspense fallback={<p>Loading animation...</p>}>
            <Lottie
              animationData={EmptyGhost}
              style={{ width: "30%", margin: "auto" }}
            />
          </Suspense>
          <h1 style={{ fontSize: "40px" }}>This Post Does Not Exist</h1>
          <p style={{ color: "", marginBottom: "20px" }}>
            Sorry, this post may have been removed or the link is incorrect.
          </p>
          <button
            className="btn"
            onClick={() => {
              window.history.back();
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </button>
        </div>
      )}
    </>
  );
}
