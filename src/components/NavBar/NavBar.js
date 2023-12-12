import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as utils from "../../utils";
import "./NavBar.scss";

function NavBar(props) {
  let navigate = useNavigate();

  const handleRedirect = (type) => {
    navigate(`/product/type-product/${type.toLowerCase().replace(/\s/g, "-")}`, { state: type });
  };
  let [arrType, setArrType] = useState([]);
  useEffect(() => {
    setArrType(props.typeProduct);
  }, [props.typeProduct]);
  return (
    <div className="nav-bar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid container">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {arrType &&
                arrType.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <button onClick={() => handleRedirect(item.type)} className="btn">
                        {utils.capitalizeFirstLetter(item.type)}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
