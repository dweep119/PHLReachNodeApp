import React, { useContext, useEffect, useState } from "react";
import Steps from "../components/Stepper/Steps";
import Select from 'react-select';
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
import { getData, getLocations, getAppointmentAndPatientData } from "../libs/api";
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
    const queryParams = new URLSearchParams(window.location.search);
    const locationId = queryParams.get('locationId');
    const appointmentId = queryParams.get('appointmentId');
    const patientId = queryParams.get('patientId');

    const [state, dispatch] = useContext(AppContext);
    const activeStep = _.find(steps_, { step_number: state.step });
    const [open, setOpen] = useState(false);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [openSelectLocationModal, setopenSelectLocationModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#940227eb");
    const [locationList, setlocationList] = useState([]);

    const [selectedLocation, setselectedLocation] = useState(null);
    const [selectedService, setselectedService] = useState(null);
    const [selectedDose, setselectedDose] = useState(null);
    const [selectedManufacturer, setselectedManufacturer] = useState(null);
    const [testList, settestList] = useState([]);

    const [step, setstep] = useState(1);

    const onPageLoad = () => {
      if (appointmentId && patientId) {
        fetchData(locationId);
        dispatch({
          type: "SET_STEP",
          step: 2
        });
      } else {
        if (localStorage.getItem('formData')) {
          setOpen(true);
        } else {
          setopenSelectLocationModal(true);
        }
      }
    }

    const onLocationContinueClick = () => {
      let obj = {
        selectedLocation
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...state.formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        }
      });
      setopenSelectLocationModal(false);
      setLoading(true);
      fetchData(selectedLocation.value);
    }

    const handleClose = () => {
      if (localStorage.getItem('formData')) {
        localStorage.removeItem('formData');
      }
      setOpen(false);
      setopenSelectLocationModal(true);
    }

    const handleAgree = () => {
      if (localStorage.getItem('formData')) {
        var bytes = CryptoJS.AES.decrypt(localStorage.getItem('formData'), process.env.REACT_APP_SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log('decryptedData: ', decryptedData);
        state.formData = decryptedData;
        if (decryptedData.selectedLocation && !decryptedData.selectedService) {
          setOpenServiceModal(true);
        }
      }
      setOpen(false);
    }

    const onPreviousClick = () => {
      setstep(step - 1);
    }

    const onNextClick = () => {
      setstep(step + 1);
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

    const fetchLocations = async () => {
      const result = await getLocations();
      if (result.status) {
        setlocationList(result.data.locationList);
        if (locationId) {
          const location = result.data.locationList.filter(item => item.value === locationId);
          if (location.length > 0) {
            setselectedLocation(location[0]);
          }
        }
      }
      setLoading(false);
    }

    const fetchAppointmentAndPatientData = async () => {
      const response = await getAppointmentAndPatientData(appointmentId, patientId);
      if (response.status) {
        const appData = response.data.appointmentData[0];
        const patientData = response.data.patientData[0];
        const insuranceData = response.data.insuranceData[0];
        setselectedService(appData.typeOfVisit);
        if (appData.typeOfVisit === "Vaccine") {
          setselectedDose(appData.dose);
          setselectedManufacturer(appData.manufacturer);
        }
        const question = [];
        response.data.questionData.map(item => {
          let object = {
            QuestionId: item.questionId,
            Answers: item.answers && item.answers.length > 1 ? item.answers.split(',') : [item.answers]
          }
          question.push(object);
        });
        dispatch({
          type: "SET_FORM_DATA",
          formData: {
            DateOfService: moment(appData.appointmentDate).format("MM/DD/YYYY"),
            TimeOfService: {
              time_12hr: moment(appData.slot, ["HH:mm:ss"]).format("h:mm A")
            },
            Contact: {
              FirstName: patientData.firstName,
              LastName: patientData.lastName,
              DateOfBirth: new Date(patientData.dob),
              StreetAddress1: patientData.address,
              Zipcode: patientData.zipCode,
              City: patientData.city,
              State: patientData.state,
              PhoneNumber: patientData.phone,
              EmailAddress: patientData.email,
              EmergencyContact: {
                ContactName: patientData.emergencyConatctName,
                ContactPhone: patientData.emergencyConatctNumber,
                ContactRelation: {
                  label: patientData.emergencyConatctRelation,
                  value: patientData.emergencyConatctRelation
                }
              },
              // is_verified: true,
              // is_verifiedMobile: true
            },
            Demographics: {
              PreferredLanguage: patientData.preferredLanguage,
              Race: patientData.race,
              Ethnicity: patientData.ethnicity,
              Gender: patientData.gender
            },
            Insurance: {
              HasInsurance: insuranceData.insuranceId ? true : false,
              PrimaryInsurance: {
                label: insuranceData.primaryCompany,
                value: insuranceData.primaryCompany
              },
              InsuranceId: insuranceData.insuranceId,
              GroupNumber: insuranceData.groupNumber,
              PlanName: insuranceData.planName,
              SameInsuredPerson: insuranceData.isRelationInsured,
              InsuredPersonRelation: insuranceData.isRelationInsured ? '' : insuranceData.patientInsuredRelation,
              InsuredPersonDOB: insuranceData.isRelationInsured ? '' : insuranceData.dob,
              InsuredPersonFirstName: insuranceData.isRelationInsured ? '' : insuranceData.firstName,
              InsuredPersonLastName: insuranceData.isRelationInsured ? '' : insuranceData.lastName,
              InsuredPersonMiddleName: insuranceData.isRelationInsured ? '' : insuranceData.middleName,
              InsuredPersonSuffix: insuranceData.isRelationInsured ? '' : insuranceData.suffix
            },
            MedicalQuestionnaire: question
          }
        });
      }
      setLoading(false);
    }

    const fetchData = async (locId) => {
      const response = await getData(locId);
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
        response.data.groupList.sort(function (a, b) {
          return new Date(a.index) - new Date(b.index);
        });
        response.data.questionList.sort(function (a, b) {
          return new Date(a.index) - new Date(b.index);
        });
        settestList(response.data.testList);
        dispatch({
          type: "SET_FORM_DATA",
          formData: {
            eventDates: eventDates,
            eventList: response.data.eventList,
            relationshipList: response.data.relationshipList,
            demographics: response.data.demographics[0],
            insuranceCompanyList: response.data.insuranceCompanyList,
            groupList: response.data.groupList,
            questionList: response.data.questionList,
            consentformList: response.data.consentformList
          }
        });
      }
      if (!appointmentId && !patientId) {
        setOpenServiceModal(true);
      }
      setLoading(false);
    }

    useEffect(() => {
      setColor("#940227eb");
      if (appointmentId && patientId) {
        fetchAppointmentAndPatientData()
      } else {
        fetchLocations();
      }
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
        <Header />
        <StepsFlex>
          <Steps />
        </StepsFlex>

        <div
          style={{
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
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
          {
            !open && !openServiceModal && !openSelectLocationModal ?
              <ComposedComponent {...props} />
              : null
          }
        </div>
        {/* </MainDesktopFlex> */}

        <Footer />
        {
          open ?
            < Dialog
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
            : openServiceModal ?
              <Dialog
                open={openServiceModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown={true}
                maxWidth='md'
                fullWidth={true}
              >
                <DialogTitle id="alert-dialog-title">{"What is the primary reason for your visit?"}</DialogTitle>
                <DialogContent>
                  <div id="alert-dialog-description">
                    {
                      step === 1 ?
                        <div>
                          {
                            testList[0].testName === 'Vaccine' ?
                              <div className="col-sm-6">
                                <div className="card cursor-pointer">
                                  <div className={(selectedService === 'Vaccine' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedService('Vaccine')}>
                                    <div className="float-left" style={{ lineHeight: "70px" }}>
                                      <div style={{ fontSize: "20px", fontWeight: "500" }}>Vaccine</div>
                                    </div>
                                    <div className="float-right">
                                      <img src={vaccinePath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              : testList[0].testName === 'PCR Test' ?
                                <div className="col-sm-6">
                                  <div className="card cursor-pointer">
                                    <div className={(selectedService === 'PCR Test' ? 'selectedCard ' : '') + "card-body"} onClick={() => {
                                      setselectedDose(null);
                                      setselectedManufacturer(null);
                                      setselectedService('PCR Test');
                                    }}>
                                      <div className="float-left" style={{ lineHeight: "70px" }}>
                                        <div style={{ fontSize: "20px", fontWeight: "500" }}>PCR Test</div>
                                      </div>
                                      <div className="float-right">
                                        <img src={pcrPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                : testList[0].testName === 'PCR Test' ?
                                  <div className="col-sm-6">
                                    <div className="card cursor-pointer">
                                      <div className={(selectedService === 'Rapid Test' ? 'selectedCard ' : '') + "card-body"} onClick={() => {
                                        setselectedDose(null);
                                        setselectedManufacturer(null);
                                        setselectedService('Rapid Test');
                                      }}>
                                        <div className="float-left" style={{ lineHeight: "70px" }}>
                                          <div style={{ fontSize: "20px", fontWeight: "500" }}>Rapid Test</div>
                                        </div>
                                        <div className="float-right">
                                          <img src={rapidPath} alt="img" style={{ display: "block", width: "70px", height: "70px", borderRadius: "40px" }}></img>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  : null
                          }
                        </div>
                        : null
                    }
                    {
                      selectedService === 'Vaccine' && step === 2 ?
                        <div className="d-flex">
                          <div className="col-sm-4">
                            <div className="card cursor-pointer">
                              <div className={(selectedDose === 'First Dose' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedDose('First Dose')}>
                                <div className="float-left" style={{ lineHeight: "70px" }}>
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>First Dose</div>
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
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>Second Dose</div>
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
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>Booster Dose</div>
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
                      selectedDose && step === 3 ?
                        <div className="d-flex">
                          <div className="col-sm-4">
                            <div className="card cursor-pointer">
                              <div className={(selectedManufacturer === 'Pfizer' ? 'selectedCard ' : '') + "card-body"} onClick={() => setselectedManufacturer('Pfizer')}>
                                <div className="float-left" style={{ lineHeight: "70px" }}>
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>Pfizer</div>
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
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>Moderna</div>
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
                                  <div style={{ fontSize: "20px", fontWeight: "500" }}>{"Johson&Johnson"}</div>
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
                  </div>
                </DialogContent>
                <DialogActions>
                  {
                    step !== 1 ?
                      <Button onClick={onPreviousClick} color="primary">
                        Previous
                      </Button>
                      : null
                  }
                  {
                    (selectedService && selectedService !== 'Vaccine') || step === 3 ?
                      <Button onClick={onContinueClick} color="primary" disabled={selectedService === 'Vaccine' ? !selectedManufacturer : false}>
                        Submit
                      </Button>
                      :
                      <Button onClick={onNextClick} color="primary" disabled={!selectedService || step === 2 ? !selectedDose : false}>
                        Next
                      </Button>
                  }
                </DialogActions>
              </Dialog>
              : openSelectLocationModal ?
                <Dialog
                  open={openSelectLocationModal}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  disableEscapeKeyDown={true}
                  maxWidth='md'
                  fullWidth={true}
                  scroll={'paper'}
                >
                  <DialogTitle id="alert-dialog-title">{"Please Select Location"}</DialogTitle>
                  <DialogContent>
                    <div style={{ height: "250px" }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={selectedLocation ? selectedLocation : null}
                        isClearable={false}
                        isSearchable={true}
                        onChange={(newValue) => setselectedLocation(newValue)}
                        name="location"
                        options={locationList}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={onLocationContinueClick} color="primary" disabled={!selectedLocation}>
                      Continue
                    </Button>
                  </DialogActions>
                </Dialog>
                : null
        }
      </div>
    );
  };

  return WithLayout;
};