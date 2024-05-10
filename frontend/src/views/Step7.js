import React, { useContext, useState } from 'react';
import { AppContext } from "../store/app";

import qrCodePath from "../assets/img/qrCode.svg";
import travelPack from "../assets/img/COVID-19 Travel Pack.jpg";
import vaccination from "../assets/img/COVID-19 Vaccination.jpg";

function Step7() {

  const [state, dispatch] = useContext(AppContext);

  const [isDisplayDetails, setisDisplayDetails] = useState(false);

  const handleNext = () => {
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

  const onEditIconClick = (stepNo) => {
    dispatch({
      type: "SET_STEP",
      step: stepNo
    });
    return;
  }

  return (
    <div className="App">
      <div className="p-5">
        <div className="row mb-5 w-100 justify-content-between">
          <div className="col-lg-5 col-md-6 col-12">
            <div className="roboto-normal-dark-tan-24px">
              We'll See You There!
            </div>
            <div className="mt-3">
              <label className="roboto-medium-black-24px">
                This is your express pass to Check-in once you arrive at Prism.
              </label>
            </div>
            <div className="mt-3">
              <label className="roboto-medium-black-24px">
                This is QR Code will also be sent to you in your confirmation email.
              </label>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <div className="text-center">
              <img className="summaryQRCode" src={qrCodePath} alt="img" />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6 col-md-12 col-12">
          <div class="card summaryCard">
            <div class="card-header summaryCardHeader">
              <div className="roboto-bold-white-20px">
                My Services
              </div>
            </div>
            <div class="card-body">
              <div className="col-12">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="row">
                    <div className="d-flex">
                      <img src={travelPack} alt="img" style={{ height: 70 }} />
                      <label className="ml-2 roboto-normal-black-18px-22">COVID-19 Travel Pack</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <i class="fa fa-calendar-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">July 20, 2021</label>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">10:15 AM</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">6301 N. Western Ave Chicago, IL 60659</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <button className="summaryBodyBtn roboto-bold-white-20-3px" onClick={handleBack}>GET DIRECTIONS</button>
                    <button className="summaryBodyBtn roboto-bold-white-20-3px ml-3" onClick={handleBack}>ADD TO CALENDER</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <div class="card summaryCard">
            <div class="card-header summaryCardHeader">
              <div className="roboto-bold-white-20px">
                My Services
              </div>
            </div>
            <div class="card-body">
              <div className="col-12">
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="row">
                    <div className="d-flex">
                      <img src={vaccination} alt="img" style={{ height: 70 }} />
                      <label className="ml-2 roboto-normal-black-18px-22">COVID-19 Pfizer Vaccination</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <i class="fa fa-calendar-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">July 20, 2021</label>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">10:15 AM</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">6301 N. Western Ave Chicago, IL 60659</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <button className="summaryBodyBtn roboto-bold-white-20-3px" onClick={handleBack}>GET DIRECTIONS</button>
                    <button className="summaryBodyBtn roboto-bold-white-20-3px ml-3" onClick={handleBack}>ADD TO CALENDER</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        !isDisplayDetails ?
          <div>
            <div className="row mt-5">
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Contact
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(2)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">John Doe</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">6113 N Chester Ave</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">johndoe54@gmail.com</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">773-475-9904</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Demographics
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(3)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">English</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Asian</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Non Hispanic or Latinx</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Male</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Insurance
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(4)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Complete</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Blue Cross Blue Shield</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">ID# 389047</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Medical Questionnaire
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(5)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Covid-19 Vaccine: Complete</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Covid-19 Testing: Complete</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Additional Info: Complete</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Consent Forms
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(6)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Signed and acknowledged</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12">
                <div class="card summaryCard">
                  <div class="card-header summaryCardHeader d-flex w-100">
                    <div className="roboto-bold-white-20px text-center col-11">
                      Policies
                    </div>
                    <div className="col-1 cursor-pointer">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(6)}></i>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2">Read and acknowledged</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <label className="roboto-normal-black-18px-2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center">
                <div>
                  <label className="roboto-normal-dark-tan-22px cursor-pointer" onClick={() => setisDisplayDetails(true)}>
                    More Details
                  </label>
                  <i className="fa fa-chevron-down fa-lg ml-2 moreDetailsIcon cursor-pointer" aria-hidden="true" onClick={() => setisDisplayDetails(true)}></i>
                </div>
              </div>
            </div>
          </div>
          :
          <div>
            <div className="row mt-5">
              <div className="col-12 text-center">
                <div>
                  <label className="roboto-normal-dark-tan-22px cursor-pointer" onClick={() => setisDisplayDetails(false)}>
                    More Details
                  </label>
                  <i className="fa fa-chevron-up fa-lg ml-2 moreDetailsIcon cursor-pointer" aria-hidden="true" onClick={() => setisDisplayDetails(false)}></i>
                </div>
              </div>
            </div>
            <div className="row mt-5 moreDetails">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Contact Information:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>Gartett Boileve</li>
                      <li>03/04/1987</li>
                      <li>2928 W Sherwin</li>
                      <li>Chicago, IL 60645</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Emergency Contact:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>Carlos Boileve</li>
                      <li>773-972-5167</li>
                      <li>Father</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Demographics:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>English</li>
                      <li>Asian</li>
                      <li>Non Hispanic or Latinx</li>
                      <li>Male</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Insurance:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>Yes</li>
                      <li>Blue Cross Blue Shield</li>
                      <li>ID#: 930293472</li>
                      <li>Group#: BD20391</li>
                      <li>Plan Name: PRO+</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Medical Questionnaire:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19? <b>Yes</b></li>
                      <li>Have you been in any public gatherings? <b>Yes</b></li>
                      <li>Are you a health care worker‚ nursing home worker‚ first responder? <b>No</b></li>
                      <li>Have you experienced any symptoms in the last 14 days? <b>Yes</b></li>
                      <li>Have you experienced any of these symptoms? <b>Shortness of Breath, Cough, Sore Throat, Chest Pain</b></li>
                      <li>How long have you been experiencing these symptoms? <b>5 Days</b></li>
                      <li>Do you have any pre-existing medical conditions? <b>Yes</b></li>
                      <li>Do you smoke cigarettes or use other tobacco? <b>No</b></li>
                      <li>Do you use vaping products? <b>No</b></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Consent Form:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>You agreed that you read consent documents.</li>
                      <img src={vaccination} alt="img" style={{ height: 150 }} />
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="roboto-bold-black-18px">Policies:</label>
                  <div className="col-12">
                    <ul className="ul-list">
                      <li>Read and acknowledged.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-5">
                <button className="summaryBodyBtn roboto-bold-white-20-3px">DOWNLOAD</button>
                <button className="summaryBodyBtn roboto-bold-white-20-3px ml-3">PRINT</button>
              </div>
            </div>
          </div>
      }
      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>      </div>
    </div>
  );
}

export default Step7;
