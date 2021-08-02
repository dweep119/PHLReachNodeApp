import React, { useContext, useState } from 'react';
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

  const relationShipList = state.emergencyRelationShipList;

  // The first commit of Material-UI
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

  const handleDateChange = (date) => {
    setselectedDOB(date);
  };

  const goToSummary = () => {
    if (firstName && lastName && selectedDOB && streetAddress1 &&
      selectedstate && selectedcity && selectedZipcode && phoneNumber && email &&
      eContactName && eContactPhone && eContactRelation) {
      let obj = {
        "Contact": {
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
          }
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
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleNext = () => {
    if (firstName && lastName && selectedDOB && streetAddress1 &&
      selectedstate && selectedcity && selectedZipcode && phoneNumber && email &&
      eContactName && eContactPhone && eContactRelation) {
      let obj = {
        "Contact": {
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
          }
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
  const classes = useStyles();
  return (
    <div className="App">
      <ValidatorForm
        onError={errors => console.log(errors)}
        onSubmit={handleNext}
      >
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
            <div className="w-100 d-flex mt-2 phoneEmail">
              <TextValidator
                onChange={(event) => setphoneNumber(event.target.value)}
                InputProps={{ classes }}
                value={phoneNumber}
                validators={['required', 'matchRegexp:^[0-9]{10}$']}
                errorMessages={['This field is required', 'Please enter valid Phone Number']}
              />
              {/* <input className="overlap-group first-name-1 w-100 border-1px-mist-gray" id="phone" name="lastname"
                placeholder="Phone Number" /> */}
              <div className="verify-button">
                <div className="verify roboto-bold-white-18px">Verify</div>
              </div>
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
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
              {/* <input className="overlap-group first-name-1 w-100 border-1px-mist-gray" id="email" name="lastname"
                placeholder="Email Address" /> */}
              <div className="verify-button">
                <div className="verify roboto-bold-white-18px">Verify</div>
              </div>
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
            <TextValidator
              onChange={(event) => seteContactPhone(event.target.value)}
              InputProps={{ classes }}
              value={eContactPhone}
              validators={['required', 'matchRegexp:^[0-9]{10}$']}
              errorMessages={['This field is required', 'Please enter valid Emergency Contact Phone']}
            />
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

        <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
          <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
          <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
          {
            formData && formData.ConsentForms && formData.ConsentForms.Signature ?
              <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
              : null
          }
        </div>
      </ValidatorForm>
      <ToastContainer />
    </div>
  );
}

export default Step2;