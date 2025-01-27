import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Userlistdisplay from "./Userlistdisplay";
function Report(Breadcrumb) {
  const selectedmodule = Breadcrumb.Breadcrumb;

  const [fromdate, setfromdate] = React.useState();
  const [todate, settodate] = React.useState();
  const [report, setReport] = React.useState([]);


  const reportfromdate = (newdate) => {
    const date = new Date(newdate); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0"); 
    const formattedDate = `${year}-${month}-${day}`;

    setfromdate(formattedDate);
  };

  const reporttodate = (newdate) => {
    const date = new Date(newdate); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0"); 
    const formattedDate = `${year}-${month}-${day}`;

    settodate(formattedDate);
  };
  const [fetchData, setFetchData] = React.useState(false);

  React.useEffect(() => {
    const fetchReportData = async () => {
      if (fromdate !== "" && todate !== "") {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userfind`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fromdate, todate }),
          });

          if (response.ok) {
            const data = await response.json();
            const modifiedData = data.map((users) => ({
              ...users,
    
              Phonenumber: users.Phonenumber.toString().replace(
                /(.).+(.)/,
                (match, firstChar, lastChar) => `${firstChar}********${lastChar}`
              ),
            }));
            setReport(modifiedData);
          } else if (response.status === 409) {
            //console.log("Conflict error");
          }
        } catch (error) {
          //console.log("Error fetching data:", error);
        }
      }
    };

    if (fetchData) {
      fetchReportData();
      setFetchData(false); 
    }

    fetchReportData();
  }, [fetchData, fromdate, todate]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="From" onChange={reportfromdate} />
          <DatePicker label="To" onChange={reporttodate} />
        </DemoContainer>
      </LocalizationProvider>{" "}
      <br></br>
      <Userlistdisplay
        selected={selectedmodule}
        report={report}
      ></Userlistdisplay>
    </div>
  );
}

export default Report;
