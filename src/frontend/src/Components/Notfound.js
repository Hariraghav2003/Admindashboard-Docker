import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Notfound.css";

function Notfound() {
  useEffect(() => {
    function randomNum() {
      return Math.floor(Math.random() * 9) + 1;
    }

    let loop1, loop2, loop3;
    let time = 30;
    let i = 0;

    const selector3 = document.querySelector(".thirdDigit");
    const selector2 = document.querySelector(".secondDigit");
    const selector1 = document.querySelector(".firstDigit");

    if (!selector1 || !selector2 || !selector3) return;

    loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = 4;
      } else {
        selector3.textContent = randomNum();
        i++;
      }
    }, time);

    loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = 0;
      } else {
        selector2.textContent = randomNum();
        i++;
      }
    }, time);

    loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = 4;
      } else {
        selector1.textContent = randomNum();
        i++;
      }
    }, time);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, []);

  return (
    <div className="body">
      <link
        href="https://fonts.googleapis.com/css?family=Anton|Passion+One|PT+Sans+Caption"
        rel="stylesheet"
        type="text/css"
      />
      <div className="error">
        <div className="container-floud">
          <div
            className="col-xs-12 ground-color text-center"
            style={{ marginTop: "-350px", padding: "20px" }}
          >
            <div className="container-error-404">
              <div className="clip">
                <div className="shadow">
                  <span className="digit thirdDigit"></span>
                </div>
              </div>
              <div className="clip">
                <div className="shadow">
                  <span className="digit secondDigit"></span>
                </div>
              </div>
              <div className="clip">
                <div className="shadow">
                  <span className="digit firstDigit"></span>
                </div>
              </div>
              <div className="msg">
                Oops<span className="triangle"></span>
              </div>
            </div>
            <h2 className="h1">
              Sorry! Page not found{" "}
              <span className="redirect">
                {" "}
                <Link to="/" style={{ textDecoration: "none" }}>
                  Click to redirect
                </Link>{" "}
              </span>{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
