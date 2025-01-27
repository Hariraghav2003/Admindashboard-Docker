/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaUserTie } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme, Breadcrumb } from "antd";
import { RiAdminFill } from "react-icons/ri";
import Avatar from "@mui/material/Avatar";
import { ImCross } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { deepOrange } from "@mui/material/colors";

import { FaUserGear } from "react-icons/fa6";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { PiChartLineFill } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import image from "../assests/Notasco.png";
import logo from "../assests/Notascologo.png";
import Coursedisplay from "../Components/Coursedisplay.js";
import Coursecreation from "../Components/Coursecreation.js";
import Usercreation from "../Components/Usercreation.js";
import Userlistdisplay from "../Components/Userlistdisplay.js";
import Trainerlistdisplay from "../Components/Trainerlistdisplay.js";
import Trainercreation from "../Components/Trainercreation.js";
import Admincreation from "../Components/Admincreation.js";
import Adminlistdisplay from "../Components/Adminlistdisplay.js";
import Report from "../Components/Report.js";
import Accessdisplay from "../Components/Accessdisplay.js";
import CommonInvoice from "../Components/CommonInvoice.js";
import Accessdenied from "../Components/Accessdenied.js";
import Chart from "../Components/Chart.js";
import Expense from "../Components/Expense.js";

const { Header, Sider, Content } = Layout;

