import { Suspense, useEffect, useState } from "react";
import SidebarProfile from "../components/SidebarProfile";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import NotFoundPost from "../assets/animations/Not-Found-Post.json";

export default function MyPost() {
  // Variables
  const [posts, setPosts] = useState([]);
  const [isInProcessing, setIsInProcessing] = useState(false);
  const [user, setUser] = useState("");

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
        "https://localhost:44306/api/Post/my-posts",
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

  // Fetch data from API
  useEffect(() => {
    handleFetchPosts();
    getMyProfile();
  }, []);

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
      <div className="sidebar-and-content"
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
                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                      <a href={`/detail-post/${post.postId}`}>{post.title}</a>
                    </h3>
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
                  <div className="show-code">Code: {post.code}</div>

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

            <div className="print-code" id="print-code"></div>
          </div>
        </div>
      </div>
    </>
  );
}
