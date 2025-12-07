import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRef, useState } from "react";

export default function ModalReportStuff() {
  // Variables
  const fileInputLostRef = useRef(null);
  const fileInputFoundRef = useRef(null);
  let [description, setDescription] = useState("");
  let [imageLost, setImageLost] = useState(null);
  let [imageFound, setImageFound] = useState(null);

  // Functions
  const handleImageLostChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageLost(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageFoundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFound(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

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

                // Change to lost stuff form
                document.getElementById("form-lost-found").style.transform =
                  "translateX(0)";
              }}
            >
              Lost Stuff
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

                // Change to found stuff form
                document.getElementById("form-lost-found").style.transform =
                  "translateX(-52%)";
              }}
            >
              Found Stuff
            </h2>
          </div>

          <div
            className="close-modal-report"
            onClick={() => {
              const modal = document.querySelector(".modal-report-stuff");
              const overlay = document.querySelector(
                ".modal-overlay-report-stuff"
              );
              modal.style.visibility = "hidden";
              modal.style.opacity = "0";
              overlay.style.visibility = "hidden";
              overlay.style.opacity = "0";
              document.body.style.overflow = "auto";
            }}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="form-lost-found-container" id="form-lost-found">
            {/* Form lost stuff */}
            <form style={{ width: "100%" }}>
              <div className="modal-content-container">
                <div style={{ textAlign: "center" }}>
                  <div
                    className={!imageLost && "upload-img-box"}
                    onClick={() => {
                      fileInputLostRef.current.click();
                    }}
                  >
                    {!imageLost && (
                      <>
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <p>Drag and Drop here</p>
                        <p style={{ marginBottom: "30px", marginTop: "10px" }}>
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
                    {imageLost && (
                      <img
                        src={imageLost}
                        alt="Preview lost item"
                        width="290"
                        loading="lazy"
                        height="297"
                        className="preview-img"
                      />
                    )}
                  </div>

                  {/* Btn change image */}
                  {imageLost && (
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
                    </div>
                  )}
                </div>

                <div>
                  <div className="stuff-information-box">
                    {/* Stuff info */}
                    <h2 style={{ marginBottom: "20px" }}>Stuff Information</h2>
                    <div className="stuff-information">
                      <div className="left">
                        <label
                          htmlFor="stuff-name"
                          style={{ fontWeight: "600" }}
                        >
                          Stuff Name
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
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter name</label>
                        </div>
                        <br />
                      </div>
                      <div className="right">
                        {/* Stuff ID */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Category
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            name=""
                            id="stuff-id"
                            placeholder="Ex: 736296"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                            onInput={(e) => {
                              e.target.value = e.target.value
                                .replace(/[^0-9]/g, "") // Remove non-numeric characters
                                .slice(0, 9); // Allow only numbers, max length 9
                            }}
                          />
                          <label className="label-top">Enter ID</label>
                        </div>
                        <br />

                        {/* Last Seen Date */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Description
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            config={{
                              licenseKey: "GPL",
                              toolbar: [
                                "bold",
                                "italic",
                                "underline",
                                "bulletedList",
                                "numberedList",
                                "link",
                                "undo",
                                "redo",
                              ],
                            }}
                            onChange={(event, editor) => {
                              setDescription(editor.getData());
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
                          Full Name
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
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter name</label>
                        </div>
                        <br />
                      </div>
                      <div className="right">
                        {/* Stuff ID */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Student ID
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            name=""
                            id="stuff-id"
                            placeholder="Ex: 736296"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter ID</label>
                        </div>
                        <br />

                        {/* Last Seen Date */}
                        <label
                          htmlFor="school-email"
                          style={{ fontWeight: "600" }}
                        >
                          School Email
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="email"
                            name=""
                            id="school-email"
                            placeholder="Ex: demo@ex.io"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter Email</label>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  {/* Btn Post */}
                  <button className="btn" style={{ width: "100%" }}>
                    Post Lost Item
                  </button>
                </div>
              </div>
            </form>

            {/* Form found stuff */}
            <form style={{ width: "100%" }}>
              <div className="modal-content-container">
                <div style={{ textAlign: "center" }}>
                  <div
                    className={!imageFound && "upload-img-box"}
                    onClick={() => {
                      fileInputFoundRef.current.click();
                    }}
                  >
                    {!imageFound && (
                      <>
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <p>Drag and Drop here</p>
                        <p style={{ marginBottom: "30px", marginTop: "10px" }}>
                          or
                        </p>
                        <label className="btn-yellow">Select image</label>
                      </>
                    )}
                    <input
                      type="file"
                      id="upload-img-found"
                      ref={fileInputFoundRef}
                      onChange={handleImageFoundChange}
                      style={{ display: "none" }}
                    />

                    {imageFound && (
                      <img
                        src={imageFound}
                        alt="Preview found item"
                        width="290"
                        loading="lazy"
                        height="297"
                        className="preview-img"
                      />
                    )}
                  </div>

                  {/* Btn change image */}
                  {imageFound && (
                    <div className="btn-change-img">
                      <label htmlFor="upload-img-found" className="btn-yellow">
                        Change image
                      </label>
                      <input
                        type="file"
                        id="upload-img"
                        style={{ display: "none" }}
                        onChange={handleImageLostChange}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="stuff-information-box">
                    {/* Stuff info */}
                    <h2 style={{ marginBottom: "20px" }}>Stuff Information</h2>
                    <div className="stuff-information">
                      <div className="left">
                        <label
                          htmlFor="stuff-name"
                          style={{ fontWeight: "600" }}
                        >
                          Stuff Name
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
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter name</label>
                        </div>
                        <br />
                      </div>
                      <div className="right">
                        {/* Stuff ID */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Category
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            name=""
                            id="stuff-id"
                            placeholder="Ex: 736296"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                            onInput={(e) => {
                              e.target.value = e.target.value
                                .replace(/[^0-9]/g, "") // Remove non-numeric characters
                                .slice(0, 9); // Allow only numbers, max length 9
                            }}
                          />
                          <label className="label-top">Enter ID</label>
                        </div>
                        <br />

                        {/* Last Seen Date */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Description
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            config={{
                              licenseKey: "GPL",
                              toolbar: [
                                "bold",
                                "italic",
                                "underline",
                                "bulletedList",
                                "numberedList",
                                "link",
                                "undo",
                                "redo",
                              ],
                            }}
                            onChange={(event, editor) => {
                              setDescription(editor.getData());
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
                          Full Name
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
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter name</label>
                        </div>
                        <br />
                      </div>
                      <div className="right">
                        {/* Stuff ID */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          Student ID
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="text"
                            name=""
                            id="stuff-id"
                            placeholder="Ex: 736296"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter ID</label>
                        </div>
                        <br />

                        {/* Last Seen Date */}
                        <label htmlFor="stuff-id" style={{ fontWeight: "600" }}>
                          School Email
                        </label>
                        <br />
                        <div
                          style={{ position: "relative", marginTop: "10px" }}
                        >
                          <input
                            type="email"
                            name=""
                            id="stuff-id"
                            placeholder="Ex: 736296"
                            className="form-control-input-label-top"
                            autoFocus
                            required
                            onChange={(e) => {}}
                          />
                          <label className="label-top">Enter email</label>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  {/* Btn Post */}
                  <button className="btn" style={{ width: "100%" }}>
                    Post Found Item
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="modal-overlay-report-stuff"></div>
    </>
  );
}
