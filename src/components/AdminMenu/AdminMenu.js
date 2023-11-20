import { Menu } from "antd";
import "./AdminMenu.scss";
import { ContainerOutlined, DesktopOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
function AdminMenu(props) {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Quản lý người dùng", "users", <MenuUnfoldOutlined onClick={() => toggleCollapsed()} />),
    getItem("Quản lý  sản phẩm", "products", <DesktopOutlined />),
    getItem("Quản lý đơn hàng", "orders", <ContainerOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleSelect = ({ key }) => {
    props.handleSelectOption(key);
  };
  return (
    <div className="admin-menu-container">
      <div className="admin-menu-content" style={{ width: collapsed === true ? 80 : 300 }}>
        <Menu
          defaultSelectedKeys={["users"]}
          defaultOpenKeys={["users"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          style={{ minHeight: "100vh" }}
          onClick={handleSelect}
        />
      </div>
    </div>
  );
}

export default AdminMenu;
