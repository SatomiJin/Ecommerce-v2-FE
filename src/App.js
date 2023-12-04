import "./App.css";
import DefaultComponent from "./components/DefaultComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import "react-toastify/dist/ReactToastify.css";
import * as utils from "./utils";
import * as UserService from "./service/UserService";
import { resetUser, updateUser } from "./redux/slides/UserReducer";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleDecoded = () => {
    let storageData = (user && user.access_token) || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && utils.isJsonString(storageData) && !user.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  //useEffect
  useEffect(() => {
    setIsLoading(!isLoading);
    const { decoded, storageData } = handleDecoded();
    if (decoded && decoded.id) {
      handleGetDetailUser(decoded.id, decoded.email, storageData);
    }
    setIsLoading(!isLoading);
  }, []);
  const handleGetDetailUser = async (id, email, token) => {
    let data = {
      id: id,
      email: email,
    };

    let storageRefreshToken = localStorage.getItem("refresh_token");
    let refreshToken = JSON.parse(storageRefreshToken);
    let res = await UserService.getDetailUserById(data, token);
    dispatch(updateUser({ ...res.data, access_token: token, refreshToken: refreshToken }));
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      let decodedRefreshToken = jwtDecode(refreshToken);
      if (decoded && decoded.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken && decodedRefreshToken.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data && data.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <div className="app" style={{ height: "100vh", width: "100%" }}>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            let Page = route.page;
            let authUser = !route.isPrivate || user.roleId === "R1";
            let checkLogin = !route.isLogin || user.id !== "";
            let Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={route.isLogin ? (checkLogin && authUser ? route.path : "") : route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
