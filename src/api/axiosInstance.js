import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL:
    "https://lost-and-found-cqade7hfbjgvcbdq.centralus-01.azurewebsites.net/api",
  withCredentials: true, // Allow sending cookies with requests
});

axiosInstance.interceptors.response.use(
  (response) => {
    sessionStorage.removeItem("requiredSignIn");
    return response;
  },
  (error) => {
    // Unauthorized
    if (error.response?.status === 401) {
      //   document.getElementById("sessionExpiredModal").style.opacity = "1";
      //   document.getElementById("sessionExpiredModal").style.visibility =
      //     "visible";
      //   document.getElementById("sessionExpiredModal").classList.add("modal");
      //   document.getElementById("overlay-session-expired").style.opacity = "1";
      //   document.getElementById("overlay-session-expired").style.visibility =
      //     "visible";
      //   document.body.style.overflow = "hidden";

      //   Cookies.remove("staffName");

      sessionStorage.setItem(
        "requiredSignIn",
        "You have to sign in to do this action",
      );

      window.location.href = "/authentication";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
