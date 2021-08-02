import React, { useContext, useState } from 'react';
import { AppContext } from "../store/app";
const CryptoJS = require("crypto-js");

function Step3() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  const languageList = [
    {
      key: 'English',
      value: 'English'
    },
    {
      key: 'Spanish',
      value: 'Spanish'
    },
    {
      key: 'Chinese',
      value: 'Chinese'
    },
    {
      key: 'French',
      value: 'French'
    },
    {
      key: 'Portugese',
      value: 'Portugese'
    },
    {
      key: 'German',
      value: 'German'
    },
    {
      key: 'Italian',
      value: 'Italian'
    },
    {
      key: 'Arbic',
      value: 'Arbic'
    },
    {
      key: 'Korean',
      value: 'Korean'
    },
    {
      key: 'Japanese',
      value: 'Japanese'
    },
    {
      key: 'Decline to Specify',
      value: 'Decline to Specify'
    }
  ];
  const raceList = [
    {
      key: 'American Indian or Alaskan Native',
      value: 'American Indian or Alaskan Native'
    },
    {
      key: 'Asian',
      value: 'Asian'
    },
    {
      key: 'Black or African American',
      value: 'Black or African American'
    },
    {
      key: 'Native Hawaiian or Pacific Islander',
      value: 'Native Hawaiian or Pacific Islander'
    },
    {
      key: 'White',
      value: 'White'
    },
    {
      key: 'Other Race',
      value: 'Other Race'
    },
    {
      key: 'Decline to Specify',
      value: 'Decline to Specify'
    }
  ];
  const ethnicityList = [
    {
      key: 'Hispanic or Latinx',
      value: 'Hispanic or Latinx'
    },
    {
      key: 'Not Hispanic or Latinx',
      value: 'Not Hispanic or Latinx'
    },
    {
      key: 'Decline to Specify',
      value: 'Decline to Specify'
    },
  ];
  const genderList = [
    {
      key: 'Male',
      value: 'Male'
    },
    {
      key: 'Female',
      value: 'Female'
    },
    {
      key: 'Transgender',
      value: 'Transgender'
    },
    {
      key: 'Non-Binary',
      value: 'Non-Binary'
    },
    {
      key: 'Other',
      value: 'Other'
    },
    {
      key: 'Unknown',
      value: 'Unknown'
    },
    {
      key: 'Decline to Specify',
      value: 'Decline to Specify'
    }
  ];

  const [selectedLanguage, setselectedLanguage] = useState(formData.Demographics && formData.Demographics.PreferredLanguage ? formData.Demographics.PreferredLanguage : languageList[0].value);
  const [selectedRace, setselectedRace] = useState(formData.Demographics && formData.Demographics.Race ? formData.Demographics.Race : raceList[0].value);
  const [selectedEthnicity, setselectedEthnicity] = useState(formData.Demographics && formData.Demographics.Ethnicity ? formData.Demographics.Ethnicity : ethnicityList[0].value);
  const [selectedGender, setselectedGender] = useState(formData.Demographics && formData.Demographics.Gender ? formData.Demographics.Gender : genderList[0].value);

  const goToSummary = () => {
    dispatch({
      type: "SET_STEP",
      step: 7
    });
    return;
  }

  const handleNext = () => {
    let obj = {
      "Demographics": {
        "PreferredLanguage": selectedLanguage,
        "Race": selectedRace,
        "Ethnicity": selectedEthnicity,
        "Gender": selectedGender
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
  };

  const handleBack = () => {
    dispatch({
      type: "SET_STEP",
      step: state.step - 1
    });
    return;
  };

  return (
    <div className="App">
      <div className="overlap-group2 mb-5 col-12 pr-0 pl-0">
        <label className="first-name roboto-medium-black-24px w-100">Preferred Language
          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
        </label>
        <div className="w-100 d-flex mt-3 ml-2">
          <div className="row">
            {
              languageList.map((item, index) => (
                <div className={"border-1px-mist-gray ml-2 mt-2 cursor-pointer " + (selectedLanguage === item.value ? 'overlap-group17' : 'overlap-group')} key={index} onClick={() => setselectedLanguage(item.value)}>
                  <div className={selectedLanguage === item.value ? 'roboto-normal-white-18px-2' : 'roboto-normal-black-18px-2'}>{item.value}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="overlap-group2 mb-5 col-12 pr-0 pl-0">
        <label className="first-name roboto-medium-black-24px w-100">Race
          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
        </label>
        <div className="w-100 d-flex mt-3 ml-2">
          <div className="row">
            {
              raceList.map((item, index) => (
                <div className={"border-1px-mist-gray ml-2 mt-2 cursor-pointer " + (selectedRace === item.value ? 'overlap-group17' : 'overlap-group')} key={index} onClick={() => setselectedRace(item.value)}>
                  <div className={selectedRace === item.value ? 'roboto-normal-white-18px-2' : 'roboto-normal-black-18px-2'}>{item.value}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="overlap-group2 mb-5 col-12 pr-0 pl-0">
        <label className="first-name roboto-medium-black-24px w-100">Ethnicity
          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
        </label>
        <div className="w-100 d-flex mt-3 ml-2">
          <div className="row">
            {
              ethnicityList.map((item, index) => (
                <div className={"border-1px-mist-gray ml-2 mt-2 cursor-pointer " + (selectedEthnicity === item.value ? 'overlap-group17' : 'overlap-group')} key={index} onClick={() => setselectedEthnicity(item.value)}>
                  <div className={selectedEthnicity === item.value ? 'roboto-normal-white-18px-2' : 'roboto-normal-black-18px-2'}>{item.value}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="overlap-group2 mb-5 col-12 pr-0 pl-0">
        <label className="first-name roboto-medium-black-24px w-100">Gender
          <span className="roboto-medium-tia-maria-24px ml-1">*</span>
        </label>
        <div className="w-100 d-flex mt-3 ml-2">
          <div className="row">
            {
              genderList.map((item, index) => (
                <div className={"border-1px-mist-gray ml-2 mt-2 cursor-pointer " + (selectedGender === item.value ? 'overlap-group17' : 'overlap-group')} key={index} onClick={() => setselectedGender(item.value)}>
                  <div className={selectedGender === item.value ? 'roboto-normal-white-18px-2' : 'roboto-normal-black-18px-2'}>{item.value}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* <div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-5 pl-0">
					<label className="first-name roboto-medium-black-24px w-100">Height
					</label>
					<div className="w-100 d-flex mt-3">
						<input className="overlap-group first-name border-1px-mist-gray" id="height" name="lastname"
							placeholder="5’6”" />
						<div className="flex-row-item roboto-normal-black-18px-2">feet/inches</div>
					</div>
				</div>
				<div className="col-2"></div>
				<div className="overlap-group2 col-5 pr-0">
					<label className="first-name roboto-medium-black-24px w-100">Weight
					</label>
					<div className="w-100 d-flex mt-3">
						<input className="overlap-group first-name border-1px-mist-gray" id="weight" name="lastname"
							placeholder="132 lbs" />
						<div className="flex-row-item roboto-normal-black-18px-2">pounds</div>
					</div>
				</div>
			</div> */}
      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
        {
          formData && formData.ConsentForms && formData.ConsentForms.Signature ?
            <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
            : null
        }
      </div>
    </div>
  );
}

export default Step3;
