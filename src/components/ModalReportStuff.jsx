export default function ModalReportStuff() {
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
              }}
            >
              Found Stuff
            </h2>
          </div>
        </div>
        <div className="modal-content-container">
          <div className="form-section-report-stuff">
            <p>This is a placeholder for the ModalReportStuff component.</p>
          </div>
          <div className="form-section-report-stuff">
            <p>More content can go here.</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="modal-overlay-report-stuff"></div>
    </>
  );
}
