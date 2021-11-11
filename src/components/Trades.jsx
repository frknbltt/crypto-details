import { Input, Table } from "antd";
import React, { useContext, useState } from "react";
import { DataContext } from "../context/Context";
import ReactLoading from "react-loading";

export const Trades = () => {
  const { Search } = Input;
  const [searchText, setSearchText] = useState("");
  const { data } = useContext(DataContext);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "QUOTEQTY",
      dataIndex: "quoteQty",
      key: "quoteQty",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  const __data = !!searchText
    ? data.filter((o) =>
        Object.keys(o).some((k) =>
          o[k]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toString().toLowerCase())
        )
      )
    : data;
  if (data === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactLoading color={"#334CB2"} height={20} width={30} />
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 style={{ fontSize: "20px", color: "#707070" }}>
          Recent Trades List
        </h4>
        <Search
          style={{ width: 300 }}
          placeholder="input search text"
          allowClear
          enterButton="Filter"
          size="middle"
          onChange={({ target }) => setSearchText(target.value)}
        />
      </div>
      <Table columns={columns} dataSource={__data} size="small" />
    </div>
  );
};
