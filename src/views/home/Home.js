import React, { useState, useEffect } from "react";
import starwars from "../../APIs/starwars";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [filmData, SetFilmData] = useState([]);
  useEffect(() => {
    starwars.getfilms().then((response) => {
      SetFilmData(response.results);
    });
  }, []);

  const navigate = useNavigate();
  const handleChangePage = (k) => {
    navigate("/film/" + k);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {filmData.map((item, index) => {
        return (
          <Card
            key={index}
            title={item.title}
            extra={
              <Button
                type="link"
                onClick={() => {
                  handleChangePage(index + 1);
                }}
              >
                details
              </Button>
            }
            style={{
              width: 300
            }}
          >
            <p>{item.director}</p>
            <p>{item.producer}</p>
            <p>{item.release_date}</p>
          </Card>
        );
      })}
    </div>
  );
}
