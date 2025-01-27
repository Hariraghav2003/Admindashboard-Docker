import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ImCross } from "react-icons/im";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Admincreation() {
  // State Variables to store the input values
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // State Variables to handle the error's
  const [FirstnameError, setFirstnameError] = React.useState(false);
  const [LastnameError, setLastnameError] = React.useState(false);
  const [PhonenumberError, setPhonenumberError] = React.useState(false);
  const [EmailError, setEmailError] = React.useState(false);
  const [EmailErrormsg, setEmailErrormsg] = React.useState("");
  const [PhonenumberErrormessage, setPhonenumberErrormessage] =
    React.useState("");
  const [open, setOpen] = React.useState(false);
  const [PasswordError, setPassworderror] = React.useState(false);
  const [Access, setAccess] = React.useState([]);

  //To Popup the form
  const handleClickOpen = () => {
    setOpen(true);
  };

  //To close the form
  const handleClose = () => {
    setOpen(false);
    setLastname("");
    setFirstname("");
    setEmail("");
    setPhonenumber("");
    setAccess([]);
    setFirstnameError(false);
    setLastnameError(false);
    setPhonenumberError(false);
    setEmailError(false);
    setPassworderror(false);
  };

  //Function to store the input values to Admin DB
  const signupHandler = async (e) => {
    e.preventDefault();

    if (
      Firstname.trim() !== "" &&
      Lastname.trim() !== "" &&
      Email.trim() !== "" &&
      !isNaN(Phonenumber) &&
      Phonenumber !== "" &&
      Password.trim() !== "" &&
      Access !== 0
    ) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/addadmin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              Firstname,
              Lastname,
              Phonenumber,
              Email,
              Access,
              Password,
            }),
          }
        );

        if (response.ok) {
          toast.success("New Admin Added!");
          handleClose();
        } else if (response.status === 409) {
          toast.warning("User already exists");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        toast.error("Server error. Please try later.");
      }
    } else if (isNaN(Phonenumber)) {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Invalid Phonenumber");
    } else if (Firstname === "" && Lastname === "" && Phonenumber === "") {
      toast.error("Enter Appropriate values!!");
      handleClickOpen();
      setFirstnameError(true);
      setLastnameError(true);
      setPhonenumberError(true);
      setPassworderror(true);
      setEmailError(true);

      setPhonenumberErrormessage("Phonenumber is Required");
    } else if (Firstname === "") {
      setFirstnameError(true);
    } else if (Lastname === "") {
      setLastnameError(true);
    } else if (Phonenumber === "") {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
    }

    //To alert if values are empty
    else {
      toast.error("Enter Appropriate values!!");
      handleClickOpen();
    }
  };

  //Functions to validate the userInput
  const handleEmail = (e) => {
    const email = e.target.value;
    const formatteddata = email.toLowerCase();
    const properdata = formatteddata.replace(/\s+/g, "");
    if (properdata === "") {
      setEmailError(true);
      setEmailErrormsg("Email is Required");
    } else if (Email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailErrormsg("Invalid Email Id");
      setEmailError(true);
    } else {
      setEmailError(false);
      setEmail(properdata);
    }
  };

  const handlefirstname = (e) => {
    const firstname = e.target.value;
    if (firstname === "") {
      setFirstnameError(true);
    } else {
      setFirstnameError(false);
      setFirstname(firstname);
    }
  };

  const handlelastname = (e) => {
    const lastname = e.target.value;
    if (lastname === "") {
      setLastnameError(true);
    } else {
      setLastnameError(false);
      setLastname(lastname);
    }
  };

  const handlephonenumber = (e) => {
    const Phone = e.target.value;
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

  const handlepassword = (e) => {
    const pass = e.target.value;
    if (pass === "") {
      setPassworderror(true);
    } else {
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
      <ToastContainer />
      <React.Fragment>
        <Button
          onClick={handleClickOpen}
          style={{
            textTransform: "capitalize",
            fontSize: "15px",
            left: "1587px",
            position: "absolute",
            zIndex: "2",
            top: "120px",
          }}
        >
          Add Role &nbsp;
        </Button>
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
              error={PhonenumberError}
              helperText={PhonenumberError ? PhonenumberErrormessage : ""}
              onChange={handlephonenumber}
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
              error={EmailError}
              helperText={EmailError ? EmailErrormsg : ""}
              onChange={handleEmail}
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
            <Button onClick={signupHandler}>Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Admincreation;
