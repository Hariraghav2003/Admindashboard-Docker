import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Input, Empty } from "antd";
import Loading from "./Loading";
import "react-toastify/dist/ReactToastify.css";
function Accessdisplay() {
  //To get the search value
  const { Search } = Input;

  //state variable to filterted admin detail
  const [filteredadmin, setfilteredadmin] = useState([]);

  //State variable to store the search value
  const [searchText, setSearchText] = useState("");

  //Function to store the searchValue
  const handleSearch = (value) => {
    setSearchText(value);
  };

  //State Variable to Store the data fetched from getAdmin API
  const [admin, setAdmins] = useState([]);

  // Column Data
  const columns = [
    {
      title: "Firstname",
      dataIndex: "Firstname",
      key: "Firstname",
      sorter: (a, b) =>
        a.Firstname.split(" ")[0].localeCompare(b.Firstname.split(" ")[0]),
    },
    {
      title: "Lastname",
      dataIndex: "Lastname",
      key: "Lastname",
      sorter: (a, b) =>
        a.Lastname.split(" ")[0].localeCompare(b.Lastname.split(" ")[0]),
    },
    {
      title: "Phonenumber",
      dataIndex: "Phonenumber",
      key: "Phonenumber",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) =>
        a.Email.split(" ")[0].localeCompare(b.Email.split(" ")[0]),
    },
    {
      title: "Access to",
      dataIndex: "Access",
      key: "Access",
    },
  ];

  //State Variable To update the status of the fetching Data
  const [loading, setLoading] = useState(true);

  //useEffect hook to fetch the admin data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getadmins`
        );
        const users = await response.json();
        const modifiedAdmins = users.map((admin) => ({
          ...admin,
          Phonenumber: admin.Phonenumber.replace(
            /(.).+(.)/,
            (match, firstChar, lastChar) => `${firstChar}********${lastChar}`
          ),


          Access: admin.Access.join(","),
        }));
        setAdmins(modifiedAdmins);
        setLoading(false);
      } catch (error) {
        toast.error("400!!");
        setLoading(true);
      }
    };
    fetchData();
  }, [admin]);

  //useEffect Hook to fetch the Admin data based on Searchtext from Mongo db through getAdmin API
  useEffect(() => {
    const filteredData = admin.filter((admin) =>
      Object.values(admin).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (filteredData.length > 0) {
      setfilteredadmin(filteredData);
    } else if (filteredData.length === 0) {
      setfilteredadmin("");
    }
  }, [admin, searchText]);

  //To Display Loading skelton until the data's are fetched from getAdmin API
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {/* Search bar to Search over the Admin data */}
      <Search
        placeholder="Search Role"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchText}
        enterButton
        style={{
          marginBottom: "16px",
          width: "300px",
          left: "1365px",
          position: "absolute",
          zIndex: "2",
          top:"165px",
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      {/* Table to Display the fetched Data */}
      {filteredadmin.length === 0 ? (
        <Empty description="No Data Available" />
      ) : (
        <Table
          dataSource={filteredadmin.length > 0 ? filteredadmin : admin}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            defaultCurrent: 1,
          }}
          style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}
        />
      )}
    </div>
  );
}

export default Accessdisplay;
