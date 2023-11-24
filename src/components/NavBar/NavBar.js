import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useEffect, useState } from "react";
function NavBar(props) {
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
                      <Link className="nav-link active" aria-current="page" href="/">
                        {item.type}
                      </Link>
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
