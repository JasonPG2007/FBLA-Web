export default function Home() {
  return (
    <>
      <p style={{ fontSize: "40px", marginLeft: "60%", marginTop: "100px" }}>
        We can help find your <strong>LOST</strong>
      </p>
      <p style={{ fontSize: "40px", marginLeft: "58%" }}>
        Stuffs or reunite <strong>FOUND</strong> Stuffs with
      </p>
      <p style={{ fontSize: "40px", marginLeft: "67%" }}>their owners</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <p
          style={{ fontSize: "20px", marginLeft: "1200px", marginTop: "200px" }}
        >
          {" "}
          <strong>Lost Stuff</strong>
        </p>
      </div>
    </>
  );
}
