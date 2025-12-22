import { Helmet } from "react-helmet-async";

export default function About() {
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
            Back 2 Me is a community-driven platform dedicated to helping people reunite with their lost belongings. By making it easy to post lost and found items, connect with others, and share listings across social media, we increase the chances of returning items to their rightful owners. Together, we turn lost moments into found connections.
          </p>
          <p>
            Through the support of our growing community, Back 2 Me creates a safe and reliable space where users can share information, communicate easily, and help one another. Every post, share, and connection brings us one step closer to reuniting lost items with their owners and strengthening the bond within our community.
          </p>
        </div>
        <div className="content-bottom">
          <p></p>
          <button className="btn-report">Report a stuff</button>
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
              Section allows users to easily post and browse lost or found items. By providing clear descriptions, locations, and images, our platform helps connect people quickly and accurately. Each listing brings us closer to reuniting lost belongings with their rightful owners.
            </p>
          </div>
        </div>
        <div className="offer-middle">
          <label>Smart Filters</label>
          <div className="offer-content">
            <p>
              This filter helps users quickly find relevant lost or found items by narrowing results based on category, location, date, and keywords. This feature saves time and improves accuracy, making it easier to match items and reconnect them with their owners.
            </p>
          </div>
        </div>
        <div className="offer">
          <label>Interactive Map</label>
          <div className="offer-content">
            <p>
              This maps allows users to view lost and found items based on location. By displaying listings on a real-time map, users can easily track where items were lost or found and connect with others nearby to improve the chances of recovery.
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
            <button>
              Find a stuff <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
