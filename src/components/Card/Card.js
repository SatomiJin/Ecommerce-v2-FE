import { useNavigate } from "react-router-dom";
import "./Card.scss";

function Card(props) {
  const navigate = useNavigate();
  // navigate(`/product-detail/${name.toLowerCase().replace(/\s/g, "-")}`, { state: name });
  const handleRedirectDetailPage = () => {
    navigate(`/product/product-detail/${props.name.toLowerCase().replace(/\s/g, "-")}`, { state: props.name });
  };
  const renderStar = (rating) => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<i className="fa-solid fa-star" key={i}></i>);
    }
    return stars;
  };
  return (
    <div className="card my-3" style={{ width: "15rem" }} onClick={() => handleRedirectDetailPage()}>
      <img src={props && props.image} style={{ height: "11rem" }} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="card-name-product my-2">{props && props.name}</div>

        <div className="card-price">
          <div className="card-price-product">{props && props.price}</div>
          <div className="card-discount text-center my-1">Giảm {props && props.discount}%</div>
        </div>
        <div className="card-sold my-2">
          {renderStar(4)} <span>Đã bán </span>
          {props && props.sold}
        </div>
        <div className="card-address-product">TP.Hồ Chí Minh</div>
      </div>
    </div>
  );
}

export default Card;
