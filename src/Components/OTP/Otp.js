import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "react-phone-input-2/lib/style.css";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
const Otp = () => {
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xl");
  let location = useLocation();

  const handleClose = () => {
    // setOpen(false);
  };
  let otp1Focus = useRef(null);
  let otp2Focus = useRef(null);
  let otp3Focus = useRef(null);
  let otp4Focus = useRef(null);
  let otp5Focus = useRef(null);
  let otp6Focus = useRef(null);

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  let { otp1, otp2, otp3, otp4, otp5, otp6 } = otp;

  useEffect(() => {
    if (otp1.length > 0) {
      otp2Focus.current.focus();
    }
    if (otp2.length > 0) {
      otp3Focus.current.focus();
    }
    if (otp3.length > 0) {
      otp4Focus.current.focus();
    }
    if (otp4.length > 0) {
      otp5Focus.current.focus();
    }
    if (otp5.length > 0) {
      otp6Focus.current.focus();
    }
  }, [otp]);
  let handelChange = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  let verifyOtp = () => {
    let convertedCode = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    if (convertedCode.length === 6) {
      setLoading(true);
      const code = convertedCode;
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          setLoading(false);

          alert("User is varified");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert(" Enter correct code");
          setLoading(false);
        });
    }
  };

  return (
    <div id="login-background">
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#F5EBE1",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle id="max-width-dialog-title">
          <div className="alig-center">
            <img src={logo} />
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
            <p style={{ textAlign: "center" }}>
              we are sending your code to{" "}
              <span style={{ color: "green" }}>
                <b>+{location.state.mobile}</b>
              </span>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <input
                maxLength="1"
                name="otp1"
                className="otpField"
                type="number"
                ref={otp1Focus}
                onChange={handelChange}
                value={otp1}
              />
              <input
                maxLength="1"
                name="otp2"
                className="otpField"
                type="number"
                ref={otp2Focus}
                onChange={handelChange}
                value={otp2}
              />
              <input
                maxLength="1"
                name="otp3"
                className="otpField"
                type="number"
                ref={otp3Focus}
                onChange={handelChange}
                value={otp3}
              />
              <input
                maxLength="1"
                name="otp4"
                className="otpField"
                type="number"
                ref={otp4Focus}
                onChange={handelChange}
                value={otp4}
              />
              <input
                maxLength="1"
                name="otp5"
                className="otpField"
                type="number"
                ref={otp5Focus}
                onChange={handelChange}
                value={otp5}
              />
              <input
                maxLength="1"
                name="otp6"
                value={otp6}
                className="otpField"
                type="number"
                ref={otp6Focus}
                onChange={handelChange}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              className="insideButton"
              onClick={verifyOtp}
            >
              Verify Otp
            </Button>
          </div>
          <div
            style={{
              display: loading ? "flex" : "none",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Otp;
