import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { ImCross } from "react-icons/im";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BiSolidCartAdd } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { InputAdornment, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import "../style/Expense.css";

function Expense() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      border: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.MuiTableRow-root": {
      border: "none",
    },
  }));

  const [walletAmount, setWalletAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [openWalletDialog, setOpenWalletDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [rows, setRows] = useState([
    { Purchaseddate: "", Items: "", Rate: "" },
  ]);
  const [newAmount, setNewAmount] = useState(0);
  const [walletAmountError, setWalletAmountError] = useState(false);
  const [walletAmountErrormessage, setWalletAmountErrormessage] =
    useState("Amount is required");

  const [editValues, setEditValues] = useState([
    {
      Purchaseddate: null,
      Items: "",
      Rate: "",
      Billimage: [],
    },
  ]);

  const [Filename, setFilename] = React.useState("");
  const [Filepreview, setFilePreview] = React.useState("");
  const [fileError, setFileerror] = React.useState(false);
  const [productError, setProducterror] = React.useState(false);
  const [rateError, setRateerror] = React.useState(false);
  const timestampgenerator = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getwalletdetails`
        );
        const data = await response.json();
        if (data.walletAmount === 0) {
          setWalletAmount(0);
          setRemainingAmount(0);
        } else {
          setWalletAmount(data.walletAmount);
          setRemainingAmount(data.walletAmount);
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchWalletDetails();
  });

  const handleOpenEditDialog = (index) => {
    setEditRowIndex(index);
    setEditValues(rows[index]);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedRows = [...rows];
    updatedRows[editRowIndex] = editValues;
    const rate = parseFloat(updatedRows[editRowIndex].Rate);
    if (
      updatedRows[editRowIndex].Items === "" &&
      updatedRows[editRowIndex].Purchaseddate === null &&
      updatedRows[editRowIndex].Rate === "" &&
      updatedRows[editRowIndex].Billimage.length < 0 &&
      updatedRows[editRowIndex].Purchaseddate === ""
    ) {
      toast.warning("Enter the Appropriate values!");
      setFileerror(true);
      setProducterror(true);
      setRateerror(true);
      setOpenEditDialog(true);
      return;
    }
    if (
      updatedRows[editRowIndex].Purchaseddate === null ||
      updatedRows[editRowIndex].Purchaseddate === ""
    ) {
      toast.warning("Enter the Purchased Date");
      setOpenEditDialog(true);
      return;
    }
    if (updatedRows[editRowIndex].Items === "") {
      setProducterror(true);
      setOpenEditDialog(true);
      return;
    }

    if (updatedRows[editRowIndex].Rate === "") {
      setRateerror(true);
      setOpenEditDialog(true);
      return;
    }
    if (updatedRows[editRowIndex].Billimage === undefined) {
      setFileerror(true);
      setOpenEditDialog(true);
      return;
    }
    if (rate + spentAmount > remainingAmount) {
      toast.warning("Insufficient Balance");
      setOpenEditDialog(true);
    } else {
      setRows(updatedRows);

      const totalRate = updatedRows.reduce((sum, row) => {
        if (Array.isArray(row.Rate)) {
          return (
            sum +
            row.Rate.reduce((rateSum, rateValue) => rateSum + rateValue, 0)
          );
        }

        if (typeof row.Rate === "object" && row.Rate !== null) {
          const rateValues = Object.values(row.Rate);
          return (
            sum +
            rateValues.reduce((rateSum, rateValue) => rateSum + rateValue, 0)
          );
        }
        return sum + parseFloat(row.Rate);
      }, 0);

      const walletBalance = walletAmount - totalRate;

      const Date = timestampgenerator();
      const newIndex = editRowIndex;
      setSpentAmount(totalRate);
      setWalletAmount(totalRate);
      setRemainingAmount(walletBalance);
      uploadItems(updatedRows, rate, newIndex);
      updatedwallet(walletBalance, Date, rate);

      setOpenEditDialog(false);
      setFilePreview("");
      setFilename("");
      const newRow = {
        Purchaseddate: "",
        Items: "",
        Rate: "",
        Billimage: [],
      };
      setRows((prevRows) => [...updatedRows, newRow]);
      setFileerror(false);
      setProducterror(false);
      setRateerror(false);
    }
  };

  const handleClose = () => {
    setOpenWalletDialog(false);
    setWalletAmountError(false);
  };

  const handleWalletAmountChange = (e) => {
    const value = e.target.value;
    setNewAmount(value);

    if (!value) {
      setWalletAmountError(true);
      setWalletAmountErrormessage("Amount is required");
      return;
    }

    if (isNaN(value) && value <= 0) {
      setWalletAmountError(true);
      setWalletAmountErrormessage("Amount should be a positive number");
      return;
    }
  };
  const updatedwallet = async (walletAmount, Date, rate) => {
    if (walletAmount !== "" && Date !== "") {
      try {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/addwalletamount`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAmount,
              Date,
            }),
          }
        );
        if (Response.ok) {
          toast.warning(
            <>
              ₹ <span style={{ color: "#F09319" }}>{rate}</span> has been
              debited
            </>
          );
          handleClose();
        }
      } catch (error) {
        //console.log(error);
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const Date = timestampgenerator();
    const updatedAmount = parseFloat(newAmount) + parseFloat(remainingAmount);

    if (
      !isNaN(updatedAmount) &&
      updatedAmount &&
      updatedAmount.toString().length >= 1 &&
      updatedAmount.toString().length < 6 &&
      updatedAmount > remainingAmount
    ) {
      try {
        const Response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/addwalletamount`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAmount: updatedAmount,
              Date,
            }),
          }
        );
        if (Response.ok) {
          toast.success(
            <>
              <span style={{ color: "#42CC45" }}> + ₹{newAmount}</span>{" "}
              credited!!
            </>
          );
          handleClose();
        }
      } catch (error) {
        toast.error("Server Error");
      }
    } else {
      toast.error("Fill Appropriate Values!!");
    }
  };
  const uploadItems = async (updatedRows, rate, newIndex) => {
    const spentAmount = rate;
    const rows = updatedRows[newIndex];
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addexpenses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            spentAmount,
            rows,
          }),
        }
      );
      if (Response.ok) {
        toast.success("New Item Added!!");
        handleClose();
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setFilename(file.name);
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
      } else {
        setFilePreview("");
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();

          const { filePath } = data;
          setEditValues((prevState) => ({
            ...prevState,
            Billimage: Array.isArray(prevState.Billimage)
              ? [...prevState.Billimage, filePath]
              : [filePath],
          }));
        }
      } catch (error) {
        //console.log(error);
      }
    }
  };
  const handleClosedialogue = () => {
    setOpenEditDialog(false);
    setFilePreview("");
    setFilename("");
    setProducterror(false);
    setRateerror(false);
    setFileerror(false);
  };

  return (
    <div>
      <ToastContainer />

      {/* Wallet Info */}
      <div className="Walletamountdisp">
        <Button onClick={() => setOpenWalletDialog(true)}>Add Amount</Button>
        <Dialog
          open={openWalletDialog}
          onClose={() => setOpenWalletDialog(false)}
        >
          <DialogTitle>
            Wallet Amount
            <span
              style={{
                cursor: "pointer",
                float: "right",
              }}
              onClick={() => setOpenWalletDialog(false)}
            >
              <ImCross />
            </span>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="standard"
              label="Wallet Amount"
              value={remainingAmount}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Add Amount"
              onChange={handleWalletAmountChange}
              error={walletAmountError}
              helperText={walletAmountError ? walletAmountErrormessage : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenWalletDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>

        <h6 style={{ color: "green" }}>Wallet Balance: ₹ {remainingAmount}</h6>
        <h6 style={{ color: "red" }}>Total Spent: ₹ {spentAmount}</h6>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* Expense Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Purchased Date</StyledTableCell>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Rate</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {row.Purchaseddate
                    ? dayjs(row.Purchaseddate).format("DD/MM/YYYY")
                    : ""}
                </StyledTableCell>
                <StyledTableCell>{row.Items}</StyledTableCell>
                <StyledTableCell>₹{row.Rate}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Add Item">
                    <Button onClick={() => handleOpenEditDialog(index)}>
                      <BiSolidCartAdd
                        style={{
                          fontSize: "20px",
                          color: "black",
                        }}
                      />
                    </Button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>
          Add Expense
          <span
            style={{
              cursor: "pointer",
              float: "right",
            }}
            onClick={() => handleClosedialogue()}
          >
            <ImCross />
          </span>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                editValues.Purchaseddate
                  ? dayjs(editValues.Purchaseddate)
                  : null
              }
              onChange={(date) => {
                const year = date.year();
                const month = String(date.month() + 1).padStart(2, "0");
                const day = String(date.date()).padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}`;
                setEditValues({ ...editValues, Purchaseddate: formattedDate });
              }}
              label="Purchased Date"
            />
          </LocalizationProvider>

          <TextField
            label="Item"
            fullWidth
            value={editValues.Items}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiFillProduct />
                </InputAdornment>
              ),
            }}
            error={productError}
            helperText={productError ? "Enter the item name" : ""}
            onChange={(e) =>
              setEditValues({ ...editValues, Items: e.target.value })
            }
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Rate"
            fullWidth
            value={editValues.Rate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaIndianRupeeSign />
                </InputAdornment>
              ),
            }}
            error={rateError}
            helperText={rateError ? "Enter the Rate of the Item" : ""}
            onChange={(e) =>
              setEditValues({ ...editValues, Rate: e.target.value })
            }
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Upload File"
            fullWidth
            value={Filename}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Attach File">
                    <IconButton color="primary" component="label">
                      <AttachFileIcon />
                      <input type="file" hidden onChange={handleFileChange} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            error={fileError}
            helperText={fileError ? "Upload the Bill Image" : ""}
            style={{ marginTop: "10px" }}
          />
          {Filepreview && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={Filepreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosedialogue()}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Expense;
