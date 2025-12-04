import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Search from "../pages/Search";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";
import LostAndFound from "../pages/LostAndFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Please wait...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/lost-and-found" element={<LostAndFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
