import React, { useContext } from 'react';
import { AppContext } from "../store/app";

function Step2() {

  const [state, dispatch] = useContext(AppContext);

  const handleNext = () => {
    localStorage.setItem('step', state.step + 1);
    dispatch({
      type: "SET_STEP",
      step: state.step + 1
    });
    return;
  };

  const handleBack = () => {
    localStorage.setItem('step', state.step - 1);
    dispatch({
      type: "SET_STEP",
      step: state.step - 1
    });
    return;
  };

  return (
    <div className="App">
      <div className="row">
        <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">First Name
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="fname" name="lastname"
            placeholder="First Name" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Last Name
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="lname" name="lastname"
            placeholder="Last Name" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4  col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Date of Birth
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="DOB" name="lastname"
            placeholder="Date of Birth" />
        </div>
      </div>
      <div className="row">
        <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Street Address
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
            placeholder="Street Address" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Street Address 2
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
            placeholder="Street Address 2" />
        </div>
      </div>
      <div className="row">
        <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">State
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="state" name="lastname"
            placeholder="State" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">City
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="city" name="lastname"
            placeholder="City" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Zipcode
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
            placeholder="Zipcode" />
        </div>
      </div>
      <div className="row">
        <div className="mb-5 overlap-group2 col-lg-6 col-md-6 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Phone Number
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <div className="w-100 d-flex mt-2">
            <input className="overlap-group first-name-1 w-100 border-1px-mist-gray" id="phone" name="lastname"
              placeholder="Phone Number" />
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
            <input className="overlap-group first-name-1 w-100 border-1px-mist-gray" id="email" name="lastname"
              placeholder="Email Address" />
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
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ename" name="lastname"
            placeholder="Emergency Contact Name" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Phone
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone" name="lastname"
            placeholder="Emergency Contact Phone" />
        </div>
        <div className="mb-5 overlap-group2 col-lg-4 col-md-4 col-12">
          <label className="first-name-1 roboto-medium-black-24px w-100">Emergency Contact Relation
            <span className="roboto-medium-tia-maria-24px ml-1">*</span>
          </label>
          <input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="ephone2" name="lastname"
            placeholder="Emergency Contact Relation" />
        </div>
      </div>
      <div className="w-100 d-flex justify-content-end mt-5 mb-3">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}

export default Step2;