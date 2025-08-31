import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Table, Space, Input, Empty } from "antd";
import { ImCross } from "react-icons/im";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
function Adminlistdisplay() {
  //To get the search value
  const { Search } = Input;

  //state variable to filter Admin detail
  const [filteredadmin, setfilteredadmin] = useState([]);

  //State variable to store the search value
  const [searchText, setSearchText] = useState("");

  //Function to store the searchValue
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // State Variables to store the input values
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Access, setAccess] = React.useState([]);
  const [PasswordError, setPassworderror] = React.useState(false);
  const [DataSource, setDatasource] = React.useState([]);

  //State Variable to Handle the Popup behaviour of the form
  const [open, setOpen] = React.useState(false);

  //State Variable to Store the data fetched from getAdmin API
  const [admin, setAdmins] = useState([]);

  //State Variable to store the data to be updated
  const [AdminToUpdate, setAdminToUpdate] = useState("");

  //Function to get the user entered value for Updating the Admin data
  const getvaluetoupdate = (id) => {
    setOpen(true); //Popup's the form

    const Admindetail = admin.find((Admin) => Admin._id === id);

    if (Admindetail) {
      setFirstname(Admindetail.Firstname);
      setLastname(Admindetail.Lastname);
      setEmail(Admindetail.Email);
      setPhonenumber(Admindetail.Phonenumber);
      setAccess(Admindetail.Access);
      setAdminToUpdate(Admindetail.Email);
    }
  };

  //Function to close the popup form
  const handleClose = () => {
    setOpen(false);
    setPassworderror(false);
  };

  //Function to Update the Access and Password of the Admin
  const Update = async (event) => {
    event.preventDefault();
    if (Password.trim() !== "") {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/updateAdmin/${AdminToUpdate}`,
          {
            method: "PUT", // PUT method to update the value
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Access,
              Password,
            }),
          }
        );

        if (response.ok) {
          toast.success("Access Updated Successfully!");
          setAccess([]);
          setPassword("");
          handleClose();
        } else {
          toast.error("Enter appropriate values");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      setPassworderror(true);
      toast.error("Please enter appropriate values!!");
    }
  };

  //Function to Handle the Delete operation of Admin Data
  const Delete = async (id) => {
    const Admindetail = admin.find((Admin) => Admin._id === id);
    const Email = Admindetail.Email;
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/deleteadmin/${Email}`,
          {
            method: "DELETE", //DELETE method to make a deletion request
          }
        );
        if (Response.ok) {
          toast.success("Admin deleted successfully");
        } else {
          toast.error("Failed to delete the Admin");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

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

  //useEffect hook to fetch the admin data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getadmins`
        );
        const users = await response.json();
        setAdmins(users);

        const modifiedData = users.map((admin) => ({
          ...admin,
          Phonenumber: admin.Phonenumber.replace(
            /(.).+(.)/,
            (match, firstChar, lastChar) => `${firstChar}********${lastChar}`
          ),

        }));
        setDatasource(modifiedData);

        setLoading(false);
      } catch (error) {
        toast.error("400!!");
        setLoading(true);
      }
    };
    fetchData();
  }, [admin]);

  //Using useeffect Hook to fetch the Admin data based on Searchtext from Mongo db through getAdmin API
  useEffect(() => {
    const filteredData = DataSource.filter((admin) =>
      Object.values(admin).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (filteredData.length > 0) {
      setfilteredadmin(filteredData);
    } else if (filteredData.length === 0) {
      setfilteredadmin("");
    }
  }, [DataSource, searchText]);

  //To Display Loading text until the data's are fetched from getAdmin API
  if (loading) {
    return <Loading></Loading>;
  }

  //Functions to validate the userInput
  const handlepassword = (e) => {
    const pass = e.target.value;

    if (pass === "") {
      setPassworderror(true);
    } else {
      setPassworderror(false);
      setPassword(pass);
    }
  };
  const options = [
    "User",
    "Report",
    "Invoice",
    "Technology",
    "Trainer",
  ];

  const handleChange = (event) => {
    const value = event.target.name;
    setAccess(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
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
      <br></br> <br></br> <br></br>
      {/* Table to Display the fetched Data */}
      {filteredadmin.length === 0 ? (
        <Empty description="No Data Available" />
      ) : (
        <Table
          dataSource={filteredadmin.length > 0 ? filteredadmin : DataSource}
          style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            defaultCurrent: 1,
          }}
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
              fullWidth
              variant="standard"
              value={Firstname}
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
            />
            <br></br>

            <br></br>

            <FormLabel id="demo-row-radio-buttons-group-label">
              Access
            </FormLabel>

            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      name={option}
                      checked={Access.includes(option)}
                      onChange={handleChange}
                      color="success"
                      value={Access}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
            <br></br>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Password"
              name="Password"
              label="Password"
              type="Password"
              fullWidth
              variant="standard"
              error={PasswordError}
              helperText={PasswordError ? "Password is required" : ""}
              onChange={handlepassword}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={Update}>Update</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Adminlistdisplay;
