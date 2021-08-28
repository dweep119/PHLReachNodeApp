import React, { useContext, useEffect, useState } from "react";
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
import vaccinePath from "../assets/img/vaccine_image.jpg";
import pcrPath from "../assets/img/pcr_test.jpg";
import rapidPath from "../assets/img/rapid_test.jpg";
import firstDosePath from "../assets/img/first-dose.png";
import secondDosePath from "../assets/img/second-dose.png";
import boosterDosePath from "../assets/img/booster-dose.jpg";
import pfizerPath from "../assets/img/pfizer_logo.jpg";
import modernaPath from "../assets/img/moderna_logo.jpg";
import jnjPath from "../assets/img/johnson&johnson_logo.png";

// import MobileHeader from "./MobileHeader";
import _ from "lodash";
import { Steps as steps_ } from "../utils/steps";
const CryptoJS = require("crypto-js");

// eslint-disable-next-line
export default (ComposedComponent, title, options) => {
  const WithLayout = (props) => {

    const [state, dispatch] = useContext(AppContext);
    const activeStep = _.find(steps_, { step_number: state.step });
    const [open, setOpen] = React.useState(false);
    const [openServiceModal, setOpenServiceModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [color, setColor] = React.useState("#940227eb");

    const [selectedService, setselectedService] = useState(null);
    const [selectedDose, setselectedDose] = useState(null);
    const [selectedManufacturer, setselectedManufacturer] = useState(null);

    const onPageLoad = () => {
      if (localStorage.getItem('formData')) {
        setOpen(true);
      } else {
        setOpenServiceModal(true);
      }
    }

    const handleClose = () => {
      if (localStorage.getItem('formData')) {
        localStorage.removeItem('formData');
      }
      setOpen(false);
      setOpenServiceModal(true);
    }

    const handleAgree = () => {
      if (localStorage.getItem('formData')) {
        var bytes = CryptoJS.AES.decrypt(localStorage.getItem('formData'), process.env.REACT_APP_SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log('decryptedData: ', decryptedData);
        state.formData = decryptedData;
      }
      setOpen(false);
    }

    const onContinueClick = () => {
      let obj = {
        selectedService,
        selectedDose,
        selectedManufacturer
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...state.formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        }
      });
      setOpenServiceModal(false);
    }

    useEffect(() => {
      setColor("#940227eb");
      async function fetchData() {
        const response = await getData();
        if (response.status) {
          let eventDates = [];
          // eslint-disable-next-line
          response.data.eventList.map(item => {
            let object = {
              "key": item.eventDate,
              "value": moment(new Date(item.eventDate)).format("MMMM D, YYYY")
            };
            eventDates.push(object);
          });
          eventDates.sort(function (a, b) {
            return new Date(a.key) - new Date(b.key);
          });
          response.data.groupList.sort(function (a, b) {
            return new Date(a.index) - new Date(b.index);
          });
          response.data.questionList.sort(function (a, b) {
            return new Date(a.index) - new Date(b.index);
          });
          state.eventDates = eventDates;
          state.eventList = response.data.eventList;
          state.locationList = response.data.locationList;
          state.relationshipList = response.data.relationshipList;
          state.demographics = response.data.demographics[0];
          state.insuranceCompanyList = response.data.insuranceCompanyList;
          state.groupList = response.data.groupList;
          state.questionList = response.data.questionList;
          state.consentformList = response.data.consentformList;
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
    if (loading) return <div style={{ position: "fixed", top: "50%", left: "50%" }}><ClipLoader color={color} loading={loading} size={100} /></div>;
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
        <Dialog
          open={openServiceModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
          maxWidth='md'
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{"Prism Health Lab Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className={(selectedService ? 'container1 ' : '') + "row mb-3"}>
                <div className="col-sm-4">
                  <div className="card cursor-pointer">
                    <div className={(selectedService === 'Vaccine' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedService('Vaccine')}>
                      <div className="float-left" style={{ lineHeight: "70px" }}>
                        <div style={{ fontSize: "20px" }}>Vaccine</div>
                      </div>
                      <div className="float-right">
                        <img src={vaccinePath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card cursor-pointer">
                    <div className={(selectedService === 'PCR Test' ? 'selectedCard ' : '') + "card-body"} onClick={() => {
                      setselectedDose(null);
                      setselectedManufacturer(null);
                      setselectedService('PCR Test');
                    }}>
                      <div className="float-left" style={{ lineHeight: "70px" }}>
                        <div style={{ fontSize: "20px" }}>PCR Test</div>
                      </div>
                      <div className="float-right">
                        <img src={pcrPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card cursor-pointer">
                    <div className={(selectedService === 'Rapid Test' ? 'selectedCard ' : '') + "card-body"} onClick={() => {
                      setselectedDose(null);
                      setselectedManufacturer(null);
                      setselectedService('Rapid Test');
                    }}>
                      <div className="float-left" style={{ lineHeight: "70px" }}>
                        <div style={{ fontSize: "20px" }}>Rapid Test</div>
                      </div>
                      <div className="float-right">
                        <img src={rapidPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                selectedService === 'Vaccine' ?
                  <div className={(selectedDose ? 'container2 ' : '') + "row mb-3"}>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedDose === 'First Dose' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedDose('First Dose')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>First Dose</div>
                          </div>
                          <div className="float-right">
                            <img src={firstDosePath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedDose === 'Second Dose' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedDose('Second Dose')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>Second Dose</div>
                          </div>
                          <div className="float-right">
                            <img src={secondDosePath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedDose === 'Booster Dose' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedDose('Booster Dose')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>Booster Dose</div>
                          </div>
                          <div className="float-right">
                            <img src={boosterDosePath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
              }
              {
                selectedDose ?
                  <div className={(selectedManufacturer ? 'container3 ' : '') + "row mb-3"}>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedManufacturer === 'Pfizer' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedManufacturer('Pfizer')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>Pfizer</div>
                          </div>
                          <div className="float-right">
                            <img src={pfizerPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedManufacturer === 'Moderna' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedManufacturer('Moderna')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>Moderna</div>
                          </div>
                          <div className="float-right">
                            <img src={modernaPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="card cursor-pointer">
                        <div className={(selectedManufacturer === 'Johson&Johnson' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedManufacturer('Johson&Johnson')}>
                          <div className="float-left" style={{ lineHeight: "70px" }}>
                            <div style={{ fontSize: "20px" }}>{"Johson&Johnson"}</div>
                          </div>
                          <div className="float-right">
                            <img src={jnjPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onContinueClick} color="primary" disabled={!selectedService || (selectedService === 'Vaccine' && !selectedManufacturer)}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  };

  return WithLayout;
};