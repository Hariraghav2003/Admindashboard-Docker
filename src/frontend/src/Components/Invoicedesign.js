import React, { useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToWords } from "to-words";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Invoice.css";
function Invoicedesign({
  rows,
  clientname,
  clientaddress,
  clientemail,
  totalRate,
  phone,
  discountAmount,
  tax,
  gst,
  resetValues,
  checktaxgst,
}) {
  //useRef hook to get particular element
  const printRef = useRef();

  //Timestamp generator
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const istTimestamp = formattedDate;

  //Table Styles
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ccc",
      color: theme.palette.common.black,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      borderBottom: "1px solid black",
    },
  }));

  let Printdisabled = true;

  //Rupee to word conversion
  const toWords = new ToWords();
  let Words = toWords.convert(totalRate, { currency: true });

  //Function to handle invoice data
  const handleinvoicedata = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/invoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientname,
            clientaddress,
            clientemail,
            totalRate,
            phone,
            rows,
            istTimestamp,
          }),
        }
      );
      if (Response.ok) {
        toast.success("Invoice Details Added!!");
      } else if (Response.status === 409) {
        toast.warning("Detail Already Exists");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  if (
    totalRate === 0 ||
    tax === 0 ||
    gst === 0 ||
    clientname === "" ||
    clientemail === "" ||
    clientaddress === "" ||
    phone === "" ||
    rows.length < 0
  ) {
    Printdisabled = true;
  } else {
    Printdisabled = false;
  }
  //Function to convert the invoice data to PDF
  const handlePrint = () => {
    if (
      totalRate === 0 ||
      tax === 0 ||
      gst === 0 ||
      clientname === "" ||
      clientemail === "" ||
      clientaddress === "" ||
      phone === "" ||
      rows.length < 0
    ) {
      if (checktaxgst) {
        checktaxgst();
      }
    } else {
      const printContent = printRef.current;
      const WindowPrint = window.open("", "_blank");
      WindowPrint.document.write(`
        <html>
          <head>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  margin: 5mm;
                  padding: 0;
                  -webkit-print-color-adjust: exact; 
                  print-color-adjust: exact;
                }
                .invoice-container {
                  width: 800px;
                  max-width: 100%;
                }
                .invoice-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  column-gap: 65px;
                }
                .invoice-header img {
                  margin-left:-15px;
                  height: 47px;
                  width: 223px;
                }
                .invoice-header div span {
                  font-size: 12px;
                  display: block;
                }
                .invoice-body {
                  display: flex;
                  justify-content: space-between;
                  column-gap: 140px;
                  margin-top: 20px;
                  font-size:12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  text-align: left;
                  border: 1px solid black;
                  padding: 8px;
                }
                .th {
                  background-color:#ccc;
                  color: black;
                }
                .table-container {
                  margin-top: 20px;
                }
                .totals-container {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                  text-align: right;
                  margin-right: 20px;
                }
                .totals-container span {
                  margin-bottom: 10px;
                }
                .terms{
                  margin-top: 50px;
                  font-weight: bolder;
                  font-size:12px;
    
                }
                .companyname{
                  font-size:12px;
                  font-weight:Bold;
                }
                .companyaddress{
                  font-size:12px;
                }
                .towords{
                  margin-top: 80px;
                }
                @page :footer {
                  display: none
                }
                @page :header {
                  display: none
                }
                @page {
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
          </body> <br> <br> <br> <br> <br>  
          <footer style="font-size: 12px;text-align:right;margin-top:100px;font-weight:bold">
            *This is a system generated invoice with no signature required*
          </footer>
  
        </html>
      `);
      WindowPrint.document.close();
      WindowPrint.focus();
      WindowPrint.print();
      WindowPrint.close();
      handleinvoicedata();
      if (resetValues) {
        resetValues();
      }
    }
  };

  return (
    <div className="Invoice">
      <Button
        variant="contained"
        onClick={handlePrint}
        style={{ marginLeft: "570px", marginTop: "2px" }}
        disabled={Printdisabled}
      >
        Generate Invoice &nbsp; &nbsp; <IoMdPrint />{" "}
      </Button>
      <div className="invoice-container" ref={printRef}>
        <div className="invoice-header">
          <div>
            <img
              src="data:image/jpeg;base64,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"
              alt="Logo"
            />
            <br /> <br></br>
            <span>
              <span className="companyname">
                NOTASCO TECHNOLOGIES INDIA PRIVATE LIMITED
              </span>
              <br />
              <span className="companyaddress">
                We Work Embassy TechVillage, Block L, <br />
                Devarabisanahalli, Outer Ring Rd, Bellandur <br />
                Bangalore, Karnataka - 560103 <br />
                notasco@gmail.com
              </span>
            </span>
          </div>
          <div>
            <span>
              <span style={{ fontWeight: "bolder", fontSize: "30px" }}>
                TAX INVOICE <br></br>
              </span>
              <span style={{ fontWeight: "bold", fontSize: "10px" }}>
                Invoice No:#NTS-INB-238
                <br></br>
                Payment Terms: Gpay
              </span>
            </span>
          </div>
        </div>
        <hr />
        <div className="invoice-body">
          <div>
            <span>
              BILL TO: <br />
            </span>

            <span
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "14px",
              }}
            >
              {clientname}
            </span>
            <br />
            <span>{clientemail}</span>

            <br></br>
            <span>{clientaddress}</span>
            <br></br>
            <span>{phone}</span>
          </div>
          <div>
            <span>
              <br />

              <br />
              <span style={{ fontSize: "10px" }}>
                Issued on: {istTimestamp}
              </span>
            </span>
          </div>
        </div>
        <br></br>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="static table">
              <TableHead>
                <StyledTableRow className="th">
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Items</StyledTableCell>
                  <StyledTableCell align="right">QUANTITY</StyledTableCell>
                  <StyledTableCell align="right">RATE</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.Items}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Rate}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <div className="totals-container">
            <span>
              Subtotal:
              <span style={{ fontWeight: "bold" }}>₹{totalRate}</span>
            </span>

            <span>
              Discount:
              <span style={{ fontWeight: "bold" }}>{discountAmount}%</span>
            </span>
            <span>
              GST:
              <span style={{ fontWeight: "bold" }}>{gst}%</span>
            </span>
            <span>
              Tax:
              <span style={{ fontWeight: "bold" }}>{tax}%</span>
            </span>

            <span style={{ fontWeight: "bolder" }}>
              Total Amount:
              <span style={{ fontWeight: "bold" }}>₹{totalRate}</span>
            </span>
          </div>
        </div>
        <div className="terms">
          <span
            style={{
              fontWeight: "normal",
              paddingBottom: "30px",
              textTransform: "capitalize",
            }}
          >
            Total in Words: {Words}
          </span>
        </div>

        <div className="terms">
          Terms and Condition:Fees once paid shall not be refunded under any
          circumstances
        </div>
      </div>
    </div>
  );
}

export default Invoicedesign;
