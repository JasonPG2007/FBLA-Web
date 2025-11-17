export default function Footer() {
  return (
    <>
      <footer>
        <div className="left">
          <a href="/">Back2Me</a>
        </div>
        <div className="middle">
          <div className="top">
            <a href="/how-it-works">How it works</a>
            <a href="">Contact</a>
            <a href="">Blog</a>
          </div>
          <div className="bottom">
            <a href="">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="right">
          <label htmlFor="">Sign up for Newsletter</label>
          <br />
          <form>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email"
              required
            />
            <button>Submit</button>
          </form>
        </div>
      </footer>
    </>
  );
}
