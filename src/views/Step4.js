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


function Step4() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  const { relationShipList } = state;

  const { insuranceCompanies } = state;

  const [isInsured, setisInsured] = useState(formData.Insurance && formData.Insurance.HasInsurance ? formData.Insurance.HasInsurance : false);
  const [selectedFrontPhoto, setselectedFrontPhoto] = useState(formData.Insurance && formData.Insurance.PhotoFront ? formData.Insurance.PhotoFront : null);
  const [selectedBackPhoto, setselectedBackPhoto] = useState(formData.Insurance && formData.Insurance.PhotoBack ? formData.Insurance.PhotoBack : null);
  const [selectedInsuranceCompany, setselectedInsuranceCompany] = useState(formData.Insurance && formData.Insurance.PrimaryInsurance ? formData.Insurance.PrimaryInsurance : insuranceCompanies[0]);
  const [insuranceId, setinsuranceId] = useState(formData.Insurance && formData.Insurance.InsuranceId ? formData.Insurance.InsuranceId : '');
  const [groupNumber, setgroupNumber] = useState(formData.Insurance && formData.Insurance.GroupNumber ? formData.Insurance.GroupNumber : '');
  const [planName, setplanName] = useState(formData.Insurance && formData.Insurance.PlanName ? formData.Insurance.PlanName : '');
  const [isInsuredPersonSame, setisInsuredPersonSame] = useState(formData.Insurance && formData.Insurance.SameInsuredPerson === false ? formData.Insurance.SameInsuredPerson : true);
  const [patientInsuredRelation, setpatientInsuredRelation] = useState(formData.Insurance && formData.Insurance.InsuredPersonRelation ? formData.Insurance.InsuredPersonRelation : relationShipList[0]);
  const [insuredDOB, setinsuredDOB] = useState(formData.Insurance && formData.Insurance.InsuredPersonDOB ? formData.Insurance.InsuredPersonDOB : new Date('2014-08-18T21:11:54'));
  const [insuredFirstName, setinsuredFirstName] = useState(formData.Insurance && formData.Insurance.InsuredPersonFirstName ? formData.Insurance.InsuredPersonFirstName : '');
  const [insuredLastName, setinsuredLastName] = useState(formData.Insurance && formData.Insurance.InsuredPersonLastName ? formData.Insurance.InsuredPersonLastName : '');
  const [insuredMiddleName, setinsuredMiddleName] = useState(formData.Insurance && formData.Insurance.InsuredPersonMiddleName ? formData.Insurance.InsuredPersonMiddleName : '');
  const [insuredSuffix, setinsuredSuffix] = useState(formData.Insurance && formData.Insurance.InsuredPersonSuffix ? formData.Insurance.InsuredPersonSuffix : '');
  console.log('isInsuredPersonSame: ', isInsuredPersonSame);

  const handleDateChange = (date) => {
    setinsuredDOB(date);
  };

  const onFileChangeFront = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 1000000) {

      toast.error('Image size must be less than 1mb', {
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
    const base64Image = await toBase64(selectedFile);

    setselectedFrontPhoto(base64Image);
  };

  const onFileChangeBack = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > 1000000) {

      toast.error('Image size must be less than 1mb', {
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
    const base64Image = await toBase64(selectedFile);
    setselectedBackPhoto(base64Image);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleChange = (newValue, actionMeta) => {
    console.log(`action: ${actionMeta.action}`);
    setselectedInsuranceCompany(newValue)
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const goToSummary = () => {
    if (isInsured) {
      if (selectedInsuranceCompany && insuranceId && groupNumber && planName) {
        if (!isInsuredPersonSame) {
          if (patientInsuredRelation && insuredDOB && insuredFirstName && insuredLastName) {
            let obj = {
              "Insurance": {
                "HasInsurance": isInsured,
                "PhotoFront": selectedFrontPhoto,
                "PhotoBack": selectedBackPhoto,
                "PrimaryInsurance": selectedInsuranceCompany,
                "InsuranceId": insuranceId,
                "GroupNumber": groupNumber,
                "PlanName": planName,
                "SameInsuredPerson": isInsuredPersonSame,
                "InsuredPersonRelation": patientInsuredRelation,
                "InsuredPersonDOB": insuredDOB,
                "InsuredPersonFirstName": insuredFirstName,
                "InsuredPersonLastName": insuredLastName,
                "InsuredPersonMiddleName": insuredMiddleName,
                "InsuredPersonSuffix": insuredSuffix,
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
        } else {
          let obj = {
            "Insurance": {
              "HasInsurance": isInsured,
              "PhotoFront": selectedFrontPhoto,
              "PhotoBack": selectedBackPhoto,
              "PrimaryInsurance": selectedInsuranceCompany,
              "InsuranceId": insuranceId,
              "GroupNumber": groupNumber,
              "PlanName": planName,
              "SameInsuredPerson": isInsuredPersonSame
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
        }
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
    } else {
      let obj = {
        "Insurance": {
          "HasInsurance": isInsured
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
    }
  }

  const handleNext = () => {
    if (isInsured) {
      if (selectedInsuranceCompany && insuranceId && groupNumber && planName) {
        if (!isInsuredPersonSame) {
          if (patientInsuredRelation && insuredDOB && insuredFirstName && insuredLastName) {
            let obj = {
              "Insurance": {
                "HasInsurance": isInsured,
                "PhotoFront": selectedFrontPhoto,
                "PhotoBack": selectedBackPhoto,
                "PrimaryInsurance": selectedInsuranceCompany,
                "InsuranceId": insuranceId,
                "GroupNumber": groupNumber,
                "PlanName": planName,
                "SameInsuredPerson": isInsuredPersonSame,
                "InsuredPersonRelation": patientInsuredRelation,
                "InsuredPersonDOB": insuredDOB,
                "InsuredPersonFirstName": insuredFirstName,
                "InsuredPersonLastName": insuredLastName,
                "InsuredPersonMiddleName": insuredMiddleName,
                "InsuredPersonSuffix": insuredSuffix,
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
        } else {
          let obj = {
            "Insurance": {
              "HasInsurance": isInsured,
              "PhotoFront": selectedFrontPhoto,
              "PhotoBack": selectedBackPhoto,
              "PrimaryInsurance": selectedInsuranceCompany,
              "InsuranceId": insuranceId,
              "GroupNumber": groupNumber,
              "PlanName": planName,
              "SameInsuredPerson": isInsuredPersonSame
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
        }
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
    } else {
      let obj = {
        "Insurance": {
          "HasInsurance": isInsured
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
          <div className="mb-5  overlap-group2 col-12">
            <label className="first-name-1 roboto-medium-black-24px w-100">Do you have Medicare, Medicaid, or another insurance?
              <span className="roboto-medium-tia-maria-24px ml-1">*</span>
            </label>
            <div className="col-lg-2 col-md-3 col-5 d-flex justify-content-between pl-0 mt-2">
              <div className={"options cursor-pointer " + (isInsured ? 'active' : '')} onClick={() => setisInsured(true)}>
                Yes
              </div>
              <div className={"options cursor-pointer " + (isInsured ? '' : 'active')} onClick={() => setisInsured(false)}>
                No
              </div>
            </div>
          </div>
        </div>
        {
          isInsured ?
            <div>
              <div className="row">
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Photo of Insurance Card - Front
                  </label>
                  {/* {
                    selectedFrontPhoto ?
                      <div>
                        <img src={selectedFrontPhoto} style={{ display: "block", width: "100%" }} alt="img"></img>
                        <i className="fa fa-times-circle" onClick={() => setselectedFrontPhoto(null)}
                          style={{ right: 0, top: 5, cursor: "pointer" }} aria-hidden="true"></i>
                      </div>
                      :
                      <input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
                        placeholder="Street Address" onChange={onFileChangeFront} />
                  } */}
                  <input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
                    placeholder="Street Address" onChange={onFileChangeFront} />
                </div>
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Photo of Insurance Card - Back
                  </label>
                  {/* {
                    selectedBackPhoto ?
                      <div>
                        <img src={selectedBackPhoto} style={{ display: "block", width: "100%" }} alt="img"></img>
                        <i className="fa fa-times-circle" onClick={() => setselectedBackPhoto(null)}
                          style={{ right: 0, top: 5, cursor: "pointer" }} aria-hidden="true"></i>
                      </div>
                      :
                      <input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
                        placeholder="Street Address" onChange={onFileChangeBack} />
                  } */}
                  <input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
                    placeholder="Street Address" onChange={onFileChangeBack} />
                </div>
              </div>
              <div className="row">
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Primary Insurance Company
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <CreatableSelect
                    defaultValue={selectedInsuranceCompany}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={insuranceCompanies}
                  />
                  {/* <TextValidator
                    onChange={(event) => setselectedInsuranceCompany(event.target.value)}
                    InputProps={{ classes }}
                    value={selectedInsuranceCompany}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  /> */}
                  {/* <input type="text" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
							placeholder="Primary Insurance Company" /> */}
                </div>
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Insurance ID #
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setinsuranceId(event.target.value)}
                    InputProps={{ classes }}
                    value={insuranceId}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                  {/* <input type="text" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
							placeholder="Insurance ID #" /> */}
                </div>
              </div>
              <div className="row">
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Group Number
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setgroupNumber(event.target.value)}
                    InputProps={{ classes }}
                    value={groupNumber}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
							placeholder="Group Number" /> */}
                </div>
                <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Plan Name
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <TextValidator
                    onChange={(event) => setplanName(event.target.value)}
                    InputProps={{ classes }}
                    value={planName}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                  {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
							placeholder="Plan Name" /> */}
                </div>
              </div>
              <div className="mt-5 row">
                <div className="mb-5  overlap-group2 col-12">
                  <label className="first-name-1 roboto-medium-black-24px w-100">Is the insured person the same as the patient?
                    <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                  </label>
                  <div className="col-lg-2 col-md-3 col-5 d-flex justify-content-between pl-0 mt-2">
                    <div className={"options cursor-pointer " + (isInsuredPersonSame ? 'active' : '')} onClick={() => setisInsuredPersonSame(true)}>
                      Yes
                    </div>
                    <div className={"options cursor-pointer " + (isInsuredPersonSame ? '' : 'active')} onClick={() => setisInsuredPersonSame(false)}>
                      No
                    </div>
                  </div>
                </div>
              </div>
              {
                !isInsuredPersonSame ?
                  <div>
                    <div className="row">
                      <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">Patient Relationship to Insured
                          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                        </label>
                        <CreatableSelect
                          defaultValue={patientInsuredRelation}
                          onChange={(newValue) => setpatientInsuredRelation(newValue)}
                          onInputChange={handleInputChange}
                          options={relationShipList}
                        />
                        {/* <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={patientInsuredRelation}
                          isSearchable={true}
                          onChange={(newValue) => setpatientInsuredRelation(newValue)}
                          options={relationShipList}
                        /> */}
                        {/* <TextValidator
                          onChange={(event) => setpatientInsuredRelation(event.target.value)}
                          InputProps={{ classes }}
                          value={patientInsuredRelation}
                          validators={['required']}
                          errorMessages={['This field is required']}
                        /> */}
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
							placeholder="Patient Relationship to Insured" /> */}
                      </div>
                      <div className="mb-5  overlap-group2 col-lg-6  col-md-6 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">Date of Birth
                          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                        </label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            value={insuredDOB}
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
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            value={insuredDOB}
                            onChange={handleDateChange}
                            InputProps={{ classes }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider> */}
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
							placeholder="Date of Birth" /> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-5  overlap-group2 mb-5  overlap-group2 col-lg-3  col-md-3 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">First Name
                          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                        </label>
                        <TextValidator
                          onChange={(event) => setinsuredFirstName(event.target.value)}
                          InputProps={{ classes }}
                          value={insuredFirstName}
                          validators={['required']}
                          errorMessages={['This field is required']}
                        />
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="state" name="lastname"
							placeholder="First Name" /> */}
                      </div>
                      <div className="mb-5  overlap-group2 mb-5  overlap-group2 col-lg-3  col-md-3 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">Last Name
                          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
                        </label>
                        <TextValidator
                          onChange={(event) => setinsuredLastName(event.target.value)}
                          InputProps={{ classes }}
                          value={insuredLastName}
                          validators={['required']}
                          errorMessages={['This field is required']}
                        />
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
							placeholder="Last Name" /> */}
                      </div>
                      <div className="mb-5  overlap-group2 mb-5  overlap-group2 col-lg-3  col-md-3 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">Middle Name
                        </label>
                        <TextValidator
                          onChange={(event) => setinsuredMiddleName(event.target.value)}
                          InputProps={{ classes }}
                          value={insuredMiddleName}
                          validators={['required']}
                          errorMessages={['This field is required']}
                        />
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
							placeholder="Middle Name" /> */}
                      </div>
                      <div className="mb-5  overlap-group2 mb-5  overlap-group2 col-lg-3  col-md-3 col-12">
                        <label className="first-name-1 roboto-medium-black-24px w-100">Suffix
                        </label>
                        <TextValidator
                          onChange={(event) => setinsuredSuffix(event.target.value)}
                          InputProps={{ classes }}
                          value={insuredSuffix}
                          validators={['required']}
                          errorMessages={['This field is required']}
                        />
                        {/* <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="city" name="lastname"
							placeholder="Suffix" /> */}
                      </div>
                    </div>
                  </div>
                  : null
              }
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
      </ValidatorForm>
      <ToastContainer />
    </div>
  );
}

export default Step4;