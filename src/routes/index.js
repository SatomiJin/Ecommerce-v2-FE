import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import UserProfile from "../pages/UserProfile/UserProfile";

export const routes = [
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/user/profile-user/:id",
    page: UserProfile,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/product/product-detail/:name",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/system/admin-page",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
    isLogin: true,
  },
];
