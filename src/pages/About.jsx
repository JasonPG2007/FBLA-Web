export default function About() {
  return (
    <>
      <div className="big-block-about">
        <h1>
          About <span className="poppins-font">Back2Me</span>
        </h1>
        <div className="content">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse odit
            tempore, rem deserunt tempora nemo unde fuga debitis neque, ratione
            pariatur cum dolorum natus incidunt illum quo, temporibus totam
            ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Esse odit tempore, rem deserunt tempora nemo unde fuga debitis
            neque, ratione pariatur cum dolorum natus incidunt illum quo,
            temporibus totam ipsam! ipsam! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse odit
            tempore, rem deserunt tempora nemo unde fuga debitis neque, ratione
            pariatur cum dolorum natus incidunt illum quo, temporibus totam
            ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Esse odit tempore, rem deserunt tempora nemo unde fuga debitis
            neque, ratione pariatur cum dolorum natus incidunt illum quo,
            temporibus totam ipsam! ipsam! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit.
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              odit tempore, rem deserunt tempora nemo unde fuga debitis neque,
              ratione pariatur cum dolorum natus incidunt illum quo, temporibus
              totam ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Esse odit tempore,
            </p>
          </div>
        </div>
        <div className="offer-middle">
          <label>Smart Filters</label>
          <div className="offer-content">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              odit tempore, rem deserunt tempora nemo unde fuga debitis neque,
              ratione pariatur cum dolorum natus incidunt illum quo, temporibus
              totam ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Esse odit tempore,
            </p>
          </div>
        </div>
        <div className="offer">
          <label>Interactive Map</label>
          <div className="offer-content">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              odit tempore, rem deserunt tempora nemo unde fuga debitis neque,
              ratione pariatur cum dolorum natus incidunt illum quo, temporibus
              totam ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Esse odit tempore,
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={() => {}}>
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