const Home = ({ onLogout }) => {
  const Navigate = useNavigate();
  // State Variable to set the collapsable behaviour of dashboard
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // State Variable to update breadcrumb
  const [breadcrumbItems, setBreadcrumbItems] = useState(["Home"]);

  //Logout Function
  const handleSignOut = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signout`, {
      method: "GET",
      credentials: "include", // Send cookies with the request
    })
      .then((message) => {
        Navigate("/");
      })
      .catch((error) => {
        //console.log(error);
        alert("An error occurred during signout. Please try again.");
      });
    onLogout();
  };

  //Function to Handle Admin Module Access
  const handlAdminpage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/adminpageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Admins"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Trainer Module Access
  const handleTrainerpage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/trainerpageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Trainers"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Role Module Access
  const handlerolepage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/rolepageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Roles"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Course Module Access
  const handleCoursepage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/technologypageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Technologies"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Invoice Module Access
  const handleInvoicepage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/invoicepageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Invoice"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Report Module Access
  const handleReportpage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reportpageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Reports"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle User Module Access
  const handleUserpage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userpageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Users"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //Function to Handle Expense Module Access
  const handleExpensepage = async () => {
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/expensepageaccess`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (Response.status === 403) {
        setBreadcrumbItems([""]);
      } else {
        setBreadcrumbItems(["Home", "Expenses"]);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handler to update breadcrumb based on selected menu
  const handleMenuClick = (e) => {
    let newBreadcrumbItems = [];
    switch (e.key) {
      // case "1":
      //   newBreadcrumbItems = ["Home", "Analysis"];
      //   break;
      case "1":
        handleUserpage();
        break;
      case "2":
        handleReportpage();
        break;
      case "3":
        handleInvoicepage();
        break;
      // case "5":
      //   handleExpensepage();
      //   break;
      case "4":
        handleCoursepage();
        break;
      case "5":
        handleTrainerpage();
        break;
      case "6":
        handlerolepage();
        break;
      case "7":
        handlAdminpage();
        break;
      case "8":
        handleSignOut();
        break;
      default:
        break;
    }
    setBreadcrumbItems(newBreadcrumbItems);
  };

  //State Variables to store the loogedin user details
  const [Loggedinuser, setLoggedinuser] = React.useState("");
  const [Loggedinusername, setLoggedinusername] = React.useState("");
  const [Loggedinuseremail, setLoggedinuseremail] = React.useState("");

  //Function to get the loggedin user detail
  const fetchlogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/checkuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        let Email = data.Email;
        let Name = data.Firstname;
        let Lastname = data.Lastname;
        let fullname = Name + " " + Lastname;
        const Avatar = Name.charAt(0);
        setLoggedinuseremail(Email);
        setLoggedinusername(fullname);
        setLoggedinuser(Avatar);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    fetchlogin();
  }, []);

  //To Handle the popover
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  //Function to handle the breadcrumb for invoiceModule
  const handleSelectOption = (option) => {
    if (option === "CommonInvoice") {
      setBreadcrumbItems(["Home", "Invoice", "Common Invoice"]);
    } else {
      setBreadcrumbItems(["Home", "Invoice", "User Invoice"]);
    }
    setDialogOpen(false);
  };

  return (
    <Layout style={{ minHeight: "150vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div
          className="image-container"
          style={{
            display: collapsed ? "none" : "block",
            transition: "all 0.5s", // Smooth transition for the image visibility
            marginBottom: "-13px",
            marginTop: "-10px",
          }}
        >
          <img src={image} alt="error" style={{ width: "100%" }} />
        </div>

        <img
          src={logo}
          alt="error"
          style={{
            display: collapsed ? "block" : "none",
            transition: "all 0.5s", // Smooth transition for alternate logo visibility
            width: "45px",
            height: "45px",
            marginLeft: "18px",
            marginTop: "10px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick} // Update breadcrumb when menu item is clicked
          items={[
            // {
            //   key: "1",
            //   icon: <PiChartLineFill />,
            //   label: "Analysis",
            // },
            {
              key: "1",
              icon: <FaUser />,
              label: "Users",
            },
            {
              key: "2",
              icon: <BiSolidReport />,
              label: "Reports",
            },
            {
              key: "3",
              icon: <FaFileInvoiceDollar />,
              label: "Invoice",
            },
            // {
            //   key: "5",
            //   icon: <FaRupeeSign />,
            //   label: "Expenses",
            // },
            {
              key: "4",
              icon: <ImBooks />,
              label: "Technologies",
            },
            {
              key: "5",
              icon: <FaUserTie />,
              label: "Trainers",
            },
            {
              key: "6",
              icon: <RiAdminFill />,
              label: "Roles",
            },
            {
              key: "7",
              icon: <FaUserGear />,
              label: "Settings",
            },
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            <br></br>,
            {
              key: "8",
              icon: <IoLogOutSharp />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                position: "absolute",
                top: "10px",
                left: "1630px",
              }}
            >
              {Loggedinuser}
            </Avatar>
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: "none", left: "1320px" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",

                  color: "#2c3e50",
                }}
              >
                {Loggedinusername}
              </span>{" "}
              <br></br>
              <span
                style={{
                  top: "10px",
                  fontSize: "14px",
                  color: "#2c3e50",
                }}
              >
                {Loggedinuseremail}
              </span>
            </Typography>
          </Popover>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Breadcrumb Component */}
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>

          {/* Contents Based on Breadcrumb */}
          {breadcrumbItems.includes("Home") &&
            !breadcrumbItems.includes("Users") &&
            !breadcrumbItems.includes("Technologies") &&
            !breadcrumbItems.includes("Reports") &&
            !breadcrumbItems.includes("Invoice") &&
            !breadcrumbItems.includes("Logout") &&
            !breadcrumbItems.includes("Trainers") &&
            !breadcrumbItems.includes("Admins") &&
            !breadcrumbItems.includes("Roles") &&
            !breadcrumbItems.includes("Expense") && (
              <div>
                <h3>Admin Dashboard</h3>
              </div>
            )}

          {breadcrumbItems.includes("Users") && (
            <div>
              <Usercreation />
              <h3>User Details</h3>
              <Userlistdisplay />
            </div>
          )}

          {breadcrumbItems.includes("Technologies") && (
            <div>
              <Coursecreation />
              <h3>Course Details</h3>
              <Coursedisplay />
            </div>
          )}

          {breadcrumbItems.includes("Reports") && (
            <div>
              <Report Breadcrumb={"Report"}></Report>
            </div>
          )}
          {breadcrumbItems.includes("Invoice") &&
            !breadcrumbItems.includes("Common Invoice") &&
            !breadcrumbItems.includes("User Invoice") && (
              <div>
                <h3>Invoice Generator</h3>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "250px",
                      color: "white",
                      backgroundColor: "#1677FF",
                      width: "fit-content",
                      padding: "5px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                    onClick={handleOpenDialog}
                  >
                    Create Invoice <IoMdAdd />
                  </div>
                  <Dialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: "12px",
                        padding: "20px",
                        width: "400px",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                        backgroundColor: "#f7f9fc",
                      },
                    }}
                  >
                    <DialogTitle
                      sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        textAlign: "center",
                        borderBottom: "1px solid #e0e0e0",
                        paddingBottom: "10px",
                      }}
                    >
                      Generate Invoice For &nbsp;
                      <span
                        color="#2c3e50"
                        onClick={handleCloseDialog}
                        style={{ cursor: "pointer" }}
                      >
                        <ImCross
                          size={15}
                          style={{
                            marginLeft: "30px",
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                          }}
                        />
                      </span>
                    </DialogTitle>

                    <DialogActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        onClick={() => handleSelectOption("CommonInvoice")}
                        sx={{
                          width: "100%",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: "16px",
                          fontWeight: "medium",
                          borderColor: "#000", // Black border
                          "&:hover": {
                            backgroundColor: "#f0f0f0", // Light gray on hover
                          },
                        }}
                      >
                        <span color="#000">Common Invoice</span>
                      </Button>
                      <Button
                        onClick={() => handleSelectOption("UserInvoice")}
                        sx={{
                          width: "100%",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: "16px",
                          fontWeight: "medium",
                        }}
                      >
                        User Invoice
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            )}
          {breadcrumbItems.includes("Common Invoice") && (
            <CommonInvoice></CommonInvoice>
          )}
          {breadcrumbItems.includes("User Invoice") && (
            <Userlistdisplay></Userlistdisplay>
          )}
          {breadcrumbItems.includes("Trainers") && (
            <div>
              <Trainercreation></Trainercreation> <h3>Trainer Details</h3>
              <Trainerlistdisplay></Trainerlistdisplay>
            </div>
          )}
          {breadcrumbItems.includes("Roles") && (
            <div>
              <Admincreation></Admincreation>
              <h3>Access</h3>
              <Accessdisplay></Accessdisplay>
            </div>
          )}
          {breadcrumbItems.includes("Admins") && (
            <div>
              <h3>Access Modify</h3>
              <Adminlistdisplay></Adminlistdisplay>
            </div>
          )}
          {breadcrumbItems.includes("Expense") && (
            <div>
              <h3>Expenses</h3>
              <Expense></Expense>
            </div>
          )}
          {breadcrumbItems.includes("") && (

            <Accessdenied></Accessdenied>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
