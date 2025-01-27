import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FaTrash } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { ToastContainer, toast } from "react-toastify";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.css";
import "../style/Commoninvoice.css";
import Invoicedesign from "./Invoicedesign";

//Table Styles
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

function CommonInvoice() {
  // State Variables to store the input values
  const [clientname, setClientname] = React.useState();
  const [clientaddress, setClientaddress] = React.useState();
  const [clientemail, setClientemail] = React.useState();
  const [clientphone, setclientphone] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    { Items: "", Quantity: "", Rate: "" },
  ]);
  const [discount, setDiscount] = React.useState();
  const [discountedamount, setDiscountedamount] = React.useState(0);
  const [discountdisplay, setDiscountdisplay] = React.useState(false);
  const [tax, setTax] = React.useState(0);
  const [gstdisplay, setgstdisplay] = React.useState(false);
  const [gst, Setgst] = React.useState(0);
  const [totalamount, setTotalamount] = React.useState(0);

  //Function to reset the input fields after generating the invoice
  const resetvalues = () => {
    setRows([]);
    setDiscountedamount(0);
    setClientaddress("");
    setClientname("");
    setclientphone("");
    setClientemail("");
    setDiscount("");
    setDiscountedamount("");
    setDisplay(false);
    setOpen(false);
    setDiscountdisplay(false);
    setTotalamount(0);
    setTax(0);
    setgstdisplay(false);
    Setgst(0);
  };

  //Function to increment row
  const handleAddRow = () => {
    setRows([...rows, { Items: "", Quantity: "", Rate: "" }]);
  };

  //Function to store the values for the table row
  const handleCellChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  //Function to Handlethe display behaviour of Buttons
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclientname = (e) => {
    setOpen(false);
    setDisplay(true);
  };

  //Function to decrement row
  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  //Functions to store discount,gst,tax Values
  const handlediscount = (e) => {
    setDiscount(e.target.value);
  };

  const handlegst = (e) => {
    Setgst(e.target.value);
  };

  const handletax = (e) => {
    setTax(e.target.value);
  };

  //Function to calculate the discount amount
  const applyDiscount = () => {
    // Calculate the total rate of all products
    const totalRate = rows.reduce(
      (sum, row) => sum + parseFloat(row.Rate || 0),
      0
    );

    // Parse the discount percentage
    const discountValue = parseFloat(discount);

    if (isNaN(discountValue) || discountValue === 0) {
      setDiscount(0);
      setDiscountedamount(totalRate.toFixed(2)); // No discount, use totalRate as is
    } else {
      // Apply the discount on the total rate
      const discountedTotal = totalRate - (totalRate * discountValue) / 100;

      // Update the total discounted amount state
      setDiscountedamount(discountedTotal.toFixed(2));
    }
  };

  //Function to calculate the gst and tax amount
  const applyGstAndTax = () => {
    // Parse the GST and tax percentages
    const gstRate = parseFloat(gst);
    const taxRate = parseFloat(tax);

    if (isNaN(gstRate) || isNaN(taxRate) || gstRate === 0 || taxRate === 0) {
      toast.warning("Enter appropriate GST and Tax values");
    } else {
      // Apply discount first
      const discountValue = parseFloat(discountedamount) || 0;
      const discountedTotal = discountValue;

      // Apply GST and tax on the discounted total
      const gstAmount = (discountedTotal * gstRate) / 100;
      const taxAmount = (discountedTotal * taxRate) / 100;
      const finalAmount = discountedTotal + gstAmount + taxAmount;

      // Update the states for GST, tax, and final amounts
      setDiscountedamount(discountedTotal.toFixed(2));
      setTotalamount(finalAmount.toFixed(2));
    }
  };

  //Functions to alert for empty values
  const checktaxgst = () => {
    toast.error("Enter Appropriate Values!!");
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div
        className="Accordionstyle"
        style={{ height: "600px", overflowY: "auto", overflowX: "hidden" }}
      >
        <Accordion expanded={false}>
          <AccordionSummary>
            <Typography style={{ fontSize: "16px" }}>
              <b>Bill From</b> <br></br> <br></br>
              NOTASCO TECHNOLOGIES INDIA PRIVATE LIMITED<br></br>
              <span className="companyaddress">
                We Work Embassy TechVillage, Block L, <br />
                Devarabisanahalli, Outer Ring Rd, Bellandur <br />
                Bangalore, Karnataka - 560103 <br />
                notasco@gmail.com
              </span>
            </Typography>
          </AccordionSummary>
        </Accordion>
        <br></br> <br></br>
        <Accordion expanded={false}>
          <AccordionSummary>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: "16px" }}>
                <b>Bill To :</b>
              </span>
              <br></br>
              <div>
                <Accordion className="Accordionstyleforitem">
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography component="span">
                      {clientname === ""
                        ? "Enter Your Client Details"
                        : clientname}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <React.Fragment>
                      <Button
                        onClick={handleClickOpen}
                        style={{
                          textTransform: "capitalize",
                          fontSize: "15px",
                          display: display ? "none" : "block",
                        }}
                      >
                        Add New Client
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Client Name</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              setClientname(e.target.value);
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleclientname}>Add </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                    <Typography style={{ display: display ? "block" : "none" }}>
                      <Typography>
                        Client Name <br></br>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={clientname}
                        />
                      </Typography>

                      <br></br>

                      <Typography>
                        Client Email
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={clientemail}
                          onChange={(e) => setClientemail(e.target.value)}
                        />
                      </Typography>

                      <br></br>

                      <Typography>
                        Address
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={clientaddress}
                          onChange={(e) => setClientaddress(e.target.value)}
                        />
                      </Typography>
                      <br></br>
                      <Typography>
                        Phonenumber
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={clientphone}
                          onChange={(e) => setclientphone(e.target.value)}
                        />
                      </Typography>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </AccordionSummary>
        </Accordion>
        <br></br> <br></br>
        <Accordion expanded={false}>
          <AccordionSummary>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: "16px" }}>
                <b>Items</b>
              </span>
              <br></br>
              <div>
                <Accordion className="Accordionstyleforitem">
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography component="span">Your Items</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell>Items</StyledTableCell>
                            <StyledTableCell align="left">
                              Quantity
                            </StyledTableCell>
                            <StyledTableCell align="left">Rate</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row">
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={row.Items}
                                  onChange={(e) =>
                                    handleCellChange(
                                      index,
                                      "Items",
                                      e.target.value
                                    )
                                  }
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="string"
                                  value={row.Quantity}
                                  onChange={(e) =>
                                    handleCellChange(
                                      index,
                                      "Quantity",
                                      e.target.value
                                    )
                                  }
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="string"
                                  value={row.Rate}
                                  onChange={(e) =>
                                    handleCellChange(
                                      index,
                                      "Rate",
                                      e.target.value
                                    )
                                  }
                                />
                              </StyledTableCell>

                              <StyledTableCell align="right">
                                <span
                                  color="red"
                                  onClick={() => handleDeleteRow(index)}
                                >
                                  <FaTrash />
                                </span>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddRow}
                      style={{
                        marginTop: "20px",
                        width: "800px",
                        textAlign: "center",
                        textTransform: "capitalize",
                        fontSize: "15px",
                      }}
                    >
                      Add Item
                    </Button>
                    <br></br> <br></br>
                    <div
                      style={{
                        border: "2px solid #ccc",
                        color: "black",
                        marginLeft: "300px",
                      }}
                    >
                      <Button
                        color="primary"
                        fontSize="15px"
                        style={{
                          textTransform: "capitalize",
                          display: !discountdisplay ? "block" : "none",
                        }}
                        onClick={() => setDiscountdisplay(true)}
                      >
                        Add Discount
                      </Button>
                      <div
                        style={{ display: discountdisplay ? "block" : "none" }}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ Width: 50 }}
                            aria-label="customized table"
                          >
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    value="Discount"
                                  />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    onChange={handlediscount}
                                    value={discount}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    type="string"
                                    value={discountedamount}
                                    readOnly
                                  />
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Button
                          color="primary"
                          fontSize="15px"
                          style={{ textTransform: "capitalize" }}
                          onClick={applyDiscount}
                        >
                          Apply Discount
                        </Button>

                        <Button
                          color="primary"
                          fontSize="15px"
                          style={{
                            textTransform: "capitalize",
                            display: !gstdisplay ? "block" : "none",
                          }}
                          onClick={() => setgstdisplay(true)}
                        >
                          Add GST & TAX
                        </Button>
                        <div style={{ display: gstdisplay ? "block" : "none" }}>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ Width: 50 }}
                              aria-label="customized table"
                            >
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      value="GST"
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell component="th" scope="row">
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      onChange={handlegst}
                                      value={gst}
                                      label="GST (%)"
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ Width: 50 }}
                              aria-label="customized table"
                            >
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      value="TAX"
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell component="th" scope="row">
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      onChange={handletax}
                                      value={tax}
                                      label="TAX (%)"
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Button
                            color="primary"
                            fontSize="15px"
                            style={{ textTransform: "capitalize" }}
                            onClick={applyGstAndTax}
                          >
                            Apply GST and TAX
                          </Button>
                        </div>
                      </div>
                      <span style={{ fontSize: "16px", marginLeft: "10px" }}>
                        <b>
                          Subtotal
                          <span style={{ marginLeft: "305px" }}>
                            {totalamount}
                          </span>
                        </b>
                        <br></br>
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </AccordionSummary>
        </Accordion>
      </div>

      <div>
        <Invoicedesign
          rows={rows}
          onDeleteRow={handleDeleteRow}
          clientname={clientname}
          clientaddress={clientaddress}
          clientemail={clientemail}
          totalRate={totalamount}
          discount={discountedamount}
          phone={clientphone}
          discountAmount={discount}
          tax={tax}
          gst={gst}
          resetValues={resetvalues}
          checktaxgst={checktaxgst}
        ></Invoicedesign>
      </div>
    </div>
  );
}

export default CommonInvoice;
