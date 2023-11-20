import { Link, useLocation } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import "./ProductDetailPage.scss";
function ProductDetailPage() {
  let product = useLocation();

  return (
    <div className="product-detail-page-container">
      <div className="product-detail-page-container-nav p-3" style={{ fontWeight: 500 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Trang chủ&nbsp;
        </Link>
        <i className="fa-solid fa-angle-right"></i> Chi tiết sản phẩm
      </div>

      <div className="product-detail-page-container-content container">
        <ProductDetail productName={product.state} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
