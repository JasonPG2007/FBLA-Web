import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import Detailpost from "../pages/Detailpost";
import Profile from "../pages/Profile";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Please wait...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />{" "}
          <Route path="/search" element={<Search />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/detail-post/*" element={<Detailpost />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
