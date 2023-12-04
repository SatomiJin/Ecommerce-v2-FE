import { useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import "./AdminPage.scss";
import AdminUser from "../../components/AdminComponent/AdminUser";
import AdminProduct from "../../components/AdminComponent/AdminProduct";
import AdminOrder from "../../components/AdminComponent/AdminOrder";
function AdminPage() {
  const [option, setOption] = useState("");
  const handleSelectOption = (key) => {
    setOption(key);
  };
  const handleSelectedOption = (option) => {
    switch (option) {
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct />;
      case "orders":
        return <AdminOrder />;
      default:
        return <AdminUser />;
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-content">
        <div className="admin-page-content-left">
          <AdminMenu handleSelectOption={handleSelectOption} />
        </div>
        <div className="admin-page-content-right container">{handleSelectedOption(option)}</div>
      </div>
    </div>
  );
}

export default AdminPage;
