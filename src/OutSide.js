import "./views/Outside.css";
import "antd/dist/antd.css";
import SidesMenu from "./sanbox/SidesMenu";
import TopHeader from "./sanbox/TopHeader";
import Home from "./views/home/Home";
import Film from "./views/film/Film";
import PeopleInfo from "./views/peopleInfo/PeopleInfo";
import PlanetsInfo from "./views/planetsInfo/PlanetsInfo";
import StarshipsInfo from "./views/starshipsInfo/StarshipsInfo";
import Error from "./views/error/Error";
import Redirects from "./components/Redirects";
import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
const { Content } = Layout;

function Outside() {
  return (
    <div style={{ height: "100%" }}>
      <Layout className="ant-layout">
        <SidesMenu />
        <Layout className="site-layout">
          <TopHeader />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/peopleinfo" element={<PeopleInfo />} />
              <Route path="/planets" element={<PlanetsInfo />} />
              <Route path="/film/:filmid" element={<Film />} />
              <Route path="/starship" element={<StarshipsInfo />} />
              <Route path="/" element={<Redirects to="/home" />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Outside;
