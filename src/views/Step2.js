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
  // The first commit of Material-UI
  const [firstName, setfirstName] = useState(formData.firstName ? formData.firstName : '');
  const [lastName, setlastName] = useState(formData.lastName ? formData.lastName : '');
  const [selectedDOB, setselectedDOB] = useState(formData.selectedDOB ? formData.selectedDOB : new Date('2014-08-18T21:11:54'));
  const [streetAddress1, setstreetAddress1] = useState(formData.streetAddress1 ? formData.streetAddress1 : '');
  const [streetAddress2, setstreetAddress2] = useState(formData.streetAddress2 ? formData.streetAddress2 : '');
  const [selectedstate, setselectedstate] = useState(formData.selectedstate ? formData.selectedstate : '');
  const [selectedcity, setselectedcity] = useState(formData.selectedcity ? formData.selectedcity : '');
  const [selectedZipcode, setselectedZipcode] = useState(formData.selectedZipcode ? formData.selectedZipcode : '');
  const [phoneNumber, setphoneNumber] = useState(formData.phoneNumber ? formData.phoneNumber : '');
  const [email, setemail] = useState(formData.email ? formData.email : '');
  const [eContactName, seteContactName] = useState(formData.eContactName ? formData.eContactName : '');
  const [eContactPhone, seteContactPhone] = useState(formData.eContactPhone ? formData.eContactPhone : '');
  const [eContactRelation, seteContactRelation] = useState(formData.eContactRelation ? formData.eContactRelation : '');

  const handleDateChange = (date) => {
    setselectedDOB(date);
  };

  const handleNext = () => {
    if (firstName && lastName && selectedDOB && streetAddress1 &&
      selectedstate && selectedcity && selectedZipcode && phoneNumber && email &&
      eContactName && eContactPhone && eContactRelation) {
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          firstName,
          lastName,
          selectedDOB,
          streetAddress1,
          streetAddress2,
          selectedstate,
          selectedcity,
          selectedZipcode,
          phoneNumber,
          email,
          eContactName,
          eContactPhone,
          eContactRelation
        }
      })
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
              validators={['required']}
              errorMessages={['This field is required']}
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
              validators={['required']}
              errorMessages={['This field is required']}
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
                onChange={handleDateChange}
                InputProps={{ classes }}
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
              validators={['required']}
              errorMessages={['This field is required']}
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
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
              placeholder="Street Address 2" /> */}
          </div>
        </div>
        <div className="row">
          <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">State
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <TextValidator
              onChange={(event) => setselectedstate(event.target.value)}
              InputProps={{ classes }}
              value={selectedstate}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="state" name="lastname"
              placeholder="State" /> */}
          </div>
          <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">City
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <TextValidator
              onChange={(event) => setselectedcity(event.target.value)}
              InputProps={{ classes }}
              value={selectedcity}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="city" name="lastname"
              placeholder="City" /> */}
          </div>
          <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">Zipcode
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <TextValidator
              onChange={(event) => setselectedZipcode(event.target.value)}
              InputProps={{ classes }}
              value={selectedZipcode}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
              placeholder="Zipcode" /> */}
          </div>
        </div>
        <div className="row">
          <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">Phone Number
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <div className="w-100 d-flex mt-2">
              <TextValidator
                onChange={(event) => setphoneNumber(event.target.value)}
                InputProps={{ classes }}
                value={phoneNumber}
                validators={['required']}
                errorMessages={['This field is required']}
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
            <div className="w-100 d-flex mt-2">
              <TextValidator
                onChange={(event) => setemail(event.target.value)}
                InputProps={{ classes }}
                value={email}
                validators={['required']}
                errorMessages={['This field is required']}
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
              validators={['required']}
              errorMessages={['This field is required']}
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
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone" name="lastname"
              placeholder="Emergency Contact Phone" /> */}
          </div>
          <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Relation
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <TextValidator
              onChange={(event) => seteContactRelation(event.target.value)}
              InputProps={{ classes }}
              value={eContactRelation}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone2" name="lastname"
              placeholder="Emergency Contact Relation" /> */}
          </div>
        </div>

      </ValidatorForm>
      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Step2;