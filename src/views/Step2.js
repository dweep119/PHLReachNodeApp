import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../store/app";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from "@material-ui/core/styles";
import CreatableSelect from 'react-select/creatable';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendOtp, verifyMobileOtp, verifyEmailOtp, documentsScan } from "../libs/api";
import { Alert } from '@material-ui/lab';
import { ClipLoader } from "react-spinners";
import { Html5QrcodeScannerPlugin } from '../components/html5QrcodeScannerPlugin';

const CryptoJS = require("crypto-js");

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
});

function Step2() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;

  const relationShipList = state.relationshipList;

  // The first commit of Material-UI
  const [selectedFrontPhoto, setselectedFrontPhoto] = useState(formData.Contact && formData.Contact.idProofFront ? formData.Contact.idProofFront : null);
  const [documentFrontFile, setdocumentFrontFile] = useState(null);
  const [documentRecognised, setdocumentRecognised] = useState(formData.Contact && formData.Contact.isDocumentRecognised ? formData.Contact.isDocumentRecognised : false);

  const [firstName, setfirstName] = useState(formData.Contact && formData.Contact.FirstName ? formData.Contact.FirstName : '');
  const [lastName, setlastName] = useState(formData.Contact && formData.Contact.LastName ? formData.Contact.LastName : '');
  const [selectedDOB, setselectedDOB] = useState(formData.Contact && formData.Contact.DateOfBirth ? formData.Contact.DateOfBirth : new Date('2014-08-18T21:11:54'));
  const [streetAddress1, setstreetAddress1] = useState(formData.Contact && formData.Contact.StreetAddress1 ? formData.Contact.StreetAddress1 : '');
  const [streetAddress2, setstreetAddress2] = useState(formData.Contact && formData.Contact.StreetAddress2 ? formData.Contact.StreetAddress2 : '');
  const [selectedZipcode, setselectedZipcode] = useState(formData.Contact && formData.Contact.Zipcode ? formData.Contact.Zipcode : '');
  const [selectedcity, setselectedcity] = useState(formData.Contact && formData.Contact.City ? formData.Contact.City : '');
  const [selectedstate, setselectedstate] = useState(formData.Contact && formData.Contact.State ? formData.Contact.State : '');
  const [phoneNumber, setphoneNumber] = useState(formData.Contact && formData.Contact.PhoneNumber ? formData.Contact.PhoneNumber : '');
  const [email, setemail] = useState(formData.Contact && formData.Contact.EmailAddress ? formData.Contact.EmailAddress : '');
  const [eContactName, seteContactName] = useState(formData.Contact && formData.Contact.EmergencyContact && formData.Contact.EmergencyContact.ContactName ? formData.Contact.EmergencyContact.ContactName : '');
  const [eContactPhone, seteContactPhone] = useState(formData.Contact && formData.Contact.EmergencyContact && formData.Contact.EmergencyContact.ContactPhone ? formData.Contact.EmergencyContact.ContactPhone : '');
  const [eContactRelation, seteContactRelation] = useState(formData.Contact && formData.Contact.EmergencyContact && formData.Contact.EmergencyContact.ContactRelation ? formData.Contact.EmergencyContact.ContactRelation : relationShipList[0]);

  const [isVerfied, setisVerfied] = useState(formData.Contact && formData.Contact.is_verified ? formData.Contact.is_verified : false);
  const [isVerfiedMobile, setisVerfiedMobile] = useState(formData.Contact && formData.Contact.is_verifiedMobile ? formData.Contact.is_verifiedMobile : false);
  const [emailOtp, setemailOtp] = useState(null);
  const [contactOtp, setcontactOtp] = useState(null);
  const [otpError, setotpError] = useState(null);
  const [resendOtp, setresendOtp] = useState(false);
  const [showVerifyModal, setshowVerifyModal] = useState(false);
  const [showVerifyMobileModal, setshowVerifyMobileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  let [color, setColor] = useState("#940227eb");

  useEffect(() => {
    setselectedFrontPhoto(formData.Contact.idProofFront);
  }, [formData])

  const handleDateChange = (date) => {
    setselectedDOB(date);
  };

  const onFileChangeFront = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile === undefined) {
      return;
    } else if (selectedFile.size > 10000000) {
      toast.error('Image size must be less than 10mb', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setdocumentFrontFile(selectedFile);
    const base64Image = await toBase64(selectedFile);
    setselectedFrontPhoto(base64Image);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const onSubmitDocuments = async () => {
    const form_data = new FormData();
    form_data.append('modelId', '50afe7a1-7b2f-4c62-bcaa-5532b67479e9');
    form_data.append('file', documentFrontFile);
    setLoading(true);
    const data = await documentsScan(form_data);
    console.log('data: ', data);
    if (data.message) {
      if (data && data.result && data.result.length > 0) {
        if (data.result[0].prediction && data.result[0].prediction.length > 0) {
          data.result[0].prediction.map(item => {
            if (item.label === "Name") {
              const str = item.ocr_text.split('\n');
              console.log('str: ', str);
              if (str && str.length > 0) {
                setfirstName(str[0]);
                setlastName(str[1]);
              }
            }
            if (item.label === "DOB") {
              let date = new Date(item.ocr_text)
              setselectedDOB(date);
            }
            if (item.label === "Sex") {
              formData.Demographics = {};
              if (item.ocr_text === "M") {
                formData.Demographics["Gender"] = "Male";
              } else if (item.ocr_text === "F") {
                formData.Demographics["Gender"] = "Female";
              }
            }
            if (item.label === "Address") {
              const str = item.ocr_text.split('\n');
              console.log('str: ', str);
              if (str && str.length > 0) {
                setstreetAddress1(str[0]);
              }
              setselectedZipcode(item.ocr_text.slice(-5));
              const event = {
                target: {
                  value: item.ocr_text.slice(-5)
                }
              }
              onZipCodeChange(event);
            }
          });
        }
      }
      setLoading(false);
      setdocumentRecognised(true);
    }
  }

  const goToSummary = () => {
    if (selectedFrontPhoto && firstName && lastName && selectedDOB && streetAddress1 &&
      selectedstate && selectedcity && selectedZipcode && phoneNumber && email &&
      eContactName && eContactPhone && eContactRelation) {
      let obj = {
        "Contact": {
          "idProofFront": selectedFrontPhoto,
          "isDocumentRecognised": true,
          "FirstName": firstName,
          "LastName": lastName,
          "DateOfBirth": selectedDOB,
          "StreetAddress1": streetAddress1,
          "StreetAddress2": streetAddress2,
          "Zipcode": selectedZipcode,
          "City": selectedcity,
          "State": selectedstate,
          "PhoneNumber": phoneNumber,
          "EmailAddress": email,
          "EmergencyContact": {
            "ContactName": eContactName,
            "ContactPhone": eContactPhone,
            "ContactRelation": eContactRelation
          },
          "is_verifiedMobile": true,
          "is_verified": true,
        }
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        }
      });
      dispatch({
        type: "SET_STEP",
        step: 7
      });
      return;
    } else {
      toast.error("Please fill mandatory fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const onZipCodeChange = async (e) => {
    const { value } = e.target;
    setselectedZipcode(value);
    // if (value.length == 5) {
    const data = await fetch(`https://ziptasticapi.com/${value}`);
    const _data = await data.json();
    if (_data && !_data.error) {
      console.log('_data.city: ', _data.city);
      setselectedcity(_data.city);
      setselectedstate(_data.state);
    } else {
      setselectedcity('');
      setselectedstate('');
    }
    // }
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.groupEnd();
  };

  const handleNext = () => {
    if (selectedFrontPhoto && firstName && lastName && selectedDOB && streetAddress1 &&
      selectedstate && selectedcity && selectedZipcode && phoneNumber && email &&
      eContactName && eContactPhone && eContactRelation) {
      let obj = {
        "Contact": {
          "idProofFront": selectedFrontPhoto,
          "isDocumentRecognised": true,
          "FirstName": firstName,
          "LastName": lastName,
          "DateOfBirth": selectedDOB,
          "StreetAddress1": streetAddress1,
          "StreetAddress2": streetAddress2,
          "Zipcode": selectedZipcode,
          "City": selectedcity,
          "State": selectedstate,
          "PhoneNumber": phoneNumber,
          "EmailAddress": email,
          "EmergencyContact": {
            "ContactName": eContactName,
            "ContactPhone": eContactPhone,
            "ContactRelation": eContactRelation
          },
          "is_verifiedMobile": true,
          "is_verified": true,
        }
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        }
      });
      dispatch({
        type: "SET_STEP",
        step: state.step + 1
      });
      return;
    } else {
      toast.error("Please fill mandatory fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleBack = () => {
    dispatch({
      type: "SET_STEP",
      step: state.step - 1
    });
    return;
  };

  const handleVerifyMobileClick = async () => {

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Enter valid Phone number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setresendOtp(false);
    const variables = {
      mobile: phoneNumber
    };

    const response = await sendOtp(variables);
    if (response.success) {

      setshowVerifyMobileModal(true);
      setTimeout(() => {
        setresendOtp(true);
      }, 15000);
    } else {

      toast.error(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // setotpError(null);
    // setisVerfiedMobile(true);
    // setisEdit(false);
    // setshowVerifyMobileModal(false);

  };

  const onVerifyMobileOTP = async () => {
    const variables = {
      mobile: {
        mobile: phoneNumber,
        otp: contactOtp,
      }
    };

    const response = await verifyMobileOtp(variables);
    if (!response.success) {
      setotpError("Invalid OTP. Please retry.");
      toast.error("Invalid OTP. Please retry.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setotpError(null);
      setisVerfiedMobile(true);
      // setisEdit(false);
      setshowVerifyMobileModal(false);
    }
  };

  const handleVerifyClick = async () => {
    // eslint-disable-next-line
    let mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailformat.test(email)) {
      setemail(email)
    } else {
      toast.error("Enter valid Email address.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setresendOtp(false);
    const variables = {
      email: email,
    };
    const response = await sendOtp(variables);
    if (response.success) {

      setshowVerifyModal(true);
      setTimeout(() => {
        setresendOtp(true);
      }, 15000);
    } else {

      toast.error(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // setotpError(null);
    // setisVerfied(true);
    // setisEdit(false);
    // setshowVerifyModal(false);
  };

  const onVerifyOTP = async () => {
    const variables = {
      email: {
        email: email,
        otp: emailOtp,
      },
    };

    const response = await verifyEmailOtp(variables);
    if (!response.success) {
      setotpError("Invalid OTP. Please retry.");
      toast.error("Invalid OTP. Please retry.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setotpError(null);
      setisVerfied(true);
      // setisEdit(false);
      setshowVerifyModal(false);
    }
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    // handle the scanned code as you like, for example:
    alert(decodedText);
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.log(`Code scan error = ${error}`);
  }

  const formatsToSupport = [
    window.Html5QrcodeSupportedFormats.QR_CODE = 0,
    window.Html5QrcodeSupportedFormats.AZTEC,
    window.Html5QrcodeSupportedFormats.CODABAR,
    window.Html5QrcodeSupportedFormats.CODE_39,
    window.Html5QrcodeSupportedFormats.CODE_93,
    window.Html5QrcodeSupportedFormats.CODE_128,
    window.Html5QrcodeSupportedFormats.DATA_MATRIX,
    window.Html5QrcodeSupportedFormats.MAXICODE,
    window.Html5QrcodeSupportedFormats.ITF,
    window.Html5QrcodeSupportedFormats.EAN_13,
    window.Html5QrcodeSupportedFormats.EAN_8,
    window.Html5QrcodeSupportedFormats.PDF_417,
    window.Html5QrcodeSupportedFormats.RSS_14,
    window.Html5QrcodeSupportedFormats.RSS_EXPANDED,
    window.Html5QrcodeSupportedFormats.UPC_A,
    window.Html5QrcodeSupportedFormats.UPC_E,
    window.Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
  ];

  const classes = useStyles();

  if (loading) return <div style={{ textAlign: "center" }}><ClipLoader color={color} loading={loading} size={100} /></div>;
  
  return (
    <div className="App">
      <ValidatorForm
        onError={errors => console.log(errors)}
        onSubmit={handleNext}
      >
        {/* <Html5QrcodeScannerPlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          formatsToSupport={formatsToSupport}
          qrCodeSuccessCallback={onScanSuccess}
          qrCodeErrorCallback={onScanFailure} /> */}
        <div className="row">
          <div className="mb-5 overlap-group2 col-lg-10  col-md-10 col-10">
            <label className="first-name-1 roboto-medium-black-24px w-100">Photo of ID (Driver's License)
            </label>
            {
              selectedFrontPhoto ?
                <div>
                  <div className="d-flex">
                    <div style={{ position: "relative", height: 200, width: 300 }}>
                      <img src={selectedFrontPhoto} style={{ display: "block", width: "100%", height: "100%" }} alt="img"></img>
                      <div className="mr-1" style={{ position: "absolute", right: "0px", top: "5px", cursor: "pointer" }}>
                        <i className="fa fa-times-circle-o fa-lg" aria-hidden="true" onClick={() => { setselectedFrontPhoto(null); setdocumentRecognised(false); setdocumentFrontFile(null) }}></i>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
                  placeholder="Street Address" onChange={onFileChangeFront} accept="image/x-png,image/gif,image/jpeg" />
            }
          </div>
          <div className="mb-5 overlap-group2 col-lg-2  col-md-2 col-2">
            <label className="first-name-1 roboto-medium-black-24px w-100" style={{ height: "34px" }}></label>
            {!documentRecognised ?
              <div className="">
                <button className={"border-1-4px-mercury p30h40 " + (!documentFrontFile ? "disabled" : '')} style={{ lineHeight: '36px' }}
                  disabled={!documentFrontFile}
                  onClick={() => {
                    onSubmitDocuments();
                  }}>Recognise</button>
              </div>
              : null
            }
          </div>
        </div>
        {
          documentRecognised ?
            <div>
              <div className="row">
                <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">First Name
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setfirstName(event.target.value)}
                    InputProps={{ classes }}
                    value={firstName}
                    validators={['required', 'matchRegexp:^[a-zA-Z ]*$', 'minStringLength:2', 'maxStringLength:50']}
                    errorMessages={['This field is required', 'The field First Name should contain alphabets only.', 'The field First Name with a length of min 2', 'The field First Name with a length of max 50']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="fname" name="lastname"
              placeholder="First Name" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Last Name
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setlastName(event.target.value)}
                    InputProps={{ classes }}
                    value={lastName}
                    validators={['required', 'matchRegexp:^[a-zA-Z ]*$', 'minStringLength:2', 'maxStringLength:50']}
                    errorMessages={['This field is required', 'The field Last Name should contain alphabets only.', 'The field Last Name with a length of min 2', 'The field Last Name with a length of max 50']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="lname" name="lastname"
              placeholder="Last Name" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Date of Birth
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={selectedDOB}
                      // disableFuture={true}
                      variant="inline"
                      maxDate={Date()}
                      minDate={"01/01/1921"}
                      onChange={handleDateChange}
                      InputProps={{ classes }}
                      autoOk={true}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="DOB" name="lastname"
            placeholder="Date of Birth" /> */}
                </div>
              </div>
              <div className="row">
                <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Street Address
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setstreetAddress1(event.target.value)}
                    InputProps={{ classes }}
                    value={streetAddress1}
                    validators={['required', 'maxStringLength:250']}
                    errorMessages={['This field is required', 'The field Street Address with a length of max 250']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
              placeholder="Street Address" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Street Address 2
                  </label>
                  <TextValidator
                    onChange={(event) => setstreetAddress2(event.target.value)}
                    InputProps={{ classes }}
                    value={streetAddress2}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
              placeholder="Street Address 2" /> */}
                </div>
              </div>
              <div className="row">
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Zipcode
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => onZipCodeChange(event)}
                    InputProps={{ classes }}
                    value={selectedZipcode}
                    validators={['required', 'matchRegexp:^[0-9]*$', 'maxStringLength:15']}
                    errorMessages={['This field is required', 'Please enter a valid Zipcode', 'Please enter a valid Zipcode']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
              placeholder="Zipcode" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">City
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setselectedcity(event.target.value)}
                    InputProps={{ classes }}
                    value={selectedcity}
                    validators={['required', 'maxStringLength:50']}
                    errorMessages={['This field is required', 'The field City with a length of max 50']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="city" name="lastname"
              placeholder="City" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">State
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setselectedstate(event.target.value)}
                    InputProps={{ classes }}
                    value={selectedstate}
                    validators={['required', 'maxStringLength:50']}
                    errorMessages={['This field is required', 'The field State with a length of max 50']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="state" name="lastname"
              placeholder="State" /> */}
                </div>
              </div>
              <div className="row">
                <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Phone Number
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <div className="w-100 d-flex mt-2">
                    <PhoneInput
                      defaultCountry="US"
                      label="Enter phone number"
                      // placeholder="Enter phone number"
                      value={phoneNumber}
                      style={{
                        width: "100%",
                      }}
                      countries={['US', 'IN']}
                      //   onChange={(phone) => this.onPhoneChange(phone)}
                      onChange={setphoneNumber}
                      disabled={isVerfiedMobile}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleVerifyMobileClick();
                        }
                      }}
                    />
                    {
                      isVerfiedMobile ?
                        <i className="fa fa-check-circle-o check ml-3" style={{ fontSize: 25, color: "green", margin: "auto" }}></i>
                        :
                        <div className="verify-button cursor-pointer" onClick={() => {
                          handleVerifyMobileClick();
                        }}>
                          <div className="verify roboto-bold-white-18px">Verify</div>
                        </div>
                    }
                  </div>
                </div>
                <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Email Address
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <div className="w-100 d-flex mt-2 phoneEmail">
                    <TextValidator
                      onChange={(event) => setemail(event.target.value)}
                      InputProps={{ classes }}
                      value={email}
                      disabled={isVerfied}
                      validators={['required', 'isEmail']}
                      errorMessages={['This field is required', 'Email is not valid']}
                    />
                    {/* <input className="overlap-group first-name-1 w-100 border-1px-mist-gray" id="email" name="lastname"
                placeholder="Email Address" /> */}
                    {
                      isVerfied ?
                        <i className="fa fa-check-circle-o check ml-3" style={{ fontSize: 25, color: "green", margin: "auto" }}></i>
                        :
                        <div className="verify-button cursor-pointer" onClick={() => {
                          handleVerifyClick();
                        }}>
                          <div className="verify roboto-bold-white-18px">Verify</div>
                        </div>
                    }
                  </div>
                </div>
              </div>
              <div>
                <hr />
                <div className="mt-5 mb-5 text-7 roboto-normal-black-36px">Emergency Contact Information</div>
              </div>
              <div className="row">
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Name
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => seteContactName(event.target.value)}
                    InputProps={{ classes }}
                    value={eContactName}
                    validators={['required', 'matchRegexp:^[a-zA-Z ]*$', 'minStringLength:2', 'maxStringLength:50']}
                    errorMessages={['This field is required', 'The field Emergency Contact Name should contain alphabets only.', 'The field Emergency Contact Name with a length of min 2', 'The field Emergency Contact Name with a length of max 50']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ename" name="lastname"
              placeholder="Emergency Contact Name" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Phone
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <PhoneInput
                    defaultCountry="US"
                    label="Enter phone number"
                    value={eContactPhone}
                    style={{
                      width: "100%",
                    }}
                    countries={['US', 'IN']}
                    onChange={seteContactPhone}
                  />
                  {/* <TextValidator
              onChange={(event) => seteContactPhone(event.target.value)}
              InputProps={{ classes }}
              value={eContactPhone}
              validators={['required', 'matchRegexp:^[0-9]{10}$']}
              errorMessages={['This field is required', 'Please enter valid Emergency Contact Phone']}
            /> */}
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone" name="lastname"
              placeholder="Emergency Contact Phone" /> */}
                </div>
                <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Relation
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <CreatableSelect
                    defaultValue={eContactRelation}
                    onChange={(newValue) => seteContactRelation(newValue)}
                    onInputChange={handleInputChange}
                    options={relationShipList}
                  />
                  {/* <TextValidator
              onChange={(event) => seteContactRelation(event.target.value)}
              InputProps={{ classes }}
              value={eContactRelation}
              validators={['required', 'matchRegexp:^[a-zA-Z ]*$']}
              errorMessages={['This field is required', 'The field Emergency Contact Relation should contain alphabets only.']}
            /> */}
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone2" name="lastname"
              placeholder="Emergency Contact Relation" /> */}
                </div>
              </div>
            </div>
            : null
        }
        <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
          <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
          <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
          {
            formData && formData.ConsentForms && formData.ConsentForms.Signature ?
              <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
              : null
          }
        </div>

        <Dialog
          open={showVerifyMobileModal}
          onClose={() => setshowVerifyMobileModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">{"Prism Health Lab Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* Verify phone number */}
              <div className="mb-3 overlap-group2 col-lg-12 col-md-12 col-12 pl-0 pr-0">
                <label className="first-name-1 roboto-medium-black-18px-22 w-100">{`OTP On Phone Number: ${phoneNumber}`}
                  <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                </label>
                <TextValidator
                  onChange={(event) => setcontactOtp(event.target.value)}
                  InputProps={{ classes }}
                  value={contactOtp}
                />
                {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone" name="lastname"
              placeholder="Emergency Contact Phone" /> */}
              </div>
              {otpError && (
                <Alert severity="error">
                  <strong>Invalid OTP</strong> — Please Retry
                </Alert>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              resendOtp && (
                <Button onClick={handleVerifyMobileClick} color="primary">
                  Resend OTP
                </Button>
              )}
            <Button disabled={!contactOtp} positive onClick={() => onVerifyMobileOTP()} color="primary">
              Verify
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showVerifyModal}
          onClose={() => setshowVerifyModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">{"Prism Health Lab Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="mb-3 overlap-group2 col-lg-12 col-md-12 col-12 pl-0 pr-0">
                <label className="first-name-1 roboto-medium-black-18px-22 w-100">{`OTP On Email: ${email}`}
                  <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                </label>
                <TextValidator
                  onChange={(event) => setemailOtp(event.target.value)}
                  InputProps={{ classes }}
                  value={emailOtp}
                />
                {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone" name="lastname"
              placeholder="Emergency Contact Phone" /> */}
              </div>
              {otpError && (
                <Alert severity="error">
                  <strong>Invalid OTP</strong> — Please Retry
                </Alert>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              resendOtp && (
                <Button onClick={handleVerifyClick} color="primary">
                  Resend OTP
                </Button>
              )}
            <Button disabled={!emailOtp} positive onClick={() => onVerifyOTP()} color="primary">
              Verify
            </Button>
          </DialogActions>
        </Dialog>
      </ValidatorForm>
      <ToastContainer />
    </div>
  );
}

export default Step2;