import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Search from "../pages/Search";
import DetailPost from "../pages/DetailPost";
import Profile from "../pages/Profile";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";
import LostAndFound from "../pages/LostAndFound";
import Notifications from "../pages/Notifications";
import MyPost from "../pages/MyPost";
import { SkeletonTheme } from "react-loading-skeleton";
import Support from "../pages/Support";
import Dashboard from "../pages/Dashboard";
import VerificationCodes from "../pages/VerificationCodes";
import Users from "../pages/Users";
import WaitingRequests from "../pages/WaitingRequests";

export default function Router() {
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#E0CFC1" highlightColor="#F5EDE5">
        <Suspense fallback={<div>Please wait...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail-post/*" element={<DetailPost />} />
            <Route path="/support" element={<Support />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/lost-and-found" element={<LostAndFound />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-posts" element={<MyPost />} />
            <Route path="/dashboard/overview" element={<Dashboard />} />
            <Route
              path="/dashboard/verification-codes"
              element={<VerificationCodes />}
            />
            <Route path="/dashboard/users" element={<Users />} />
            <Route
              path="/dashboard/waiting-requests"
              element={<WaitingRequests />}
            />
          </Routes>
        </Suspense>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

const PageSkeleton = () => (
  <>
    <Skeleton height={60} />
    <Skeleton height={180} />
    <Skeleton count={4} />
  </>
);
