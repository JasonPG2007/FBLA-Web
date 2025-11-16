import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./routes/Router";

export default function App() {
  return (
    <>
      <Header></Header>
      <div id="wrapper">
        <Router></Router>
      </div>
      <Footer></Footer>
    </>
  );
}
