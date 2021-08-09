import React, { useContext, useEffect } from "react";
import Steps from "../components/Stepper/Steps";
import {
  StepsFlex
} from "../components/styledComponents";
import Footer from "../components/Footers/Footer";
import Header from "../components/Headers/Header";
import { AppContext } from "../store/app";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { getData } from "../libs/api";

// import MobileHeader from "./MobileHeader";
import _ from "lodash";
import { Steps as steps_ } from "../utils/steps";
const CryptoJS = require("crypto-js");

// eslint-disable-next-line
export default (ComposedComponent, title, options) => {
  const WithLayout = (props) => {

    const [state] = useContext(AppContext);
    const activeStep = _.find(steps_, { step_number: state.step });
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [color, setColor] = React.useState("#940227eb");

    const onPageLoad = () => {
      if (localStorage.getItem('formData')) {
        setOpen(true);
      }
    }

    const handleClose = () => {
      if (localStorage.getItem('formData')) {
        localStorage.removeItem('formData');
      }
      setOpen(false);
    }

    const handleAgree = () => {
      if (localStorage.getItem('formData')) {
        var bytes = CryptoJS.AES.decrypt(localStorage.getItem('formData'), process.env.REACT_APP_SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        state.formData = decryptedData;
      }
      setOpen(false);
    }

    useEffect(() => {
      setColor("#940227eb");
      async function fetchData() {
        const response = await getData();
        console.log('response: ', response);
        if (response.status) {
          let eventDates = [];
          // eslint-disable-next-line
          response.data.eventList.map(item => {
            let object = {
              "key": item.eventDate,
              "value": moment(item.eventDate).format("MMMM D, YYYY")
            };
            eventDates.push(object);
          });
          state.eventDates = eventDates;
          state.eventList = response.data.eventList;
          state.locationList = response.data.locationList;
          state.relationshipList = response.data.relationshipList;
          state.demographics = response.data.demographics[0];
          state.insuranceCompanyList = response.data.insuranceCompanyList;
          state.groupList = response.data.groupList;
          state.questionList = response.data.questionList;
        }
        setLoading(false);
      }
      fetchData();
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      window.onload = function () {
        onPageLoad();
        return "";
      }
    })
    //     const onPrevClick = () => {
    //       if (state.step > 1) {
    //         dispatch({ type: "SET_STEP", step: state.step - 1 });
    //       }
    //     };

    // const contextRef = React.createRef();
    if (loading) return <div style={{ textAlign: "center" }}><ClipLoader color={color} loading={loading} size={100} /></div>;
    return (
      <div className="container">

        {/* <MainDesktopFlex className="desktop" style={{ paddingTop: "0px !important", borderTop: "none !important" }}> */}
        {/* {activeStep.step_number != 9 && <div className="ui container"> */}
        <Header />
        <StepsFlex>
          <Steps />
        </StepsFlex>
        {/* </div>} */}

        <div
          style={{
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* {activeStep.step_number !== 9 &&  */}
          <div
            className="step-title"
            style={{ height: "100px" }}
          >
            <h1
              className="text-center roboto-normal-dark-tan-48px"
              style={{
                // borderBottom: "1px solid #959595",
                // padding: "10px 30px"
              }}
            >
              {activeStep.name}
            </h1>
          </div>
          {/* } */}
          <ComposedComponent {...props} />
        </div>
        {/* </MainDesktopFlex> */}

        {/* <MainMobileFlex className="mobile">
          <MobileHeader activeStep={activeStep} onPrevClick={onPrevClick} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              flexDirection: "column",
              flex: 1,
              paddingTop: "88px",
            }}
          >
            <ComposedComponent {...props} />
          </div>
        </MainMobileFlex> */}
        <Footer />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">{"Prism Health Lab Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to Continue or Book a new Appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Book New Appointment
            </Button>
            <Button onClick={handleAgree} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  };

  return WithLayout;
};