import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Please wait...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
