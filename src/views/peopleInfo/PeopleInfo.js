import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button } from "antd";
import starwars from "../../APIs/starwars";
// import axios from "axios";

//record.name.indexOf(value) === 0
export default function PeopleInfo() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"]
    },
    {
      title: "height",
      dataIndex: "height",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.height - b.height
    },
    {
      title: "weight",
      dataIndex: "mass",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.mass - b.mass
    },
    {
      title: "gender",
      dataIndex: "gender",
      filters: [
        {
          text: "male",
          value: "male"
        },
        {
          text: "female",
          value: "female"
        }
      ],
      onFilter: (value, record) => {
        record.name.includes(value);
      }
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        peopleData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null
    }
  ];

  const [peopleData, SetPeopleData] = useState([]);

  // const [total, SettotalNumber] = useState(0);

  useEffect(() => {
    getData();
    // axios.get('https://swapi.dev/api/people',{
    //   params:{
    //     count,
    //
    //   },
    //   header:{
    //     Authorization: sessionStorage.token
    //   }
    // }).then(res=>{
    //     console.log(res)
    // })
  }, []);

  function getData() {
    let newarray = [];
    starwars.getPeople().then(async (response) => {
      // SettotalNumber(response.count)
      for (let i = 1; i <= Math.ceil(response.count / 10); i++) {
        const result = await starwars.getPeoples(i);
        newarray.push(...result.results);
      }

      newarray.forEach((r, i) => {
        r.key = i;
      });
      // console.log(newarray)
      SetPeopleData(newarray);
    });
  }

  const handleDelete = (key) => {
    const newData = peopleData.filter((item) => item.key !== key);
    SetPeopleData(newData);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };
  // const changepagemin = ()=>{
  //   SetPage(page-1)
  // }
  // const changepageplus = ()=>{
  //   SetPage(page+1)
  // }
  //style={{display:"none"}}
  return (
    <div>
      <Table columns={columns} dataSource={peopleData} onChange={onChange} />
      {/* <div style={{display:"flex"}}>
    
    {/* <Button onClick={changepagemin}>pre</Button>
    {/* <span>  page: {page} total: {total} </span> */}
      {/* <Button onClick={changepageplus}>next</Button> */}
      {/* <Pagination
      total={total}
      showTotal={(total) => `Total ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
      style={{marginTop:"10px"}}
    /> */}
    </div>
  );
}
