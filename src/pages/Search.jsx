import { useState } from "react";

export default function Search() {
  let [isDropdownOpenType, setIsDropdownOpenType] = useState(false);
  let [isDropdownOpenLocation, setIsDropdownOpenLocation] = useState(false);
  return (
    <>
      <form action="">
        <div className="filter">
          <div className="top-filter">
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
                }}
              >
                Status
              </p>
              <input
                type="radio"
                name="status"
                id="lost"
                checked
                style={{ marginLeft: "20px" }}
              />{" "}
              <label htmlFor="lost" style={{ marginRight: "40px" }}>
                <strong>Lost</strong>
              </label>
              <input type="radio" name="status" id="found" />{" "}
              <label htmlFor="found">
                <strong>Found</strong>
              </label>
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="type">Type of Stuff</label>
              </p>
              <select
                name=""
                id="type"
                onClick={() => {
                  setIsDropdownOpenType(!isDropdownOpenType);
                }}
                className="form-control"
              >
                <option value="">Select type</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="documents">Documents</option>
                <option value="accessories">Accessories</option>
                <option value="others">Others</option>
              </select>
              {isDropdownOpenType ? (
                <i className="fa-solid fa-caret-up caret-type"></i>
              ) : (
                <i className="fa-solid fa-caret-down caret-type"></i>
              )}
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="name">Stuff name or ID</label>
              </p>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter name or ID"
              />
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="location">Location</label>
              </p>
              <select
                name=""
                id="location"
                onClick={() => {
                  setIsDropdownOpenLocation(!isDropdownOpenLocation);
                }}
                className="form-control"
              >
                <option value="">Select location</option>
                <option value="500">500 Hall</option>
                <option value="600">600 Hall</option>
              </select>
              {isDropdownOpenLocation ? (
                <i className="fa-solid fa-caret-up caret-type"></i>
              ) : (
                <i className="fa-solid fa-caret-down caret-type"></i>
              )}
            </div>
            <button className="btn-use-filter">Use Filter</button>
          </div>
        </div>
      </form>
    </>
  );
}
