import React, { useState } from "react";
import "./login.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router";
import logo from "../../assets/images/logo.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const Login = () => {
  let history = useHistory();

  const handleClose = () => {
    // setOpen(false);
  };

  const [phone, setPhone] = useState("");

  let handelChange = (e) => {
    setPhone(e);
  };
  const [loading, setLoading] = useState(false);

  const [captchaStatus, setCaptchaStatus] = useState(false);

  let configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          setCaptchaStatus(true);
        },
        defaultCountry: "US",
      }
    );
  };

  let onSignInSubmit = () => {
    if (!captchaStatus) {
      configureCaptcha();
    }
    setLoading(true);

    const phoneNumber = "+" + phone;
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        history.push({
          pathname: "/otp",

          state: { mobile: phone },
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div id="login-background">
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={true}
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
          <div className="alig-center">
            <p className="left_p_phone"> Type </p>

            <p className="right_p_phone"> your phone number</p>
          </div>
          <div id="recptcha-container"></div>
          <div className="phone_section">
            <div>
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={(phone) => handelChange(phone)}
              />
            </div>

            <div className="button_div">
              <Button
                variant="contained"
                className="insideButton"
                onClick={onSignInSubmit}
              >
                Send Otp
              </Button>
            </div>
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

export default Login;
