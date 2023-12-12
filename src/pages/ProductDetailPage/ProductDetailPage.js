import { useLocation, useNavigate } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import "./ProductDetailPage.scss";
function ProductDetailPage() {
  let product = useLocation();
  let navigate = useNavigate();
  return (
    <div className="product-detail-page-container">
      <div className="product-detail-page-container-nav p-3" style={{ fontWeight: 500 }}>
        <span onClick={() => navigate("/")}> Trang chủ</span>&nbsp;
        <i className="fa-solid fa-angle-right"></i> Chi tiết sản phẩm
      </div>

      <div className="product-detail-page-container-content container">
        <ProductDetail productName={product.state} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
