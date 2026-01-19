import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function Home() {
  // Variables
  let [newestPosts, setNewestPosts] = useState([]);
  let [isInProcessing, setIsInProcessing] = useState(false);

  // Functions
  function handleSearch(e) {
    e.preventDefault();

    window.location.href = "/search";
  }

  // Get Newest Posts
  const getNewestPosts = async () => {
    setIsInProcessing(true);

    try {
      const response = await axios.get(
        "https://lost-and-found-cqade7hfbjgvcbdq.centralus-01.azurewebsites.net/api/Post/newest-posts",
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        },
      );

      if (response.status === 200) {
        setNewestPosts(response.data);
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

  // UseEffect
  useEffect(() => {
    getNewestPosts();
  }, []);

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Lost & Found | Back2Me </title>
      </Helmet>

      <div
        className="hero"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div
          className="hero-text"
          style={{
            marginTop: "83px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "32px",
              marginLeft: "2%",
              textAlign: "center",
              width: "100%",
              marginTop: "18px",
              lineHeight: "1.8",
              marginBottom: "11px",
            }}
          >
            We can help find your{" "}
            <strong
              style={{
                fontSize: "55px",
                fontFamily: "Mochiy Pop One, sans-serif",
              }}
            >
              LOST
            </strong>
            <br />
            Stuffs or reunite{" "}
            <strong
              style={{
                fontSize: "55px",
                fontFamily: "Mochiy Pop One, sans-serif",
              }}
            >
              FOUND
            </strong>{" "}
            Stuffs with
            <br />
            their owners
          </p>

          <div
            className="number-buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "50px",
              background: "linear-gradient(to right, #ec7207, #fadf45ff)",
              padding: "20px 20px",
              width: "400px",
              borderRadius: "100px",
              marginTop: "40px",
            }}
          >
            <button
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/search?status=lost";
              }}
            >
              <strong>
                <span style={{ fontSize: "25px", color: "#072138" }}>30</span>{" "}
                <br /> Lost Stuffs
              </strong>
            </button>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <strong className="pipe">|</strong>
            </p>
            <button
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              {" "}
              <strong>
                <span style={{ fontSize: "25px" }}>60</span> <br /> Receive
                Stuffs
              </strong>
            </button>
          </div>

          <p
            className="easy"
            style={{
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              marginTop: "25px",
              marginLeft: "2%",
            }}
          >
            It's super easy and takes only minutes. Just add your stuff's info,
            <br />
            picture, and contact information.
          </p>
        </div>

        <img
          src="./Image/detective.png"
          alt=""
          className="move-up-down"
          width="850"
          loading="lazy"
          style={{ objectFit: "cover", width: "692px", marginRight: "-70px" }}
        />
      </div>
      <p
        className="learn-how-it-works"
        style={{
          fontSize: "40px",
          marginTop: "35px",
          textAlign: "left",
          color: "#072138",
          marginRight: "90%",
          width: "100%",
          padding: "20px 10px",
        }}
      >
        Learn{" "}
        <span style={{ fontFamily: "Mochiy Pop One, sans-serif" }}>
          how it works
        </span>
      </p>

      {/* Learn how it works */}
      <div
        className="how-it-works"
        style={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          gap: "30px",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "50px",
              left: "18%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "17px",
              border: "none",
              width: "173px",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Register
          </p>
          <p>
            This step allows you to have a personalized space for managing your
            stuff. You can edit and update your profile, contact other users,
            and access useful tools.
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            className="report"
            style={{
              fontSize: "20px",
              width: "30%",
              marginTop: "10px",
              marginBottom: "50px",
              left: "8%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "15px",
              border: "none",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Report a stuff
          </p>
          <p>
            Share the details of your lost or found items by creating a post.
            Provide essential information about your items. This step helps us
            match lost and found items more effectively.
          </p>
        </div>
      </div>

      {/* 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gap: "30px",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
        className="paddingp-bottom"
      >
        {/* Card 1 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "50px",
              left: "8%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "17px",
              border: "none",
              width: "173px",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Promote
          </p>
          <p>
            Our platform offers options to share your listing on social media,
            reaching a wider audience. The more you promote your listing, the
            higher the chances of reuniting with your items.
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            className="report"
            style={{
              fontSize: "20px",
              width: "30%",
              marginTop: "10px",
              marginBottom: "50px",
              left: "17%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "15px",
              border: "none",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Reunite
          </p>
          <p>
            This is the ultimate goal. With a strong user community and
            effective promotion, the chances of reuniting with your lost items
            or finding the item’s owner become much higher.
          </p>
        </div>
      </div>

      {/* Newest posts */}
      <div
        className="title-newest-post"
        style={{
          display: "flex",
          gap: "2%",
          padding: " 70px 10px",
        }}
      >
        <p style={{ fontSize: "30px" }}>
          <span
            style={{
              fontFamily: "Mochiy Pop One, sans-serif",
            }}
          >
            Newest
          </span>{" "}
          posts
        </p>
      </div>

      {/* Newest images */}
      <div className="newest-post-container">
        {/* Cards */}
        {isInProcessing ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              gap: "16px",
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="" key={index} style={{ marginBottom: "60px" }}>
                <Skeleton
                  height={290}
                  style={{ marginBottom: "10px", borderRadius: "20px" }}
                />
                <div className="">
                  <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                    <Skeleton height={35} width={405} />
                  </h3>
                  <p>
                    <Skeleton count={3} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          newestPosts.map((item) => (
            <div className="card suggestion-card" key={item.postId}>
              {item.image ? (
                <img
                  src={item.urlImage}
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
                    src={item.user.urlAvatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    loading="lazy"
                  />
                  <span>{`${item.user.firstName} ${item.user.lastName}`}</span>
                </div>
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  <a href={`/detail-post/${item.postId}`}>{item.title}</a>
                </h3>
                <a href={`/detail-post/${item.postId}`}>
                  <ReactMarkdown
                    children={item.description}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  ></ReactMarkdown>
                </a>
              </div>

              {/* Status */}
              <div
                className={
                  item.typePost === "Found"
                    ? "status-post-found"
                    : "status-post-lost"
                }
              >
                {item.typePost}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: "center", marginBottom: "100px" }}>
        <a href="/lost-and-found" className="btn">
          View all <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {/* Quick Search */}
      <p
        className="title-quick-search"
        style={{ fontSize: "30px", textAlign: "center", marginBottom: "30px" }}
      >
        <span
          style={{
            fontFamily: "Mochiy Pop One, sans-serif",
          }}
        >
          Search
        </span>{" "}
        for Stuffs in your
        <span
          style={{
            fontFamily: "Mochiy Pop One, sans-serif",
          }}
        >
          {" "}
          School
        </span>
      </p>

      <form onSubmit={handleSearch}>
        <div className="quick-search">
          <div className="categories">
            <div className="left">
              <label htmlFor="category">Type of Stuff</label>
              <br />
              <select className="select" name="" id="category">
                <option value="">Select type</option>
                <option value="">Iphone</option>
              </select>
            </div>
            <div className="right">
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
          <div className="pipe">|</div>
          <div className="location">
            <div className="left">
              <label htmlFor="location">Location</label>
              <br />
              <select className="select" name="" id="location">
                <option value="">Select location</option>
                <option value="">Hall 500</option>
                <option value="">Hall 600</option>
              </select>
            </div>
            <div className="right">
              <i className="fa-solid fa-location-dot"></i>
            </div>
          </div>
          <div className="pipe">|</div>
          <div className="btn-quick-search">
            <button>
              Find a stuff <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
