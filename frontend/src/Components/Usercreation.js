/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from "react-toastify";
import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ImCross } from "react-icons/im";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormControl";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { Stepper, Step, StepLabel } from "@mui/material";
function Usercreation() {
  const [open, setOpen] = React.useState(false);
  const [Firstname, setFirstname] = React.useState("");
  const [Lastname, setLastname] = React.useState("");
  const [Phonenumber, setPhonenumber] = React.useState("");
  const [Aadharnumber, setAadharnumber] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Courseamount, setCourseamount] = React.useState("");
  const [Paymentstatus, setPaymentstatus] = React.useState("");
  const [Role, setRole] = React.useState("");
  const [Duration, setDuration] = React.useState("");
  const [Userchoosencourse, setUserchoosencourse] = React.useState("");
  const [Dateofjoining, setDateofjoining] = React.useState(null);
  const [Course, setCourse] = React.useState([]);
  const [Userstatus, setUserstatus] = React.useState("Active");
  const [Firstinstallment, setFirstinstallment] = React.useState("0");
  const [Secondinstallment, setSecondinstallment] = React.useState("0");
  const [Thirdinstallment, setThirdinstallment] = React.useState("0");
  const [Remainingamount, setRemainingamount] = React.useState("0");
  const [Trainers, setTrainers] = React.useState([]);
  const [Trainerid, setTrainerid] = React.useState("");
  const [Collegename, setCollegename] = React.useState("");
  //State Variables to Handle Error
  const [FirstnameError, setFirstnameError] = React.useState(false);
  const [LastnameError, setLastnameError] = React.useState(false);
  const [PhonenumberError, setPhonenumberError] = React.useState(false);
  const [AadharnumberError, setAadharnumberError] = React.useState(false);
  const [EmailError, setEmailError] = React.useState(false);
  const [AddressError, setAddressError] = React.useState(false);
  const [CollegenameError, setCollegenameError] = React.useState(false);
  const [PhonenumberErrormessage, setPhonenumberErrormessage] =
    React.useState("");
  const [AadharnumberErrormessage, setAadharnumberErrormessage] =
    React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, Seterror] = React.useState(false);
  const [durationError, SetDurationerror] = React.useState(false);
  const [courseerror, setCourseerror] = React.useState(false);
  const [Dateofjoiningerror, setDateofjoiningerror] = React.useState(false);
  const [Trainererror, setTrainererror] = React.useState(false);
  const [selecteddatevalue, setSelecteddate] = React.useState(null);
  const steps = ["Basic Information", "Candidate Form", "Payment Details"];

  //Using useeffect Hook to fetch the Course data from Mongo db through getcourse API
  useEffect(() => {
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
        `${process.env.REACT_APP_BACKEND_URL}/adduseraccess`,
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
    setCourseamount("");
    setDuration("");
    setEmail("");
    setPaymentstatus("");
    setPhonenumber("");
    setRole("");
    setUserchoosencourse("");
    setFirstinstallment("");
    setDateofjoining("");
    setCollegename("");
    setFirstnameError(false);
    setLastnameError(false);
    setPhonenumberError(false);
    setAadharnumberError(false);
    setEmailError(false);
    setAddressError(false);
    setCollegenameError(false);
    setActiveStep(0);
  };
  const timestampgenerator = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };

  //To store the Userdata
  const handleSubmit = async (event) => {
    const Createdat = timestampgenerator();
    event.preventDefault();
    //To check for empty values before feeding the User data
    if (
      Firstname.trim() !== "" &&
      Lastname.trim() !== "" &&
      Email.trim() !== "" &&
      Address.trim() !== "" &&
      !isNaN(Phonenumber) &&
      !isNaN(Aadharnumber) &&
      !isNaN(Courseamount) &&
      Phonenumber !== "" &&
      Aadharnumber !== "" &&
      Courseamount !== "" &&
      Paymentstatus.trim() !== "" &&
      Role.trim() !== "" &&
      Duration.trim() !== "" &&
      Userchoosencourse.trim() !== "" &&
      Firstinstallment !== "" &&
      Secondinstallment !== "" &&
      Thirdinstallment !== "" &&
      Userstatus !== "" &&
      Dateofjoining !== "" &&
      Remainingamount !== "" &&
      !isNaN(Firstinstallment) &&
      !isNaN(Secondinstallment) &&
      !isNaN(Thirdinstallment) &&
      !isNaN(Remainingamount) &&
      Collegename !== "" &&
      Trainerid !== ""
    ) {
      try {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/userdetail`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Firstname,
              Lastname,
              Collegename,
              Phonenumber,
              Aadharnumber,
              Email,
              Address,
              Role,
              Userchoosencourse,
              Firstinstallment,
              Remainingamount,
              Secondinstallment,
              Thirdinstallment,
              Courseamount,
              Paymentstatus,
              Duration,
              Userstatus,
              Dateofjoining,
              Trainerid,
              Createdat,
            }),
          }
        );
        if (Response.ok) {
          toast.success("New User Added");
          setAadharnumber("");
          setAddress("");
          setCourseamount("");
          setDuration("");
          setEmail("");
          setFirstname("");
          setPaymentstatus("");
          setPhonenumber("");
          setRole("");
          setUserchoosencourse("");
          setFirstinstallment("");
          setLastname("");
          setFirstname("");
          setDateofjoining("");
          setCollegename("");
          handleClose();
        } else if (Response.status === 409) {
          toast.warning("User Already Exist");
        }
      } catch (error) {
        toast.error("500!!");
      }
    } else if (isNaN(Aadharnumber)) {
      setAadharnumberErrormessage("Invalid Aadharnumber");
    } else if (isNaN(Phonenumber)) {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Invalid Phonenumber");
    } else if (
      Firstname === "" &&
      Lastname === "" &&
      Collegename === "" &&
      Phonenumber === "" &&
      Aadharnumber === "" &&
      Address === ""
    ) {
      toast.error("First Installment is required !!");
      handleClickOpen();
      setFirstnameError(true);
      setLastnameError(true);
      setPhonenumberError(true);
      setAadharnumberError(true);
      setEmailError(true);
      setAddressError(true);
      setCollegenameError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (Firstname === "") {
      setFirstnameError(true);
    } else if (Lastname === "") {
      setLastnameError(true);
    } else if (Collegename === "") {
      setCollegenameError(true);
    } else if (Phonenumber === "") {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
    } else if (Aadharnumber === "") {
      setAadharnumberError(true);
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (Address === "") {
      setAddressError(true);
    } else if (Dateofjoining === "") {
      toast.warning("Date of Joining is Required !!!");
    }

    //To alert if values are empty
    else {
      toast.error("First Installment is required");
      handleClickOpen();
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    if (selectedCourse === "") {
      setCourseerror(true);
    } else {
      // Find the selected course's amount
      const courseDetails = Course.find(
        (course) => course.Course === selectedCourse
      );
      setUserchoosencourse(selectedCourse);
      setCourseamount(courseDetails ? courseDetails.Amount : "");
      setCourseerror(false);
    }
  };

  useEffect(() => {
    const fetchtrainerData = async (Userchoosencourse) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/gettrainerdetail/${Userchoosencourse}`
        );
        const trainer = await response.json();
        setTrainers(trainer);
      } catch (error) {
        //console.log("Error fetching Trainers:", error);
      }
    };
    fetchtrainerData(Userchoosencourse);
  }, [Userchoosencourse]);

  const Paymentstatusfunction = (e) => {
    const firstInstallment = parseFloat(e.target.value) || 0;
    const courseAmount = parseFloat(Courseamount);
    let amountToBePaidOnSecondInstallment = 0;
    if (firstInstallment <= 0) {
      toast.error("Invalid Amount Value");
    } else {
      if (firstInstallment < courseAmount) {
        setPaymentstatus("Partially Paid");

        amountToBePaidOnSecondInstallment = courseAmount - firstInstallment;
      } else if (firstInstallment === courseAmount) {
        setPaymentstatus("Paid");
      } else {
        toast.error("Invalid Amount Value");
      }
    }

    setFirstinstallment(firstInstallment);
    setRemainingamount(amountToBePaidOnSecondInstallment);
  };

  const handleDateChange = (newDate) => {
    if (!newDate) {
      setDateofjoiningerror(true);
      return;
    } // Handle null or invalid date
    else {
      setSelecteddate(newDate);
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      setDateofjoining(formattedDate);
      setDateofjoiningerror(false);
    }
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    const formatteddata = email.toLowerCase();
    const properdata = formatteddata.replace(/\s+/g, "");
    if (properdata === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
      setEmail(properdata);
    }
  };

  const handlefirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname)
    if (firstname === "") {
      setFirstnameError(true);
    } else {
      setFirstnameError(false);
      setFirstname(firstname);
    }
  };

  const handlelastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname)
    if (lastname === "") {
      setLastnameError(true);
    } else {
      setLastnameError(false);
      setLastname(lastname);
    }
  };
  const handlecollegename = (e) => {
    const Collegename = e.target.value;
    if (Collegename === "") {
      setCollegenameError(true);
    } else {
      setCollegenameError(false);
      setCollegename(Collegename);
    }
  };

  const handlephonenumber = (e) => {
    const Phone = e.target.value;
    setPhonenumber(Phone)
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
    setAadharnumber(proper)
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

  const handleAddress = (e) => {
    const Address = e.target.value;
    setAddress(Address)
    if (Address === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
      setAddress(Address);
    }
  };

  const handletrainer = (e) => {
    const selectedTrainerId = e.target.value;
    if (selectedTrainerId === "") {
      setTrainererror(true);
    } else {
      const selectedTrainer = Trainers.find(
        (trainer) => trainer._id === selectedTrainerId
      );
      if (selectedTrainer) {
        setTrainerid(selectedTrainer._id);
      }
      setTrainererror(false);
    }
  };

  const basiccheck = () => {
    if (
      Firstname.trim() !== "" &&
      Lastname.trim() !== "" &&
      Email.trim() !== "" &&
      Address.trim() !== "" &&
      !isNaN(Phonenumber) &&
      !isNaN(Aadharnumber) &&
      Phonenumber !== "" &&
      Aadharnumber !== "" &&
      Collegename !== ""
    ) {
      setActiveStep(1);
    } else if (isNaN(Aadharnumber)) {
      setAadharnumberErrormessage("Invalid Aadharnumber");
    } else if (isNaN(Phonenumber)) {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Invalid Phonenumber");
    } else if (Firstname === "") {
      setFirstnameError(true);
    } else if (Lastname === "") {
      setLastnameError(true);
    } else if (Collegename === "") {
      setCollegenameError(true);
    } else if (Phonenumber === "") {
      setPhonenumberError(true);
      setPhonenumberErrormessage("Phonenumber is Required");
    } else if (Aadharnumber === "") {
      setAadharnumberError(true);
      setAadharnumberErrormessage("Aadharnumber is Required");
    } else if (Email === "") {
      setEmailError(true);
    } else if (Address === "") {
      setAddressError(true);
    }
  };

  const candidatecheck = () => {
    if (
      Role.trim() !== "" &&
      Duration.trim() !== "" &&
      Userchoosencourse.trim() !== "" &&
      Trainerid.trim() !== ""
    ) {
      setActiveStep(2);
    } else if (Dateofjoining === null) {
      setDateofjoiningerror(true);
    } else if (Duration.trim() === "") {
      SetDurationerror(true);
    } else if (Role === "") {
      Seterror(true);
    } else if (Userchoosencourse === "") {
      setCourseerror(true);
    } else if (Trainerid.trim() === "") {
      setTrainererror(true);
    } else {
      setDateofjoiningerror(false);
      SetDurationerror(false);
      Seterror(false);
      setCourseerror(false);
      setTrainererror(false);
    }
  };

  const handlerole = (e) => {
    if (e.target.value === "") {
      Seterror(true);
    } else {
      setRole(e.target.value);
      Seterror(false);
    }
  };

  const handleDuration = (e) => {
    if (e.target.value === "") {
      SetDurationerror(true);
    } else {
      setDuration(e.target.value);
      SetDurationerror(false);
    }
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
            left: "1585px",
            position: "absolute",
            zIndex: "2",
            top: "120px",
          }}
        >
          Add User &nbsp;
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
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            style={{ marginTop: "16px" }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
            <span
              style={{
                marginRight: "30px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              <ImCross />
            </span>
          </Stepper>

          {activeStep === 0 && (
            <div>
              <DialogTitle style={{ marginBottom: "-20px" }}>
                <span style={{ marginRight: "360px" }}>Basic Information</span>
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
                  id="Collegename"
                  name="Collegename"
                  label="College Name"
                  type="String"
                  fullWidth
                  variant="standard"
                  value={Collegename}
                  error={CollegenameError}
                  helperText={CollegenameError ? "Collegename is required" : ""}
                  onChange={handlecollegename}
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
                <br />
                <Button
                  variant="contained"
                  endIcon={<MdArrowForwardIos />}
                  onClick={basiccheck}
                  style={{ marginLeft: "452px", marginTop: "12px" }}
                >
                  Next
                </Button>
              </DialogContent>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <DialogTitle>
                <span style={{ marginRight: "300px" }}>Candidate Form</span>
              </DialogTitle>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    style={{ width: "350px" }}
                    label="Date of Joining"
                    value={selecteddatevalue} // Bind the value to the state
                    onChange={handleDateChange} // Update the state when the value changes
                  />
                </LocalizationProvider>
                <br></br>
                {Dateofjoiningerror && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select Date of joining
                  </FormHelperText>
                )}
                <br></br>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Duration
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleDuration}
                  value={Duration}
                >
                  <FormControlLabel
                    value="3 Months"
                    control={<Radio />}
                    label="3 Months"
                  />
                  <FormControlLabel
                    value="4 Months"
                    control={<Radio />}
                    label="4 Months"
                  />
                  <FormControlLabel
                    value="6 Months"
                    control={<Radio />}
                    label="6 Months"
                  />
                </RadioGroup>
                {durationError && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select a duration
                  </FormHelperText>
                )}
                <br></br>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Role
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handlerole}
                  value={Role}
                >
                  <FormControlLabel
                    value="Trainee"
                    control={<Radio />}
                    label="Trainee"
                  />
                  <FormControlLabel
                    value="Intern"
                    control={<Radio />}
                    label="Intern"
                  />
                </RadioGroup>
                {error && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select Role
                  </FormHelperText>
                )}
                <br></br>
                <FormControl sx={{ m: 0, minWidth: 250, position: "relative" }}>
                  <InputLabel
                    id="course-select-label"
                    sx={{
                      width: "auto",
                    }}
                  >
                    Technology
                  </InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    label="Technology"
                    style={{ width: "350px" }}
                    onChange={handleCourseChange}
                    value={Userchoosencourse}
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
                {courseerror && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select Course
                  </FormHelperText>
                )}
                <br />
                <FormControl sx={{ m: 0, minWidth: 250 }}>
                  <InputLabel id="course-select-label">Trainer</InputLabel>
                  <Select
                    labelId="trainer-select-label"
                    id="trainer-select"
                    label="Trainer"
                    style={{ width: "350px" }}
                    value={Trainerid}
                    onChange={handletrainer}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          width: "auto",
                        },
                      },
                    }}
                  >
                    {Trainers.length > 0 ? (
                      Trainers.map((trainer) => (
                        <MenuItem key={trainer._id} value={trainer._id}>
                          {trainer.Firstname}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        <em>No trainers available</em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <br></br>
                {Trainererror && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select Trainer
                  </FormHelperText>
                )}
                <br></br> <br></br>
                <Button
                  variant="contained"
                  startIcon={<MdArrowBackIos />}
                  onClick={() => setActiveStep(0)}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={candidatecheck}
                  style={{ marginLeft: "250px" }}
                  endIcon={<MdArrowForwardIos />}
                >
                  Next
                </Button>
              </DialogContent>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <DialogTitle>
                <span style={{ marginRight: "280px" }}>Payment Details</span>
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="Courseamount"
                  name="Course Amount"
                  label="Course amount"
                  type="String"
                  fullWidth
                  variant="standard"
                  value={Courseamount}
                />
                <br></br>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="firstInstallment"
                  name="firstInstallment"
                  label="First Installment"
                  type="string"
                  fullWidth
                  variant="standard"
                  value={Firstinstallment}
                  onChange={Paymentstatusfunction}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="secondInstallment"
                  name="secondInstallment"
                  label="Second Installment"
                  type="string"
                  fullWidth
                  variant="standard"
                  value={Secondinstallment}
                />
                <br></br>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="thirdInstallment"
                  name="thirdInstallment"
                  label="Third Installment"
                  type="string"
                  fullWidth
                  variant="standard"
                  value={Thirdinstallment}
                />
                <br />
                <Button
                  onClick={() => setActiveStep(1)}
                  variant="contained"
                  startIcon={<MdArrowBackIos />}
                  style={{ marginTop: "12px" }}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  endIcon={<FaPlus />}
                  style={{ marginLeft: "250px", marginTop: "12px" }}
                >
                  Add
                </Button>
              </DialogContent>
            </div>
          )}
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Usercreation;
