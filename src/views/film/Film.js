import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starwars from "../../APIs/starwars";
import { Descriptions, Card, Col, Row } from "antd";
// import Echarts from 'echarts'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
export default function Film() {
  const param = useParams();

  const [filmData, SetFilmData] = useState({});
  useEffect(() => {
    starwars.getfilm(param.filmid).then((response) => {
      //  console.log(response)
      SetFilmData(response.data);
    });
  }, []);

  // useEffect (()=>{
  //     var mychart = Echarts

  // },[])

  // function getData() {

  //     starwars.getfilm(param.filmid).then((response) => {
  //    console.log(response.data)
  //     SetFilmData(response.data)
  //   });
  //   starwars.getPeople().then(async (response) => {
  //     SettotalNumber(response.count)
  //     for(let i = 1; i<= Math.ceil(response.count/10) ;i++){
  //       const result = await starwars.getPeoples(i);
  //       newarray.push(...result.results)
  //     }

  //     newarray.forEach((r,i)=>{
  //         r.key = i;
  //     })
  //     // console.log(newarray)
  //     SetPeopleData(newarray)
  //   })
  // }

  return (
    <div>
      <Descriptions title={filmData.title} bordered column={3}>
        <Descriptions.Item label="director">
          {filmData.director}
        </Descriptions.Item>
        <Descriptions.Item label="producer">
          {filmData.producer}
        </Descriptions.Item>
        <Descriptions.Item label="episode_id">
          {filmData.episode_id}
        </Descriptions.Item>
        <Descriptions.Item label="release_date">
          {filmData.release_date}
        </Descriptions.Item>
        <Descriptions.Item label="url">{filmData.url}</Descriptions.Item>
        <Descriptions.Item label="opening_crawl">
          {filmData.opening_crawl}
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Ratio" bordered={false}>
            {/* <div id="mains">

          </div> */}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Like" bordered={false}>
            Like
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          ></Card>
        </Col>
      </Row>
    </div>
  );
}
