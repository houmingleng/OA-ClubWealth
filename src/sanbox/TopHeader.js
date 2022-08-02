import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useState } from "react";
// import {connect} from 'react-redux'

const { Header } = Layout;

function TopHeader(props) {
  console.log(props);
  const [collapsed, setCollapsed] = useState(false);
  const changecollapsed = () => {
    setCollapsed(!collapsed);
  };

  // const mapStateToProps=()=>{
  //   return {
  //     a:1
  //   }
  // }

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      {collapsed ? (
        <MenuFoldOutlined onClick={changecollapsed} />
      ) : (
        <MenuUnfoldOutlined onClick={changecollapsed} />
      )}
      <div style={{ float: "right" }}>
        <span>welcome </span>
      </div>
    </Header>
  );
}
export default TopHeader;
// export default connect()(TopHeader);
