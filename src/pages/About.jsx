import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axiosInstance";

export default function About() {
  // APIs
  const API_URL_Auth = `https://localhost:44306/api/CheckAuth/check-auth`;

  // Check authentication status and redirect if not authenticated
  const checkAuthentication = () => {
    axiosInstance.get(API_URL_Auth).catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>About Us | Back2Me </title>
      </Helmet>

      <div className="big-block-about">
        <h1>
          About <span className="poppins-font">Back2Me</span>
        </h1>
        <div className="content">
          <p>
            Back2Me is a community-driven platform dedicated to helping people reunite with their lost belongings.
            By making it easy to post lost and found items, connect with others, and share listings across social media, we increase the chances of returning items to their rightful owners.
            Together, we turn lost moments into found connections.
          </p>
          <p>
            Through the support of our growing community, Back2Me creates a safe and reliable space where users can share information, communicate easily, and support one another.
            Every post, share, and connection brings us one step closer to reuniting lost items with their owners and strengthening community bonds.
          </p>
        </div>
        <div className="content-bottom">
          <p></p>
          <button
            aria-label="Report a stuff button"
            className="btn"
            onClick={() => {
              checkAuthentication();

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
            <i className="fa-solid fa-plus"></i> Create a post
          </button>
        </div>
      </div>

      <h1 className="poppins-font offer-h1">
        What we{" "}
        <span style={{ fontFamily: "Mochiy Pop One, sans-serif" }}>offer</span>
      </h1>

      <div className="offer-block">
        <div className="offer">
          <label>Lost & Found Listings</label>
          <div className="offer-content">
            <p>
              This section allows users to easily post and browse lost or found items.
              By providing clear descriptions, locations, and images, our platform helps connect people quickly and accurately.
              Each listing brings us closer to reuniting lost belongings with their rightful owners.
            </p>
          </div>
        </div>
        <div className="offer-middle">
          <label>Smart Filters</label>
          <div className="offer-content">
            <p>
              This feature helps users quickly find relevant lost or found items by narrowing results based on category, location, date, and keywords.
              Smart Filters save time and improve accuracy, making it easier to match items and reconnect them with their owners.
            </p>
          </div>
        </div>
        <div className="offer">
          <label>Interactive Map</label>
          <div className="offer-content">
            <p>
              This map allows users to view lost and found items based on location.
              By displaying listings on a real-time map, users can easily see where items were lost or found
              and connect with others nearby to improve the chances of recovery.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={() => { }}>
        <div className="quick-search">
          <div className="categories">
            <div className="left">
              <label htmlFor="category">Type of Stuff</label>
              <br />
              <select className="select" name="" id="category" required>
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
              <select className="select" name="" id="location" required>
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
            <button
              aria-label="Find a stuff button">
              Find a stuff <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
