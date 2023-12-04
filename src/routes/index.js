import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import DetailOrderPage from "../pages/DetailOrderPage/DetailOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import UserProfile from "../pages/UserProfile/UserProfile";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
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
    path: "/user/your-order",
    page: MyOrderPage,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/user/your-order/detail-order",
    page: DetailOrderPage,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/product/product-detail/:name",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/cart-product",
    page: CartPage,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/payment/payment-order",
    page: PaymentPage,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/payment/payment-success",
    page: PaymentSuccess,
    isShowHeader: true,
    isLogin: true,
  },
  {
    path: "/system/admin-page",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
    isLogin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
