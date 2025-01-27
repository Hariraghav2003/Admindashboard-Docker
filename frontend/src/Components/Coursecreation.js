import { ToastContainer, toast } from "react-toastify";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { ImCross } from "react-icons/im";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";

export default function Coursecreation() {
  //statevariable to handle the behaviour of dialogue box
  const [open, setOpen] = React.useState(false);

  //state variable to store the course details
  const [Course, setCourse] = React.useState("");
  const [Amount, setAmount] = React.useState("");

  //stae variables to handle the errors
  const [courseError, setCourseError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [AmountErrormessage, setAmountErrormessage] = React.useState(
    "Amount Value is Required"
  );

  //To Popup the form
  const handleClickOpen = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addcourseaccess`,
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
    setAmountError(false);
    setCourseError(false);
    setCourse("");
    setAmount("");
  };

  //Function to store the Coursedata
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Course.trim() === "" && !Amount) {
      toast.error("Fill Appropriate Values!!");
      setAmountError(true);
      setCourseError(true);
    } else if (!Amount) {
      setAmountErrormessage("Amount Value is Required");
      setAmountError(true);
    } else if (Course.trim() === "") {
      setCourseError(true);
    }
    //To check for empty values before feeding the course data
    else if (
      Course.trim() !== "" &&
      !isNaN(Amount) &&
      Amount &&
      Amount.toString().length >= 1 &&
      Amount.toString().length < 6
    ) {
      try {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/coursedetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Course,
              Amount,
            }),
          }
        );
        if (Response.ok) {
          toast.success("New Course Added");
          handleClose();
        } else if (Response.status === 409) {
          toast.warning("Course Already Exists");
        }
      } catch (error) {
        toast.error("Server Error");
      }
    }

    //To alert if values are empty
    else {
      toast.error("Fill Appropriate Values!!");
    }
  };

  //Functions to validate the inputs
  const handleCourseinput = (e) => {
    const courseinput = e.target.value;
    const data =
      courseinput.charAt(0).toUpperCase() + courseinput.slice(1).toLowerCase();
    const properdata = data.replace(/\s+/g, "");
    let formatteddata = properdata.replace(/\//g, "");
    let formatdata = formatteddata.replace(/\\/g, "");
    if (formatdata === "") {
      setCourseError(true);
    } else {
      setCourseError(false);
      setCourse(formatdata);
    }
  };
  const handleCourseamountinput = (e) => {
    const courseamountinput = e.target.value;
    const properdata = parseInt(courseamountinput.replace(/\s+/g, ""), 10);
    if (courseamountinput.trim() === "") {
      setAmountErrormessage("Amountvalue is Required");
      setAmountError(true);
    } else if (isNaN(properdata)) {
      setAmountErrormessage("Amountvalue should be a number");
      setAmountError(true);
    } else if (properdata.toString().length === 6) {
      setAmountError(false);
    } else if (properdata.toString().length >= 6) {
      setAmountErrormessage("Amountvalue should be less than 6");
      setAmountError(true);
    } else if (properdata.toString().length < 1) {
      setAmountErrormessage("Invalid Amount Value");
      setAmountError(true);
    } else {
      setAmountError(false);
      setAmount(properdata);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* Form to get the course data from User */}
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
          Add Course &nbsp;
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
              id="Course"
              name="Course"
              label="Course"
              type="Course"
              fullWidth
              variant="standard"
              maxLength="10"
              error={courseError}
              helperText={courseError ? "Course name  is required" : ""}
              onChange={handleCourseinput}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="Amount"
              name="Amount"
              label="Amount"
              type="Amount"
              fullWidth
              variant="standard"
              error={amountError}
              helperText={amountError ? AmountErrormessage : " "}
              onChange={handleCourseamountinput}
            />
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
