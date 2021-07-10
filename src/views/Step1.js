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
            <div className="eventName">Event Name</div>
          </div>
          <div className="d-flex mt-3">
            <div className="address-1 roboto-medium-black-18px-22 col-3 text-right pl-0">Address:</div>
            <div className="address-2 roboto-normal-black-18px-2">6301 N. Western Ave<br />Chicago, IL 60659
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="text-3 roboto-medium-black-18px-22 col-3 text-right pl-0">Phone:<br />Email:<br />Website:</div>
            <div className="text-4 roboto-normal-black-18px-2">
              (800)-325-1812<br />info@prism.org<br />prism.org</div>
          </div>
          <div className="d-flex mt-4">
            <div className="hours roboto-medium-black-18px-22 col-3 text-right pl-0">Dates:</div>
            <div className="text-5 roboto-normal-black-18px-2">
              Monday, July 12<br />Tuesday, July 13<br />Wednesday, July 14<br />Thursday, July 15
            </div>
            <div className="text-6 roboto-normal-black-18px-2 ml-3">
              8-5pm<br />8-5pm<br />8-5pm<br />8-5pm
            </div>
          </div>
          <div className="btn-directions mt-4 col-6">
            GET DIRECTIONS
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-7">
          <img className="rectangle-150"
            src="https://anima-uploads.s3.amazonaws.com/projects/60d0ce8207f6c272e04c5a8d/releases/60d36369024600c5e63507e4/img/rectangle-150@1x.png" alt="img" />
        </div>
      </div>
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <div className="select-a-time-slot">Available Dates</div>
      <div className="mt-2 mb-5 col-8 d-flex pr-0 pl-0">
        <div className="col-3 pl-0">
          <div className="btn-date">
            July 12, 2021
          </div>
        </div>
        <div className="col-3 pl-0">
          <div className="btn-date">
            July 13, 2021
          </div>
        </div>
        <div className="col-3 pl-0">
          <div className="btn-date active">
            July 14, 2021
          </div>
        </div>
        <div className="col-3 pl-0">
          <div className="btn-date">
            July 15, 2021
          </div>
        </div>
      </div>
      <div className="select-a-time-slot">Select a time slot</div>
      <div className="col-12 p-0">
        <div className="w-100 mt-4">
          <div className="row w-100 m-0">
            <div className="col-2">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">9 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 vertical-divider pl-30">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:00 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:15 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:30 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">9:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-4">
          <div className="row w-100 m-0">
            <div className="col-2">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">10 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 vertical-divider pl-30">
                <div className="overlap-group6">
                  <div className="x900-am roboto-normal-white-18px-2">10:00 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:15 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:30 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">10:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-4">
          <div className="row w-100 m-0">
            <div className="col-2">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">11 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 vertical-divider pl-30">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:00 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:15 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:30 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">11:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 mt-4">
          <div className="row w-100 m-0">
            <div className="col-2">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-22">12 AM</div>
              </div>
            </div>
            <div className="d-flex col-10 pr-0">
              <div className="col-3 vertical-divider pl-30">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:00 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:15 AM</div>
                </div>
              </div>
              <div className="col-3">
                <div className="overlap-group14">
                  <div className="x900-am roboto-normal-black-18px-22">12:30 AM</div>
                </div>
              </div>
              <div className="col-3">
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
