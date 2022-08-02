import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import "./Sidemenu.css";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

export default function SidesMenu() {
  const menuList = [
    {
      key: "/home",
      icons: <UploadOutlined />,
      title: "Home"
    },
    {
      key: "/peopleinfo",
      icons: <UserOutlined />,
      title: "People List"
    },
    {
      key: "/planets",
      icons: <VideoCameraOutlined />,
      title: "Planets"
    },
    {
      key: "/starship",
      icons: <UserOutlined />,
      title: "StartShips"
    }
  ];

  const navigate = useNavigate();
  const handleChangePage = (k) => {
    navigate(k, { replace: true });
  };

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={item.key}
          icon={item.icons}
          onClick={() => {
            handleChangePage(item.key);
          }}
        >
          {" "}
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Sider trigger={null}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">welcome to the Star System </div>
        <div style={{ flex: "1" }}>
          <Menu theme="dark" mode="inline">
            {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}
