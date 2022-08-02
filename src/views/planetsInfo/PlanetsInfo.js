import React, { useState, useEffect, useRef } from "react";
import { Table, Popconfirm, Button, Input, Space } from "antd";
import starwars from "../../APIs/starwars";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
export default function PlanetsInfo() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [plantdata, SetPlantdata] = useState([]);
  // const [newplantdata, SetnewPlantdata] = useState([]);
  // const [total, SettotalNumber] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let newarray = [];
    starwars.getPlanet().then(async (response) => {
      for (let i = 1; i <= Math.ceil(response.count / 10); i++) {
        const result = await starwars.getPlanets(i);
        newarray.push(...result.results);
      }

      newarray.forEach((r, i) => {
        r.key = i;
      });
      // console.log(newarray)
      SetPlantdata(newarray);
    });
  }

  const handleDelete = (key) => {
    const newData = plantdata.filter((item) => item.key !== key);
    SetPlantdata(newData);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div
        style={{
          padding: 8
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block"
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  const onChange = (filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };
  // const changepagemin = ()=>{
  //   SetPage(page-1)
  // }
  // const changepageplus = ()=>{
  //   SetPage(page+1)
  // }
  //style={{display:"none"}}
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name")
    },
    {
      title: "rotation_period",
      dataIndex: "rotation_period",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rotation_period - b.rotation_period
    },
    {
      title: "diameter",
      dataIndex: "diameter",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.diameter - b.diameter
    },
    {
      title: "population",
      dataIndex: "population",
      sorter: (a, b) => a.population - b.population
    },
    {
      title: "climate",
      dataIndex: "climate",
      ...getColumnSearchProps("climate")
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        plantdata.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];

  return (
    <div>
      <Button>search on name </Button>
      <Table columns={columns} dataSource={plantdata} onChange={onChange} />
    </div>
  );
}
