import { useEffect, useState } from "react";
import SidebarProfile from "../components/SidebarProfile";
import axios from "axios";
import dayjs from "dayjs";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { debounce } from "lodash";

export default function VerificationCodes() {
  // Variables
  const [codes, setCodes] = useState([]);
  const [query, setQuery] = useState("");
  const [isInProcessing, setIsInProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // APIs

  // Functions
  // Realtime
  const connectToSignalR = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44306/SystemHub", {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();

      // Listen event from backend
      // Get new lost post code
      connection.on("ReceiveNewLostPostCode", (data) => {
        setCodes((preCodes) => {
          if (preCodes.some((p) => p.postId == data.postId)) return preCodes;

          return [data, ...preCodes];
        });
      });

      // Get status mark post
      connection.on("ReceiveStatusMarkPost", (data) => {
        setCodes((preCodes) => {
          return preCodes.map((p) => {
            return p.postId === data.postId
              ? { ...p, isReceived: data.isReceived }
              : p;
          });
        });
      });

      // Start realtime
      await connection.start();

      return () => {
        connection.stop(); // Ignore leaks memory
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Get category posts
  const searchCodes = async (query) => {
    if (query.trim() == "") return null;

    setIsInProcessing(true);

    try {
      const response = await axios.get(
        `https://localhost:44306/api/Post/search-codes?query=${query}`,
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        setCodes(response.data);
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

  const debouncedFetch = debounce(searchCodes, 500);

  // Handle mark received
  const handleMarkReceived = async (postId) => {
    setIsInProcessing(true);

    try {
      const response = await axios.post(
        `https://localhost:44306/api/Post/mark-received/${postId}`,
        null,
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 ||
            status === 401 ||
            status === 404 ||
            status === 403,
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
      }

      if (response.status === 403) {
        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: "You don't have permission to perform this action",
              status: "error",
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

  // Get codes of lost items
  const handleCodeLost = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://localhost:44306/api/Match/match-user`,
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 ||
            status === 401 ||
            status === 404 ||
            status === 403,
        }
      );

      if (response.status === 200) {
        setCodes(response.data);
      }

      if (response.status === 403) {
        window.dispatchEvent(
          new CustomEvent("app-error", {
            detail: {
              message: "You don't have permission to perform this action",
              status: "error",
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
      setIsLoading(false);
    }
  };

  // Fetch data from API
  useEffect(() => {
    handleCodeLost();
  }, []);

  // Run realtime
  useEffect(() => {
    connectToSignalR();
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

  useEffect(() => {
    debouncedFetch(query);
    return debouncedFetch.cancel; // Cleanup
  }, [query]);

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
          <div className="search-codes-container">
            <input
              type="text"
              placeholder="Search code..."
              className="form-control-input search-codes"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <i className="fa-solid fa-search"></i>
          </div>

          {/* List codes */}
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Post</th>
                  <th>Code</th>
                  <th>Date Posted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7}>
                      <i className="fas fa-spinner fa-spin"></i>
                    </td>
                  </tr>
                ) : codes.length > 0 ? (
                  codes.map((item, index) => (
                    <tr key={item.matchId}>
                      <td>{index + 1}</td>
                      <td>
                        {item.firstNameFound} {item.lastNameFound}
                      </td>
                      <td>
                        <a
                          href={`/detail-post/${item.postId}`}
                          style={{ textDecoration: "underline" }}
                          aria-label={`Detail link for ${item.titlePost}`}
                        >
                          {item.titlePost}
                        </a>
                      </td>
                      <td>{item.code}</td>
                      <td>{dayjs(item.createdAt).format("MM/DD/YYYY")}</td>
                      <td>
                        <span
                          className={`status ${item.isReceived ? "active" : "inactive"
                            }`}
                        >
                          {item.isReceived ? "Received" : "Not Receive"}
                        </span>
                      </td>
                      <td>
                        <button
                          aria-label="Mark as received button"
                          className="btn"
                          type="button"
                          onClick={() => {
                            handleMarkReceived(item.postId);
                          }}
                          disabled={isInProcessing || item.isReceived}
                        >
                          {isInProcessing ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : item.isReceived ? (
                            "Received"
                          ) : (
                            "Mark as received"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No results</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
