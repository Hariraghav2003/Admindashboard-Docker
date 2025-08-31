import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ImCross } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Loading from "./Loading";
import "react-toastify/dist/ReactToastify.css";
import { Table, Input, Empty, Space } from "antd";
const Trainerlistdisplay = () => {
  const [Course, setCourse] = React.useState([]);
  React.useEffect(() => {
    const fetchcourseData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getcourse`
        );
        const courses = await response.json();
        setCourse(courses);
      } catch (error) {
        //console.log("Error fetching users:", error);
      }
    };
    fetchcourseData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [Firstname, setFirstname] = React.useState("");
  const [Lastname, setLastname] = React.useState("");
  const [Phonenumber, setPhonenumber] = React.useState("");
  const [Aadharnumber, setAadharnumber] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Trainingtechnology, setTrainingtechnology] = React.useState("");
  const [Trainerdetails, setTrainerdetails] = useState([]);
  const [filteredTrainerdetails, setFilteredTrainerdetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Trainingstudents, setTrainingstudents] = useState([]);
  const [Trainerdetailtoupdate, setTrainerdetailtoupdate] = useState("");
  const [Traineremail, setTraineremail] = useState();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  //State Variable to Handle Error's
  const [FirstnameError, setFirstnameError] = React.useState(false);
  const [LastnameError, setLastnameError] = React.useState(false);
  const [PhonenumberError, setPhonenumberError] = React.useState(false);
  const [AadharnumberError, setAadharnumberError] = React.useState(false);
  const [EmailError, setEmailError] = React.useState(false);
  const [AddressError, setAddressError] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Trainingtechnologyerror, setTrainingtechnologyerror] =
    React.useState("");
  const [PhonenumberErrormessage, setPhonenumberErrormessage] =
    React.useState("");
  const [AadharnumberErrormessage, setAadharnumberErrormessage] =
    React.useState();
  const [DataSource, setDatasource] = React.useState([]);

  //To Popup the form
  const handleClickOpen = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addtraineraccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        toast.error("Access Denied!!");
        setOpen(false);
      } else {
        setOpen(true);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //To close the form
  const handleClose = () => {
    setOpen(false);
    setAadharnumber("");
    setLastname("");
    setFirstname("");
    setAddress("");
    setEmail("");
    setFirstname("");
    setPhonenumber("");
    setLastname("");
    setFirstname("");
    setFirstnameError(false);
    setLastnameError(false);
    setPhonenumberError(false);
    setAadharnumberError(false);
    setEmailError(false);
    setAddressError(false);
    setTrainingtechnologyerror(false);
  };

  //Function to validate the form fields
  const handleCourseinput = (e) => {
    const courseinput = e.target.value;
    setTrainingtechnology(courseinput);
    const data =
      courseinput.charAt(0).toUpperCase() + courseinput.slice(1).toLowerCase();
    const properdata = data.replace(/\s+/g, "");
    let formatteddata = properdata.replace(/\//g, "");
    let formatdata = formatteddata.replace(/\\/g, "");
    if (formatdata === "") {
      setTrainingtechnologyerror(true);
    } else {
      setTrainingtechnologyerror(false);
      setTrainingtechnology(formatdata);
    }
  };
  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    const properdata = email.replace(/\s+/g, "");
    if (properdata === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
      setEmail(properdata);
    }
  };
  const handlefirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
    if (firstname === "") {
      setFirstnameError(true);
    } else {
      setFirstnameError(false);
      setFirstname(firstname);
    }
  };
  const handlelastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
    if (lastname === "") {
      setLastnameError(true);
    } else {
      setLastnameError(false);
      setLastname(lastname);
    }
  };
  const handleAddress = (e) => {
    const Address = e.target.value;
    setAddress(Address);
    if (Address === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
      setAddress(Address);
    }
  };
  const handlephonenumber = (e) => {
    const Phone = e.target.value;
    setPhonenumber(Phone);
    const Phonenumber = parseInt(Phone, 10);
    if (Phonenumber === "") {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
    } else if (isNaN(Phonenumber)) {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Invalid Phonenumber");
    } else {
      setPhonenumberError(false);
      setPhonenumber(Phonenumber);
    }
  };
  const handleAadharnumber = (e) => {
    const proper = e.target.value;
    setAadharnumber(proper);
    const Aadharnumber = parseInt(proper, 10);
    if (Aadharnumber === "") {
      setAadharnumberError(true);
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (isNaN(Aadharnumber)) {
      setAadharnumberErrormessage("Invalid Aadharnumber");
    } else {
      setAadharnumberError(false);
      setAadharnumber(Aadharnumber);
    }
  };

  //Function to get the value to update
  const getvaluetoupdate = async (id) => {
    try {
      setOpen(true); // Popup the form

      const user = Trainerdetails.find((user) => user._id === id);
      if (user) {
        // Setting form field values based on the selected user's data
        setFirstname(user.Firstname);
        setLastname(user.Lastname);
        setPhonenumber(user.Phonenumber);
        setAadharnumber(user.Aadharnumber);
        setEmail(user.Email);
        setAddress(user.Address);
        setTrainingtechnology(user.Trainingtechnology);
        setTrainerdetailtoupdate(user.Email);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const Trainingtechnologyaccess = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/updatetraineraccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setIsAuthorized(true);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    Trainingtechnologyaccess();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/gettrainerdetail`
        );
        const users = await response.json();
        setTrainerdetails(users);

        const modifiedData = users.map((users) => ({
          ...users,

          Phonenumber: users.Phonenumber.toString().replace(
            /(.).+(.)/,
            (match, firstChar, lastChar) => `${firstChar}********${lastChar}`
          ),
        }));
        setDatasource(modifiedData);
        setLoading(false);
      } catch (error) {
        //console.log("Error fetching users:", error);
        setError("Error fetching data, please try again later.");
        setLoading(true);
      }
    };
    fetchData();
  }, [Trainerdetails]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    const filteredData = DataSource.filter((user) =>
      Object.values(user).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredTrainerdetails(filteredData);
  }, [DataSource, searchText]);

  const onExpand = (expanded, record) => {
    const id = record._id;
    const userdetail = Trainerdetails.find((Admin) => Admin._id === id);

    const trainerEmail = userdetail.Email;

    if (expanded) {
      setTraineremail(trainerEmail);
    } else {
      setTraineremail(null);
    }
    const newExpandedRowKeys = expanded
      ? [...expandedRowKeys, record._id]
      : expandedRowKeys.filter((key) => key !== record._id);
    setExpandedRowKeys(newExpandedRowKeys);
    if (expanded) {
      setTraineremail(trainerEmail);
      // Only keep the current expanded row key
      setExpandedRowKeys([id]);
    } else {
      setTraineremail(null);
      setExpandedRowKeys([]);
    }
  };

  useEffect(() => {
    const fetchtraningstudentsData = async (Traineremail) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/trainingstudents/${Traineremail}`
        );
        const students = await response.json();
        const trainingstudents = students[0].Trainingstudents;
        const modifiedData = trainingstudents.map((users) => ({
          ...users,

          Phonenumber: users.Phonenumber.toString().replace(
            /(.).+(.)/,
            (match, firstChar, lastChar) => `${firstChar}********${lastChar}`
          ),
        }));

        setTrainingstudents(modifiedData);
      } catch (error) {
        //console.log("Error fetching users:", error);
        setError("Error fetching data, please try again later.");
      }
    };
    if (Traineremail) {
      fetchtraningstudentsData(Traineremail);
    }
  }, [Traineremail]);

  // To Display Loading text until the data is fetched from the API
  if (loading) {
    return <Loading></Loading>;
  }

  //Function to Handle the User Updation
  const Update = async (event) => {
    event.preventDefault();
    event.preventDefault();
    //To check for empty values before feeding the User data
    if (
      Firstname.trim() !== "" &&
      Lastname.trim() !== "" &&
      Email.trim() !== "" &&
      Address.trim() !== "" &&
      !isNaN(Phonenumber) &&
      !isNaN(Aadharnumber) &&
      Phonenumber !== "" &&
      Aadharnumber !== "" &&
      Trainingtechnology !== ""
    ) {
      try {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/updatetrainer/${Trainerdetailtoupdate}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Firstname: Firstname,
              Lastname: Lastname,
              Phonenumber: Phonenumber,
              Aadharnumber: Aadharnumber,
              Email: Email,
              Address: Address,
              Trainingtechnology: Trainingtechnology,
            }),
          }
        );
        if (Response.ok) {
          toast.success("Trainer Details Updated Successfully");
          setAadharnumber("");
          setAddress("");
          setTrainingtechnology("");

          setEmail("");
          setFirstname("");

          setPhonenumber("");

          setLastname("");
          setFirstname("");

          handleClose();
        } else if (Response.status === 409) {
          toast.warning("User Already Exist!!");
          setAadharnumber("");
          setAddress("");
          setTrainingtechnology("");

          setEmail("");
          setFirstname("");

          setPhonenumber("");
          setLastname("");
          setFirstname("");
        }
      } catch (error) {
        toast.error("400!!");
      }
    } else if (isNaN(Aadharnumber)) {
      setAadharnumberErrormessage("Invalid Aadharnumber");
    } else if (isNaN(Phonenumber)) {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Invalid Phonenumber");
    } else if (
      Firstname === "" &&
      Lastname === "" &&
      Phonenumber === "" &&
      Aadharnumber === "" &&
      Address === ""
    ) {
      toast.error("Enter Appropriate values!!");
      handleClickOpen();
      setFirstnameError(true);
      setLastnameError(true);
      setPhonenumberError(true);
      setAadharnumberError(true);
      setEmailError(true);
      setAddressError(true);
      setTrainingtechnologyerror(true);
      setPhonenumberErrormessage("Phonenumber is Required");
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (Firstname === "") {
      setFirstnameError(true);
    } else if (Lastname === "") {
      setLastnameError(true);
    } else if (Phonenumber === "") {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
    } else if (Aadharnumber === "") {
      setAadharnumberError(true);
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (Address === "") {
      setAddressError(true);
    } else if (Trainingtechnology === "") {
      setTrainingtechnologyerror(true);
    }
    //To alert if values are empty
    else {
      toast.warning("Fill appropriate Values!!");
      handleClickOpen();
    }
  };

  //Function to Handle the Delete operation of User Data
  const Delete = async (id) => {
    const userdetail = Trainerdetails.find((Admin) => Admin._id === id);
    const Email = userdetail.Email;
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/deletetraineraccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        toast.error("Access Denied!!");
      } else {
        try {
          if (window.confirm("Are you sure you want to delete?")) {
            const Response = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/deletetrainer/${Email}`,
              {
                method: "DELETE", //DELETE method to make a deletion request
              }
            );
            if (Response.ok) {
              toast.success("Trainer deleted!!");
            } else {
              toast.error("Failed to delete the user");
            }
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const { Search } = Input;

  // Columns for the main table
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
    { title: "Phonenumber", dataIndex: "Phonenumber", key: "Phonenumber" },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) =>
        a.Email.split(" ")[0].localeCompare(b.Email.split(" ")[0]),
    },
    {
      title: "Training Technology",
      dataIndex: "Trainingtechnology",
      key: "Trainingtechnology",
      sorter: (a, b) =>
        a.Trainingtechnology.split(" ")[0].localeCompare(
          b.Trainingtechnology.split(" ")[0]
        ),
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
            <span style={{ color: "black" }} onClick={handleClickOpen}>
              <MdEdit />
            </span>
          </p>
          <p>
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => Delete(record._id)}
            >
              <FaTrashCan />
            </span>
          </p>
        </Space>
      ),
    },
  ];

  const nestedColumns = [
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
      title: "Collegename",
      dataIndex: "Collegename",
      key: "Collegename",
      sorter: (a, b) =>
        a.Collegename.split(" ")[0].localeCompare(b.Collegename.split(" ")[0]),
    },
    { title: "Phonenumber", dataIndex: "Phonenumber", key: "Phonenumber" },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) =>
        a.Email.split(" ")[0].localeCompare(b.Email.split(" ")[0]),
    },
  ];

  return (
    <div>
      <ToastContainer />
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
            <span style={{ marginRight: "370px" }}>Basic Information</span>
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
            <TextField
              autoFocus
              required
              margin="dense"
              id="Firstname"
              name="Firstname"
              label="Firstname"
              type="String"
              value={Firstname}
              fullWidth
              variant="standard"
              error={FirstnameError}
              helperText={FirstnameError ? "Firstname  is required" : ""}
              onChange={handlefirstname}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Lastname"
              name="Lastname"
              label="Lastname"
              type="String"
              fullWidth
              variant="standard"
              value={Lastname}
              error={LastnameError}
              helperText={LastnameError ? "Lastname is required" : ""}
              onChange={handlelastname}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Phonenumber"
              name="Phonenumber"
              label="Phonenumber"
              type="String"
              fullWidth
              variant="standard"
              value={Phonenumber}
              error={PhonenumberError}
              helperText={PhonenumberError ? PhonenumberErrormessage : ""}
              onChange={handlephonenumber}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Aadharnumber"
              name="Aadharnumber"
              label="Aadharnumber"
              type="String"
              fullWidth
              variant="standard"
              value={Aadharnumber}
              error={AadharnumberError}
              helperText={AadharnumberError ? AadharnumberErrormessage : ""}
              onChange={handleAadharnumber}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Email"
              name="Email"
              label="Email Address"
              type="String"
              fullWidth
              variant="standard"
              value={Email}
              error={EmailError}
              helperText={EmailError ? "Email is required" : ""}
              onChange={handleEmail}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Address"
              name="Address"
              label="Address"
              type="String"
              fullWidth
              variant="standard"
              value={Address}
              error={AddressError}
              helperText={AddressError ? "Address is required" : ""}
              onChange={handleAddress}
            />
            <br></br> <br></br>
            <FormControl sx={{ m: 0, minWidth: 250, position: "relative" }}>
              <InputLabel
                id="course-select-label"
                sx={{
                  width: "auto",
                }}
              >
                Training Technology
              </InputLabel>
              <Select
                disabled={isAuthorized}
                label="Training Technology"
                value={Trainingtechnology}
                onChange={handleCourseinput}
                // style={{width:"520px"}}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: "auto",
                    },
                  },
                }}
              >
                <MenuItem value=""></MenuItem>
                {Course.map((courses) => (
                  <MenuItem key={courses.Course} value={courses.Course}>
                    {courses.Course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={Update}>Update</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Search
        placeholder="Search Trainers"
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
          top: "165px",
        }}
      />
      <br></br> <br></br> <br></br>
      {error && (
        <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
      )}
      {filteredTrainerdetails.length === 0 ? (
        <Empty description="No data available" />
      ) : (
        <Table
          style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}
          columns={columns}
          dataSource={
            filteredTrainerdetails.length > 0
              ? filteredTrainerdetails
              : DataSource
          }
          pagination={{
            pageSize: 10,
            defaultCurrent: 1,
          }}
          expandedRowRender={(record) =>
            Trainingstudents.length === 0 ? (
              <Empty description="No Trainees Available" />
            ) : (
              <Table
                columns={nestedColumns}
                dataSource={Trainingstudents}
                pagination={false}
                rowKey="_id"
                scroll={{ y: 150 }} // Adds scroll to the nested table
              />
            )
          }
          expandedRowKeys={expandedRowKeys}
          onExpand={onExpand}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default Trainerlistdisplay;
