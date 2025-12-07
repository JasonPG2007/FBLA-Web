import ModalReportStuff from "./ModalReportStuff";
import { lazy, Suspense, useState } from "react";
const Lottie = lazy(() => import("lottie-react"));
import DocumentScan from "../assets/animations/Document-OCR-Scan.json";
import axios from "axios";

export default function Header() {
  // Variables
  const [v1, setV1] = useState(null);
  const [vector, setVector] = useState([]);

  // Functions
  const handleSearchByImage = async (e) => {
    // alert(e.target.value);

    const file = e.target.files[0];
    if (!file) return;

    const overlay = document.getElementById("overlay-search-image");
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    document.body.style.overflow = "hidden";

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:5001/embed", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      const overlay = document.getElementById("overlay-search-image");
      overlay.style.visibility = "hidden";
      overlay.style.opacity = "0";
      document.body.style.overflow = "auto";

      setVector(res.data);
      // window.location.href = "/search";

      const v2 = res.data;

      if (!v1) {
        setV1(v2);
        alert("Recorded V1");
      } else {
        const sim = cosineSimilarity(v1, v2);

        if (sim >= 0.8) {
          console.log("Similar");
        } else {
          console.log("Different");
        }
      }
    }
  };

  // Find similar image function
  function cosineSimilarity(v1, v2) {
    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < v1.length; i++) {
      // Mathematical formulas
      dot += v1[i] * v2[i];
      magA += v1[i] * v1[i];
      magB += v2[i] * v2[i];
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#fffde3ff",
          position: "sticky",
          top: "0",
          zIndex: "1",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <a href="/">
          <h1
            className="homepageh1"
            style={{ fontFamily: "Mochiy Pop One, sans-serif" }}
          >
            Back2Me
          </h1>
        </a>
        <div className="btn-with-border search-by-image">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="search-by-image">
              Search by image <i className="fa-solid fa-cloud-arrow-up"></i>
            </label>
            <label htmlFor="search-by-image">
              Super Quick <i className="fa-solid fa-bolt"></i>
            </label>
            <label htmlFor="search-by-image">
              Just 1 Click <i className="fa-solid fa-hand-pointer"></i>
            </label>
          </div>
          <input
            type="file"
            hidden
            id="search-by-image"
            onChange={handleSearchByImage}
          />

          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              top: "7px",
              left: "10px",
              fontSize: "18px",
            }}
          ></i>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <a href="#policyModal" style={{ marginRight: "40px" }}>
            Term & Guide
          </a>
          <a href="/about">
            <p className="homepageh2" style={{ marginRight: "40px" }}>
              About us
            </p>
          </a>
          <a href="/lost-and-found">
            <p className="homepageh2" style={{ marginRight: "40px" }}>
              Lost & Found
            </p>
          </a>
          <div className="profile-menu">
            <button
              className="avatar-btn"
              aria-label="button login"
              onClick={() => {
                document.getElementById("dropdown").classList.toggle("hidden");
              }}
            >
              <img src="./Image/user_icon.png" width="45" alt="avatar" />
            </button>

            <div id="dropdown" className="dropdown hidden">
              <a href="/authentication">Sign In</a>
            </div>
          </div>
          <button
            style={{
              marginLeft: "60px",
              backgroundColor: "#ec7207",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => {
              const modal = document.querySelector(".modal-report-stuff");
              const overlay = document.querySelector(
                ".modal-overlay-report-stuff"
              );
              modal.style.visibility = "visible";
              modal.style.opacity = "1";
              overlay.style.visibility = "visible";
              overlay.style.opacity = "1";
              document.body.style.overflow = "hidden";
            }}
          >
            Create a post <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      {/* Modal report stuff component */}
      <ModalReportStuff></ModalReportStuff>

      {/* Overlay processing search by image */}
      <div className="overlay" id="overlay-search-image">
        <Suspense fallback={<p>Loading animation...</p>}>
          <Lottie
            animationData={DocumentScan}
            className="m-auto"
            style={{ width: "50%", margin: "auto" }}
          />
        </Suspense>

        <p style={{ marginTop: "-150px", marginBottom: "200px" }}>
          Analyzing...
        </p>
      </div>

      {/* Modal Policy */}
      <div id="policyModal" className="modal">
        <div className="modal-content">
          <h2>Terms & Recovery Guide</h2>

          <div className="policy-section">
            <h3>Users agree NOT to:</h3>
            <ul>
              <li>Use the website for any unlawful purpose.</li>
              <li>
                Disrupt, interfere with, or attempt unauthorized access to the
                website or its systems.
              </li>
              <li>
                Upload or share content that is false, offensive, violates
                privacy, or infringes copyrights.
              </li>
              <li>
                Provide inaccurate information when creating an account (if
                applicable).
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>We reserve the right to:</h3>
            <ul>
              <li>
                Suspend, terminate, or limit your access if any violation is
                detected.
              </li>
              <li>
                Modify or temporarily disable any part of the website without
                prior notice.
              </li>
              <li>
                Collect and use user information as described in our Privacy
                Policy.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>For individuals seeking to reclaim lost items:</h3>
            <ul>
              <li>
                You <strong>MUST</strong> provide a detailed description of the
                lost item for verification with the holder.
              </li>
              <li>
                You are <strong>REQUIRED</strong> to create a post in order to
                receive a verification code.
              </li>
              <li>
                The post <strong>MUST</strong> include a complete and accurate
                description of the lost item.
              </li>
              <li>
                Users are responsible for regularly checking their post on the
                website for updates.
              </li>
              <li>
                You <strong>MUST</strong> present the verification code when
                retrieving your item.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>For individuals holding found items:</h3>
            <ul>
              <li>
                You are <strong>RESPONSIBLE</strong> for verifying the
                claimant's verification code and item description to ensure they
                match the item in your possession.
              </li>
              <li>
                You are <strong>RESPONSIBLE</strong> for creating a post to
                assist in returning the item to its rightful owner.
              </li>
            </ul>
          </div>

          <a
            className="close"
            href="#"
            onClick={() => {
              // setIsAgreeTerm(true);
            }}
          >
            I got it
          </a>
        </div>
      </div>
    </>
  );
}
