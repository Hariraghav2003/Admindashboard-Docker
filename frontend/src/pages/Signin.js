import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import image from "../assests/4826433.png"
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Signin.css";
function Signin({onSignIn}) {
  //State Variable for client side  data validation
  const [validated, setValidated] = useState(false);

  //State variables to store input fields
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //Navigate Hook
  const navigate = useNavigate();

  //Form Submission Event Handler for signin
  const signinHandler = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    //Client side validation for email and password
    if (Email.trim() !== "" && Password.trim() !== "") {
      try {
        // Make a POST request to the server to get the user details based on the input details for sign-in event
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email, Password }),
          credentials: "include",
        });
        //Behavior Handling based on the response(status code) from the Server
        if (response.ok) {
          // Perform authorization check after successful sign-in
          const authResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/home`, {
            method: "GET",
            credentials: "include", // Include cookies for session management
          });
          if (authResponse.ok) {
            onSignIn(true);
            navigate("/home");
          }
          else {
            toast.info("Website is Updating!!");
          }
        } else if (response.status === 401) {
          toast.error("Invalid Password!!");
        } else if (response.status === 400) {
          toast.error("Not authorized to access this page!!");
        }
      } catch (error) {
        //console.log(error)
      }
    } else {
      toast.warning("Enter Appropriate Value!!");
    }
  };
  
  return (
    <div className="body">
      {/* ToastContainer to use toastify */}
      <ToastContainer />
      <div className="container">
        <div className="left-panel">
          <h2>Sign in to Account</h2>

          <div className="form-group">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustomUsername"
              className="formcomp"
              style={{ width: "350px", marginLeft: "25px" }}
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <MdEmail />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="form-group">
            <Form.Group
              as={Col}
              md="3"
              controlId="validationCustom03"
              className="formcomp"
              style={{ width: "350px", marginLeft: "25px" }}
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <RiLockPasswordFill />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="form-group">
            <Button
              type="submit"
              className="btn"
              style={{
                textAlign: "center",
                marginBottom: "0px",
                width: "350px",
                marginLeft: "25px",
              }}
              noValidate
              validated={validated}
              onClick={signinHandler}
            >
              Sign-in
            </Button>
          </div>
        </div>
        <div className="right-panel">
          <img
            src={image}
            alt=""
            width={300}
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              marginRight: "10px",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Signin;
