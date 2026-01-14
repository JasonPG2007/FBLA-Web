import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { debounce } from "lodash";

export default function ModalReportStuff() {
  // Variables
  const fileInputLostRef = useRef(null);
  const fileInputFoundRef = useRef(null);
  let [imageLostPreview, setImageLostPreview] = useState(null);
  let [imageFoundPreview, setImageFoundPreview] = useState(null);
  let [selectedFileLost, setSelectedFileLost] = useState(null);
  let [selectedFileFound, setSelectedFileFound] = useState(null);
  let [categoryPosts, setCategoryPosts] = useState([]);
  let [user, setUser] = useState("");
  let [categoryPostId, setCategoryPostId] = useState("");
  let [code, setCode] = useState("");
  let [query, setQuery] = useState("");
  let [lostOrFound, setLostOrFound] = useState("Lost");
  let [studentId, setStudentId] = useState("");
  let [email, setEmail] = useState("");
  let [stuffNameLost, setStuffNameLost] = useState("");
  let [categoryLost, setCategoryLost] = useState("");
  let [descriptionLost, setDescriptionLost] = useState("");
  let [isInProcessing, setIsInProcessing] = useState(false);
  let [isTypeSearch, setIsTypeSearch] = useState(false);
  let [isSearchingCategory, setIsSearchingCategory] = useState(false);

  // APIs
  const API_URL_Auth = `https://localhost:44306/api/CheckAuth/check-auth`;

  // Functions
  // Close modal report
  const closeModalReport = () => {
    const modal = document.querySelector(".modal-report-stuff");
    const overlay = document.querySelector(".modal-overlay-report-stuff");
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    document.body.style.overflow = "auto";
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
        setEmail(response.data.email);
        setStudentId(response.data.student?.studentId);
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

  // Get category posts
  const searchCategoryPosts = async (query) => {
    if (query.trim() == "") return null;

    setIsSearchingCategory(true);
    setIsInProcessing(true);

    try {
      const response = await axios.get(
        `https://localhost:44306/api/CategoryPost/search-category-post?query=${query}`,
        {
          withCredentials: true,
          validateStatus: (status) =>
            status === 200 || status === 401 || status === 404,
        }
      );

      if (response.status === 200) {
        setCategoryPosts(response.data);

        // Set details
        setEmail(response.data.email);
        setStudentId(response.data.student?.studentId);
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
      setIsSearchingCategory(false);
      setIsInProcessing(false);
    }
  };

  // Wait for 300ms when stop typing to fetch data
  const debouncedFetch = debounce(searchCategoryPosts, 500);

  const handleLostImage = (file) => {
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
      setSelectedFileLost(file);

      // To preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageLostPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageLostChange = (e) => {
    const file = e.target.files[0];
    handleLostImage(file);
  };

  const handleDropLostImage = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleLostImage(file);
  };

  const handleFoundFile = (file) => {
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
      setSelectedFileFound(file);

      // To preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFoundPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageFoundChange = (e) => {
    const file = e.target.files[0];
    handleFoundFile(file);
  };

  const handleDropFoundImage = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFoundFile(file);
  };

  const handleSubmitPostLost = async (e) => {
    e.preventDefault();

    setIsInProcessing(true);

    const codeIntoDb = getRandomString(6);
    setCode(codeIntoDb);

    const formData = new FormData();
    selectedFileLost && formData.append("imageUpload", selectedFileLost); // Image
    formData.append("userId", user.userId);
    formData.append("title", stuffNameLost);
    formData.append("description", descriptionLost);
    formData.append("typePost", lostOrFound);
    formData.append("code", codeIntoDb);
    formData.append("categoryPostId", categoryPostId);

    try {
      const response = await axios.post(
        "https://localhost:44306/api/Post",
        formData,
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
              message: response.data,
              status: "success",
            },
          })
        );

        closeModalReport();
        document.getElementById("popup-notice-code").style.display = "flex"; // Show popup notice code
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

  const handleSubmitPostFound = async (e) => {
    e.preventDefault();

    setIsInProcessing(true);

    const codeIntoDb = getRandomString(6);
    setCode(codeIntoDb);
    const formData = new FormData();
    if (selectedFileFound) {
      selectedFileFound && formData.append("imageUpload", selectedFileFound); // Image
      selectedFileFound &&
        formData.append(
          "vector",
          JSON.stringify(await handleGetVectorFromImage(selectedFileFound))
        ); // Vector of image
    }
    formData.append("userId", user.userId);
    formData.append("title", stuffNameLost);
    formData.append("description", descriptionLost);
    formData.append("typePost", lostOrFound);
    formData.append("code", codeIntoDb);
    formData.append("categoryPostId", categoryPostId);

    try {
      const response = await axios.post(
        "https://localhost:44306/api/Post",
        formData,
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
              message: response.data,
              status: "success",
            },
          })
        );

        closeModalReport();
        document.getElementById("popup-notice-code").style.display = "flex"; // Show popup notice code
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

  const handleGetVectorFromImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "https://contamination-final-heated-gradually.trycloudflare.com/embed",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const overlay = document.getElementById("overlay-search-image");
        overlay.style.visibility = "hidden";
        overlay.style.opacity = "0";
        document.body.style.overflow = "auto";

        return res.data; // Return vector
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
                message: "Found item posting is temporarily unavailable.",
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

      throw error;
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

  const handleValidateFormReport = () => {
    const isValid =
      descriptionLost.trim() !== "" &&
      stuffNameLost.trim() !== "" &&
      categoryPostId !== "";
    if (isValid) {
      return false;
    }
    return true;
  };

  // UseEffect
  useEffect(() => {
    getMyProfile();
    handleValidateFormReport();
  }, []);

  useEffect(() => {
    debouncedFetch(query);
    return debouncedFetch.cancel; // Cleanup
  }, [query]);

  return (
    <>
      <div className="modal-report-stuff">
        <div className="modal-header-report-stuff">
          <div className="tab active" id="lost-stuff-tab">
            <h2
              className="modal-title-report-stuff"
              onClick={() => {
                const lost_stuff_tab =
                  document.getElementById("lost-stuff-tab");
                lost_stuff_tab.classList.add("active");

                const found_stuff_tab =
                  document.getElementById("found-stuff-tab");
                found_stuff_tab.classList.remove("active");

                setLostOrFound("Lost");
              }}
            >
              Lost <span className="stuff-header">Stuff</span>
            </h2>
          </div>

          <div className="tab" id="found-stuff-tab">
            <h2
              className="modal-title-report-stuff"
              onClick={() => {
                const lost_stuff_tab =
                  document.getElementById("lost-stuff-tab");
                lost_stuff_tab.classList.remove("active");

                const found_stuff_tab =
                  document.getElementById("found-stuff-tab");
                found_stuff_tab.classList.add("active");

                setLostOrFound("Found");
              }}
            >
              Found <span className="stuff-header">Stuff</span>
            </h2>
          </div>

          <div className="close-modal-report" onClick={closeModalReport}>
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="form-lost-found-container">
            {lostOrFound === "Lost" && (
              <form
                style={{ width: "100%" }}
                onSubmit={handleSubmitPostLost}
                encType="multipart/form-data"
              >
                <div className="modal-content-container">
                  <div
                    style={{ textAlign: "center" }}
                    className="upload-img-container"
                  >
                    <div
                      className={!imageLostPreview ? "upload-img-box" : ""}
                      onClick={() => {
                        fileInputLostRef.current.click();
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDropLostImage}
                    >
                      {!imageLostPreview && (
                        <>
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          <p>Drag and Drop here</p>
                          <p
                            style={{ marginBottom: "30px", marginTop: "10px" }}
                            className="label-or"
                          >
                            or
                          </p>
                          <label className="btn-yellow">Select image</label>
                          <input
                            type="file"
                            id="upload-img"
                            ref={fileInputLostRef}
                            style={{ display: "none" }}
                            onChange={handleImageLostChange}
                          />
                        </>
                      )}
                      {imageLostPreview && (
                        <img
                          src={imageLostPreview}
                          alt="Preview lost item"
                          width="290"
                          loading="lazy"
                          height="297"
                          className="preview-img"
                        />
                      )}
                    </div>

                    {/* Btn change image */}
                    {imageLostPreview && (
                      <div className="btn-change-img">
                        <label htmlFor="upload-img" className="btn-yellow">
                          Change image
                        </label>
                        <input
                          type="file"
                          id="upload-img"
                          style={{ display: "none" }}
                          onChange={handleImageLostChange}
                        />
                        <button
                          aria-label="Cancel image button"
                          className="btn-with-border"
                          type="button"
                          onClick={() => {
                            setImageLostPreview("");
                            setSelectedFileLost(null);
                          }}
                        >
                          Remove image
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="stuff-information-right-container">
                    <div className="stuff-information-box">
                      {/* Stuff info */}
                      <h2 style={{ marginBottom: "20px" }}>
                        Stuff Information
                      </h2>
                      <div className="stuff-information">
                        <div className="left">
                          <label
                            htmlFor="stuff-name"
                            style={{ fontWeight: "600" }}
                          >
                            Stuff Name*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <input
                              type="text"
                              name=""
                              id="stuff-name"
                              placeholder="Ex: IPhone 16"
                              className="form-control-input-label-top"
                              required
                              value={stuffNameLost}
                              onChange={(e) => {
                                setStuffNameLost(e.target.value);
                              }}
                            />
                            <label className="label-top">Enter name</label>
                          </div>
                          <br />
                        </div>
                        <div className="right">
                          {/* Category */}
                          <label
                            htmlFor="stuff-id"
                            style={{ fontWeight: "600" }}
                          >
                            Category*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <input
                              type="text"
                              name=""
                              id="category"
                              placeholder="Ex: IPhone"
                              className="form-control-input-label-top"
                              value={categoryLost}
                              required
                              onChange={(e) => {
                                setCategoryPostId("");
                                if (e.target.value.trim() == "") {
                                  setIsTypeSearch(false);
                                } else {
                                  setIsTypeSearch(true);
                                }

                                setCategoryLost(e.target.value);
                                setQuery(e.target.value);
                              }}
                            />
                            <label className="label-top">Search...</label>
                            {isTypeSearch &&
                              (isSearchingCategory ? (
                                <div style={{ marginTop: "0.5rem" }}>
                                  <span>
                                    <i className="fas fa-spinner fa-spin"></i>{" "}
                                    Searching...
                                  </span>
                                </div>
                              ) : categoryPosts.length > 0 ? (
                                <ul
                                  className="drop-search-category custom-list"
                                  style={{ maxHeight: "200px" }}
                                >
                                  {categoryPosts.map((item) => (
                                    <li
                                      key={item.categoryPostId}
                                      className="nav-item-custom"
                                      onClick={() => {
                                        setCategoryPostId(item.categoryPostId);
                                        setCategoryLost(item.categoryPostName);
                                        setCategoryPosts([]);
                                        setIsTypeSearch(false);
                                      }}
                                    >
                                      <button
                                        className="list-group-item"
                                        aria-label="Choose category name button"
                                        type="button"
                                      >
                                        {item.categoryPostName}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <>
                                  <ul
                                    className="drop-search-category custom-list"
                                    style={{ maxHeight: "200px" }}
                                  >
                                    <li className="nav-item-custom">
                                      This category is not available yet
                                    </li>
                                  </ul>
                                </>
                              ))}
                          </div>
                          <br />

                          {/* Description */}
                          <label
                            htmlFor="description"
                            style={{ fontWeight: "600" }}
                          >
                            Description*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <CKEditor
                              editor={ClassicEditor}
                              data={descriptionLost}
                              config={{
                                licenseKey: "GPL",
                                toolbar: [
                                  "bold",
                                  "italic",
                                  "bulletedList",
                                  "numberedList",
                                  "link",
                                  "undo",
                                  "redo",
                                ],
                              }}
                              onChange={(event, editor) => {
                                setDescriptionLost(editor.getData());
                              }}
                            />
                          </div>
                          <br />
                        </div>
                      </div>

                      {/* Contact info */}
                      <h2 style={{ marginBottom: "20px" }}>
                        Contact Information
                      </h2>
                      <div className="stuff-information">
                        <div className="left">
                          <label
                            htmlFor="stuff-name"
                            style={{ fontWeight: "600" }}
                          >
                            Full Name*
                          </label>
                          <br />
                          <div style={{ position: "relative" }}>
                            {isInProcessing ? (
                              <Skeleton height={50} style={{ width: "100%" }} />
                            ) : (
                              <input
                                type="text"
                                name=""
                                id="stuff-name"
                                className="form-control-input-label-top input-read-only"
                                value={`${user.firstName} ${user.lastName}`}
                                required
                                readOnly
                              />
                            )}
                          </div>
                          <br />
                        </div>
                        <div className="right">
                          {/* Student ID */}
                          {user.student?.studentId && user.role && (
                            <>
                              {/* Student ID */}
                              <label
                                htmlFor="student-id"
                                style={{ fontWeight: "600" }}
                              >
                                Student ID
                              </label>
                              <br />
                              <div style={{ position: "relative" }}>
                                <input
                                  type="text"
                                  name=""
                                  id="student-id-lost"
                                  className="form-control-input-label-top"
                                  value={user.student?.studentId || ""}
                                  readOnly
                                />
                              </div>
                              <br />
                            </>
                          )}

                          {/* Last Seen Date */}
                          <label
                            htmlFor="school-email"
                            style={{ fontWeight: "600" }}
                          >
                            Email*
                          </label>
                          <br />
                          <div style={{ position: "relative" }}>
                            {isInProcessing ? (
                              <Skeleton height={50} style={{ width: "100%" }} />
                            ) : (
                              <input
                                type="email"
                                name=""
                                id="school-email"
                                className="form-control-input-label-top"
                                required
                                value={user.email || ""}
                                readOnly
                              />
                            )}
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>

                    {/* Btn Post */}
                    <button
                      className="btn"
                      aria-label="Post lost item button"
                      title={
                        categoryPostId === "" && isTypeSearch
                          ? "Please select a category name"
                          : ""
                      }
                      style={{ width: "100%" }}
                      disabled={
                        user.role && !isInProcessing
                          ? handleValidateFormReport()
                          : true
                      }
                    >
                      Post Lost Item{" "}
                      {categoryPostId === "" &&
                        isTypeSearch &&
                        "(Please select a category name)"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {lostOrFound === "Found" && (
              <form
                style={{ width: "100%" }}
                onSubmit={handleSubmitPostFound}
                encType="multipart/form-data"
              >
                <div className="modal-content-container">
                  <div style={{ textAlign: "center" }}>
                    <div
                      className={!imageFoundPreview ? "upload-img-box" : ""}
                      onClick={() => {
                        fileInputFoundRef.current.click();
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDropFoundImage}
                    >
                      {!imageFoundPreview && (
                        <>
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          <p>Drag and Drop here</p>
                          <p
                            style={{ marginBottom: "30px", marginTop: "10px" }}
                            className="label-or"
                          >
                            or
                          </p>
                          <label className="btn-yellow">Select image</label>
                          <input
                            type="file"
                            id="upload-img"
                            ref={fileInputFoundRef}
                            style={{ display: "none" }}
                            onChange={handleImageFoundChange}
                          />
                        </>
                      )}
                      {imageFoundPreview && (
                        <img
                          src={imageFoundPreview}
                          alt="Preview lost item"
                          width="290"
                          loading="lazy"
                          height="297"
                          className="preview-img"
                        />
                      )}
                    </div>

                    {/* Btn change image */}
                    {imageFoundPreview && (
                      <div className="btn-change-img">
                        <label htmlFor="upload-img" className="btn-yellow">
                          Change image
                        </label>
                        <input
                          type="file"
                          id="upload-img"
                          style={{ display: "none" }}
                          onChange={handleImageFoundChange}
                        />
                        <button
                          aria-label="Remove image button"
                          className="btn-with-border"
                          type="button"
                          onClick={() => {
                            setImageFoundPreview("");
                            setSelectedFileFound(null);
                          }}
                        >
                          Remove image
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="stuff-information-right-container">
                    <div className="stuff-information-box">
                      {/* Stuff info */}
                      <h2 style={{ marginBottom: "20px" }}>
                        Stuff Information
                      </h2>
                      <div className="stuff-information">
                        <div className="left">
                          <label
                            htmlFor="stuff-name"
                            style={{ fontWeight: "600" }}
                          >
                            Stuff Name*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <input
                              type="text"
                              name=""
                              id="stuff-name"
                              placeholder="Ex: IPhone 16"
                              className="form-control-input-label-top"
                              required
                              value={stuffNameLost}
                              onChange={(e) => {
                                setStuffNameLost(e.target.value);
                              }}
                            />
                            <label className="label-top">Enter name</label>
                          </div>
                          <br />
                        </div>
                        <div className="right">
                          {/* Category */}
                          <label
                            htmlFor="stuff-id"
                            style={{ fontWeight: "600" }}
                          >
                            Category*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <input
                              type="text"
                              name=""
                              id="category"
                              placeholder="Ex: IPhone"
                              className="form-control-input-label-top"
                              value={categoryLost}
                              required
                              onChange={(e) => {
                                setCategoryPostId("");
                                if (e.target.value.trim() == "") {
                                  setIsTypeSearch(false);
                                } else {
                                  setIsTypeSearch(true);
                                }

                                setCategoryLost(e.target.value);
                                setQuery(e.target.value);
                              }}
                            />
                            <label className="label-top">Search...</label>
                            {isTypeSearch &&
                              (isSearchingCategory ? (
                                <div style={{ marginTop: "0.5rem" }}>
                                  <span>
                                    <i className="fas fa-spinner fa-spin"></i>{" "}
                                    Searching...
                                  </span>
                                </div>
                              ) : categoryPosts.length > 0 ? (
                                <ul
                                  className="drop-search-category custom-list"
                                  style={{ maxHeight: "200px" }}
                                >
                                  {categoryPosts.map((item) => (
                                    <li
                                      key={item.categoryPostId}
                                      className="nav-item-custom"
                                      onClick={() => {
                                        setCategoryPostId(item.categoryPostId);
                                        setCategoryLost(item.categoryPostName);
                                        setCategoryPosts([]);
                                        setIsTypeSearch(false);
                                      }}
                                    >
                                      <button
                                        className="list-group-item"
                                        aria-label="Choose category name button"
                                        type="button"
                                      >
                                        {item.categoryPostName}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <>
                                  <ul
                                    className="drop-search-category custom-list"
                                    style={{ maxHeight: "200px" }}
                                  >
                                    <li className="nav-item-custom">
                                      This category is not available yet
                                    </li>
                                  </ul>
                                </>
                              ))}
                          </div>
                          <br />

                          {/* Last Seen Date */}
                          <label
                            htmlFor="description"
                            style={{ fontWeight: "600" }}
                          >
                            Description*
                          </label>
                          <br />
                          <div
                            style={{ position: "relative", marginTop: "10px" }}
                          >
                            <CKEditor
                              editor={ClassicEditor}
                              data={descriptionLost}
                              config={{
                                licenseKey: "GPL",
                                toolbar: [
                                  "bold",
                                  "italic",
                                  "bulletedList",
                                  "numberedList",
                                  "link",
                                  "undo",
                                  "redo",
                                ],
                              }}
                              onChange={(event, editor) => {
                                setDescriptionLost(editor.getData());
                              }}
                            />
                          </div>
                          <br />
                        </div>
                      </div>

                      {/* Contact info */}
                      <h2 style={{ marginBottom: "20px" }}>
                        Contact Information
                      </h2>
                      <div className="stuff-information">
                        <div className="left">
                          <label
                            htmlFor="stuff-name"
                            style={{ fontWeight: "600" }}
                          >
                            Full Name*
                          </label>
                          <br />
                          <div style={{ position: "relative" }}>
                            {isInProcessing ? (
                              <Skeleton height={50} style={{ width: "100%" }} />
                            ) : (
                              <input
                                type="text"
                                name=""
                                id="stuff-name"
                                className="form-control-input-label-top input-read-only"
                                value={`${user.firstName} ${user.lastName}`}
                                required
                                readOnly
                              />
                            )}
                          </div>
                          <br />
                        </div>
                        <div className="right">
                          {/* Student ID */}
                          {user.student?.studentId && user.role && (
                            <>
                              {/* Student ID */}
                              <label
                                htmlFor="student-id"
                                style={{ fontWeight: "600" }}
                              >
                                Student ID
                              </label>
                              <br />
                              <div style={{ position: "relative" }}>
                                <input
                                  type="text"
                                  name=""
                                  id="student-id-lost"
                                  className="form-control-input-label-top"
                                  value={user.student?.studentId || ""}
                                  readOnly
                                />
                              </div>
                              <br />
                            </>
                          )}

                          {/* Last Seen Date */}
                          <label
                            htmlFor="school-email"
                            style={{ fontWeight: "600" }}
                          >
                            Email*
                          </label>
                          <br />
                          <div style={{ position: "relative" }}>
                            {isInProcessing ? (
                              <Skeleton height={50} style={{ width: "100%" }} />
                            ) : (
                              <input
                                type="email"
                                name=""
                                id="school-email"
                                className="form-control-input-label-top"
                                required
                                value={user.email || ""}
                                readOnly
                              />
                            )}
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>

                    {/* Btn Post */}
                    <button
                      className="btn"
                      style={{ width: "100%" }}
                      title={
                        categoryPostId === "" && isTypeSearch
                          ? "Please select a category name"
                          : ""
                      }
                      disabled={
                        user.role && !isInProcessing
                          ? handleValidateFormReport()
                          : true
                      }
                      aria-label="Post found item button"
                    >
                      Post Found Item{" "}
                      {categoryPostId === "" &&
                        isTypeSearch &&
                        "(Please select a category name)"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="modal-overlay-report-stuff"></div>

      {/* Popup notice code */}
      <div className="modal" id="popup-notice-code">
        <div className="modal-content">
          {lostOrFound === "Lost" ? (
            <>
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
                  This code is used to retrieve your lost item. Keep it private.
                  You can view it again in your profile post.
                </p>
              </div>
            </>
          ) : (
            user.role !== "Admin" && (
              <>
                <h2 style={{ backgroundColor: "transparent" }}>Instruction:</h2>

                <div className="policy-section">
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      fontStyle: "italic",
                      marginTop: "4px",
                    }}
                  >
                    Please bring this item to the <strong>Media Center</strong>{" "}
                    within <strong> 2 days</strong> to complete the found item
                    process.
                  </p>
                </div>
              </>
            )
          )}

          <div style={{ marginTop: "40px" }}>
            <button
              className="btn"
              onClick={() => {
                document.getElementById("popup-notice-code").style.display =
                  "none";
              }}
              aria-label="Okay button"
            >
              Okay
            </button>
            {user.role === "Admin" && (
              <button
                className="btn-yellow"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("codeToPrint", {
                      detail: `Code: ${code}`,
                    })
                  );
                }}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                aria-label="Print this code button"
              >
                Print this code
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
