import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ImCross } from "react-icons/im";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Trainercreation() {
  const [open, setOpen] = React.useState(false);

  //state variable to store the input field
  const [Firstname, setFirstname] = React.useState("");
  const [Lastname, setLastname] = React.useState("");
  const [Phonenumber, setPhonenumber] = React.useState("");
  const [Aadharnumber, setAadharnumber] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Trainingtechnology, setTrainingtechnology] = React.useState("");

  //State Variable to Handle Error's
  const [FirstnameError, setFirstnameError] = React.useState(false);
  const [LastnameError, setLastnameError] = React.useState(false);
  const [PhonenumberError, setPhonenumberError] = React.useState(false);
  const [AadharnumberError, setAadharnumberError] = React.useState(false);
  const [EmailError, setEmailError] = React.useState(false);
  const [AddressError, setAddressError] = React.useState(false);
  const [PhonenumberErrormessage, setPhonenumberErrormessage] =
    React.useState("");
  const [AadharnumberErrormessage, setAadharnumberErrormessage] =
    React.useState();
  const [Course, setCourse] = React.useState([]);

  //Fetching course data
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
  };

  //Function to handle the Userdata
  const handleSubmit = async (event) => {
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
          `${process.env.REACT_APP_BACKEND_URL}/trainerdetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Firstname,
              Lastname,
              Phonenumber,
              Aadharnumber,
              Email,
              Address,
              Trainingtechnology,
            }),
          }
        );
        if (Response.ok) {
          toast.success("New Trainer Added");
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
          toast.warning("User Already Exisit!!");
        }
      } catch (error) {}
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
      handleClickOpen();
      setFirstnameError(true);
      setLastnameError(true);
      setPhonenumberError(true);
      setAadharnumberError(true);
      setEmailError(true);
      setAddressError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
      setAadharnumberErrormessage("Aadharnumber is Required");
      toast.warning("Enter Appropriate Values!!");
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
      toast.error("Training Technology is Required");
    }
    //To alert if values are empty
    else {
      toast.warning("Enter Appropriate Values!!");
      handleClickOpen();
    }
  };

  //Function to validate the form fields
  const handleCourseinput = (e) => {
    const courseinput = e.target.value;
    const data =
      courseinput.charAt(0).toUpperCase() + courseinput.slice(1).toLowerCase();
    const properdata = data.replace(/\s+/g, "");
    let formatteddata = properdata.replace(/\//g, "");
    let formatdata = formatteddata.replace(/\\/g, "");
    if (formatdata === "") {
      toast.error("Training Technology is Required");
    } else {
      setTrainingtechnology(formatdata);
    }
  };
  const handleEmail = (e) => {
    const email = e.target.value;
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
  const handleAddress = (e) => {
    const Address = e.target.value;
    if (Address === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
      setAddress(Address);
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
  const handleAadharnumber = (e) => {
    const proper = e.target.value;
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

  return (
    <div>
      <React.Fragment>
        <Button
          onClick={handleClickOpen}
          style={{
            textTransform: "capitalize",
            fontSize: "15px",
            top: "120px",
            left: "1570px",
            position: "absolute",
            zIndex: "2",
          }}
        >
          Add Trainer &nbsp;
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
              id="Aadharnumber"
              name="Aadharnumber"
              label="Aadharnumber"
              type="String"
              fullWidth
              variant="standard"
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
                label="Training Technology"
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
            <br></br>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Trainercreation;
