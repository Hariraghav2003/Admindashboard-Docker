import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Table, Space, Input, Empty } from "antd";
import { ImCross } from "react-icons/im";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Loading from "./Loading";
import "react-toastify/dist/ReactToastify.css";
function Coursedisplay() {
  //To store the search value
  const { Search } = Input;

  //state variable to filterted course detail
  const [filteredcourse, setFilteredcourse] = useState([]);

  //State variable to store the search value
  const [searchText, setSearchText] = useState("");

  //Function to store the searchValue
  const handleSearch = (value) => {
    setSearchText(value);
  };

  //state variable to display values for updating
  const [Coursename, setCoursename] = React.useState("");
  const [Courseamount, setCourseamount] = React.useState("");

  //State Variable to Handle the Popup behaviour of the form
  const [open, setOpen] = React.useState(false);

  //State Variable to Store the data fetched from getcourse API
  const [course, setCourse] = useState([]);

  //State Variables to store the Updated Amount Data
  const [Updatedamount, setUpdatedamount] = React.useState("");

  //State Variable to store the data to be updated
  const [courseToUpdate, setCourseToUpdate] = useState("");

  //State Variable to Handle Errors
  const [amountError, setAmountError] = React.useState(false);
  const [AmountErrormessage, setAmountErrormessage] = React.useState(
    "Amount Value is Required"
  );

  //Function to get the user entered value for Updating the Course data
  const getvaluetoupdate = async (id) => {
    const coursedetail = course.find((course) => course._id === id);
    setOpen(true); // Popup the form
    if (coursedetail) {
      setCoursename(coursedetail.Course);
      setCourseamount(coursedetail.Amount);
      setCourseToUpdate(coursedetail.Course);
    }
  };

  //Function to close the popup form
  const handleClose = () => {
    setOpen(false);
  };

  //Function to update the course data
  const Update = async (event) => {
    event.preventDefault();

    // To Validate Updatedamount before proceeding
    if (
      !isNaN(Updatedamount) &&
      Updatedamount &&
      Updatedamount.toString().length < 6
    ) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/updatecourse/${courseToUpdate}`,
          {
            method: "PUT", // PUT method to update the value
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Amount: Updatedamount,
            }),
          }
        );

        if (response.ok) {
          toast.success("Course Details Updated Successfully!");
          setUpdatedamount("");
          handleClose();
        } else {
          toast.error("Enter appropriate values");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      toast.error("Please enter appropriate values!!");
    }
  };

  //Function to Handle the Delete operation of Course Data
  const Delete = async (id) => {
    const coursedetail = course.find((course) => course._id === id);
    const Course = coursedetail.Course;
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/deletecourse/${Course}`,
          {
            method: "DELETE", //DELETE method to make a deletion request
          }
        );
        if (Response.ok) {
          toast.success("Course deleted successfully");
        } else {
          toast.error("Failed to delete the course");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Column Data
  const columns = [
    {
      title: "Technology",
      dataIndex: "Course",
      key: "Course",
      sorter: (a, b) =>
        a.Course.split(" ")[0].localeCompare(b.Course.split(" ")[0]),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p
            onClick={() => getvaluetoupdate(record._id)}
            style={{ cursor: "pointer" }}
          >
            <span style={{ color: "black" }}>
              <MdEdit />
            </span>
          </p>
          <p onClick={() => Delete(record._id)} style={{ cursor: "pointer" }}>
            <span style={{ color: "red" }}>
              <FaTrashCan />
            </span>
          </p>
        </Space>
      ),
    },
  ];

  //State Variable To update the status of the fetching Data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getcourse`
        );
        const users = await response.json();
        setCourse(users);
        setLoading(false);
      } catch (error) {
        toast.error("400!!");
        setLoading(false);
      }
    };
    fetchData();
  }, [course]);

  //Using useEffect Hook to fetch the Course data based on Searchtext from Mongo db through getcourse API
  useEffect(() => {
    const filteredData = course.filter((course) =>
      Object.values(course).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (filteredData.length > 0) {
      setFilteredcourse(filteredData);
    } else if (filteredData.length === 0) {
      setFilteredcourse("");
    }
  }, [course, searchText]);

  //To Display Loading skelton until the data's are fetched from getcourse API
  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  //Functions to validate the inputs
  const handlecourseamountupdation = (e) => {
    const courseAmountInput = e.target.value.trim();
    setCourseamount(courseAmountInput);
    const numericInput = courseAmountInput.replace(/\s+/g, "");
    const properData = parseInt(numericInput, 10);

    if (!numericInput) {
      setAmountErrormessage("Amount value is required");
      setAmountError(true);
    } else if (isNaN(properData)) {
      setAmountErrormessage("Amount value should be a number");
      setAmountError(true);
    } else if (numericInput.length > 6 || numericInput.length === 6) {
      setAmountErrormessage("Amount value should be less than 6 ");
      setAmountError(true);
    } else {
      setAmountError(false);
      setUpdatedamount(properData);
    }
  };

  return (
    <div>
      {/* Searchbar */}
      <Search
        placeholder="Search Technology"
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
      <br></br> <br></br> <br></br>
      {/* Table to Display the fetched Data */}
      {filteredcourse.length === 0 ? (
        <Empty description="No Data Available" />
      ) : (
        <Table
          dataSource={filteredcourse.length > 0 ? filteredcourse : course}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            defaultCurrent: 1,
          }}
          style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}
        />
      )}
      {/* Form to Updated the Data */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleClose();
            },
          }}
        >
          <DialogTitle>
            <span style={{ marginRight: "200px" }}> Course & Amount </span>
            <span
              onClick={handleClose}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                position: "relative",
                top: "-5px",
              }}
            >
              <ImCross />
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Coursename"
              name="Coursename"
              label="Technology"
              type="Coursename"
              fullWidth
              variant="standard"
              value={Coursename}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="Updatedamount"
              name="Updatedamount"
              label="Amount"
              type="Updatedamount"
              fullWidth
              variant="standard"
              error={amountError}
              helperText={amountError ? AmountErrormessage : " "}
              value={Courseamount}
              onChange={handlecourseamountupdation}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={Update}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Coursedisplay;
