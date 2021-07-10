import React, { useContext } from 'react';
import { AppContext } from "../store/app";

function Step1() {

  const [state, dispatch] = useContext(AppContext);

  const handleNext = () => {
    localStorage.setItem('step', state.step + 1);
    dispatch({
      type: "SET_STEP",
      step: state.step + 1
    });
    return;
  };

  return (
    <div className="App">
      <div className="col-12 d-flex pr-0 pl-0">
        <div className="col-4 lh-22">
          <div className="overlap-group10">
            <input className="w-100 rectangle-8 text-field-box border-1px-mist-gray" id="location" name="lastname"
              placeholder="West Rogers Park" />
          </div>
          <div className="d-flex mt-4">
            <div className="address-1 roboto-medium-black-18px-22">Address:</div>
            <div className="address-2 roboto-normal-black-18px-2 ml-3">6301 N. Western Ave<br />Chicago, IL 60659
            </div>
          </div>

          <div className="d-flex mt-4">
            <div className="text-3 roboto-medium-black-18px-22">Phone:<br />Email:<br />Website:</div>
            <div className="text-4 roboto-normal-black-18px-2 ml-3">
              (800)-325-1812<br />RogersPark@prism.org<br />prism.org</div>
          </div>

          <div className="d-flex mt-4">
            <div className="hours roboto-medium-black-18px-22">Hours:</div>
            <div className="text-5 roboto-normal-black-18px-2 ml-3">
              Monday<br />Tuesday<br />Wednesday<br />Thursday<br />Friday<br />Saturday<br />Sunday
            </div>
            <div className="text-6 roboto-normal-black-18px-2 ml-3">
              Closed<br />1pm - 7pm<br />1pm - 7pm<br />1pm - 7pm<br />1pm - 7pm<br />1pm - 7pm<br />Closed
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-7">
          <img className="rectangle-150"
            src="https://anima-uploads.s3.amazonaws.com/projects/60d0ce8207f6c272e04c5a8d/releases/60d36369024600c5e63507e4/img/rectangle-150@1x.png" alt="img" />
        </div>
      </div>
      <div className="mt-5 mb-5 col-12 d-flex pr-0 pl-0">
        <div className="overlap-group10 col-4 pl-0">
          <label className="date roboto-bold-black-18px mr-1">Type of visit</label>
          <input className="rectangle-8 border-1px-mercury" id="TypeOfVisit" name="lastname"
            placeholder="Select type of visit" />
        </div>
        <div className="overlap-group10 col-4">
          <label className="date roboto-bold-black-18px mr-1">Select a date</label>
          <input className="rectangle-8 border-1px-mercury" id="Date" name="lastname" placeholder="Select Date" />
        </div>
        <div className="overlap-group10 col-4">
          <label className="date roboto-bold-black-18px mr-1">Date of Birth</label>
          <input className="rectangle-8 border-1px-mercury" id="DOB" name="lastname" placeholder="Date of Birth" />
        </div>
      </div>
      <div className="select-a-time-slot">Select a time slot</div>
      <div className="col-12 p-0">
        <div className="w-100 mt-3">
          <div className="row w-100 m-0">
            <div className="col-2 paddingUnset">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">9 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 pr-0 vertical-divider">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:00 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:15 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:30 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-3">
          <div className="row w-100 m-0">
            <div className="col-2 paddingUnset">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">10 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 pr-0 vertical-divider">
                <div className="overlap-group6">
                  <div className="x900-am roboto-normal-white-18px-2">10:00 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:15 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:30 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-3">
          <div className="row w-100 m-0">
            <div className="col-2 paddingUnset">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">11 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 pr-0 vertical-divider">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:00 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:15 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:30 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-3">
          <div className="row w-100 m-0">
            <div className="col-2 paddingUnset">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">12 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 pr-0 vertical-divider">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:00 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:15 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:30 AM</div>
                </div>
              </div>
              <div className="col-3 pr-0">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 mt-3 d-flex justify-content-between">
        <div className="selecte-more-times">Selecte more times</div>
        <div className="text-7 roboto-medium-black-18px-2">Only 1 time slot per service</div>
      </div>
      <div className="mt-5 mb-3 float-right">
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px" onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}

export default Step1;
