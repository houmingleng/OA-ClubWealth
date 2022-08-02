import React, { useState, useEffect, useRef } from "react";
import { Table, Popconfirm, Button, Input, Space } from "antd";
import starwars from "../../APIs/starwars";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
export default function StarshipsInfo() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [starshipdata, Setstarshipdata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let newarray = [];
    starwars.getStarship().then(async (response) => {
      for (let i = 1; i <= Math.ceil(response.count / 10); i++) {
        const result = await starwars.getStarships(i);
        newarray.push(...result.results);
      }
      newarray.forEach((r, i) => {
        r.key = i;
      });
      // console.log(newarray)
      Setstarshipdata(newarray);
    });
  }

  const handleDelete = (key) => {
    const newData = starshipdata.filter((item) => item.key !== key);
    Setstarshipdata(newData);
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
      title: "model",
      dataIndex: "model",
      ...getColumnSearchProps("model")
    },
    {
      title: "manufacturer",
      dataIndex: "manufacturer",
      ...getColumnSearchProps("manufacturer")
    },
    {
      title: "cost_in_credits",
      dataIndex: "cost_in_credits",
      sorter: (a, b) => a.cost_in_credits - b.cost_in_credits
    },
    {
      title: "max_atmosphering_speed",
      dataIndex: "max_atmosphering_speed",
      sorter: (a, b) => a.max_atmosphering_speed - b.max_atmosphering_speed
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        starshipdata.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null
    }
  ];

  return (
    <div>
      <Button>search on name </Button>
      <Table columns={columns} dataSource={starshipdata} onChange={onChange} />
    </div>
  );
}
