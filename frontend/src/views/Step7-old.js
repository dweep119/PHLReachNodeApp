import React, { useContext } from 'react';
import { AppContext } from "../store/app";
import logoPath from "../assets/img/logo-home@2x.png"

function Step6() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  const signatureImage = formData.signatureImage;

  const onEditIconClick = (stepNo) => {
    dispatch({
      type: "SET_STEP",
      step: stepNo
    });
    return;
  }

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

  return (
    <div className="App">
      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Appointment
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(1)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample1">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Date/Time</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 07/15/2021 10:30 AM</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Office Phone Number</label>
              <label className="roboto-normal-dark-silver-18px w-100"> (800)-325-1812</label>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Office Location</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 6301 N. Western Ave Chicago, IL 60659</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Office Email</label>
              <label className="roboto-normal-dark-silver-18px w-100"> info@prism.org</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Contact
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(2)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample2">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Name</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Dweep Patel</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Address</label>
              <label className="roboto-normal-dark-silver-18px w-100"> C-112 Girdharpark Society Vadodara, Gujarat 390009</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Email</label>
              <label className="roboto-normal-dark-silver-18px w-100"> neha.dweep@gmail.com</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Phone Number</label>
              <label className="roboto-normal-dark-silver-18px w-100"> +919925032084</label>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Date of Birth</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 09/11/1995</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Phone Number</label>
              <label className="roboto-normal-dark-silver-18px w-100"> +919978532084</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Name</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Upendra Patel</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Relation</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Father</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Demographics
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(3)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample3">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Preferred Language</label>
              <label className="roboto-normal-dark-silver-18px w-100"> English</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Ethnicity</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Hispanic or Latinx</label>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Race</label>
              <label className="roboto-normal-dark-silver-18px w-100"> American Indian or Alaskan Native</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Gender</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Male</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Insurance
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(4)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample4">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample4">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Insurance Company</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Medicare</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Group Number</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 456</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Insured Person Name</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Upendra Patel</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Insured Person DOB</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 08/30/1964</label>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Insurance ID</label>
              <label className="roboto-normal-dark-silver-18px w-100"> 5418715</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Plan Name</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Family</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> Insured Relationship to Patient</label>
              <label className="roboto-normal-dark-silver-18px w-100"> Father</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Medical Questionnaire
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(5)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample5" aria-expanded="false" aria-controls="collapseExample5">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample5">
        <div className="roboto-normal-dark-tan-22px col-12 mb-3">
          COVID-19 Testing
        </div>
        <div className="col-12">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you been in any public gatherings(i.e prayer hall, protests, parties/events/restaurant, etc)?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Are you a health care worker‚ nursing home worker‚ first responder?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you experienced any symptoms in the last 14 days?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Do you have any pre-existing medical conditions?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Do you smoke cigarettes or use other tobacco?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Do you use vaping products?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you experienced any of these symptoms</label>
                <label className="roboto-normal-dark-silver-18px w-100"> Cough, Rash, Fever above 100 degrees</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> How long have you been experiencing these symptoms (in days)</label>
                <label className="roboto-normal-dark-silver-18px w-100"> 5</label>
              </div>
            </div>
          </div>
        </div>

        <div className="roboto-normal-dark-tan-22px col-12 mb-3">
          COVID-19 Vaccine
        </div>
        <div className="col-12">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you received any vaccinations in the past 2 weeks?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you receiveed a COVID-19 vaccine from different manufacturer at any time, or did you participate in a COVID-19 vaccine trial?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you ever had a serious reaction or fainted after receiving any vaccination?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you been diagnosed with COVID-19 infection in the last 90 days?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Have you ever had an anaphylactic reaction or had other severe symptoms after receiving another vaccination?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Do you have a medical condition or take medication(s) that may weaken your immune system?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
          </div>
        </div>

        <div className="roboto-normal-dark-tan-22px col-12 mb-3">
          Additional Info
        </div>
        <div className="col-12">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Are you disabled?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> Any additional personal health information you would like us to be aware of?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> No</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> How did you here about us?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> Facebook</label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label className="roboto-normal-black-18px-22 w-100"> In the future, what other services would you like Prism Health lab to provide?</label>
                <label className="roboto-normal-dark-silver-18px w-100"> Immigration</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 overlap-group2 col-11">
          <label className="roboto-medium-black-24px w-100">Consent Form
          </label>
        </div>
        <div className="col-1 d-flex pl-0 pr-0">
          <div className="summaryChevronIcon">
            <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(6)}></i>
          </div>
          <div className="summaryChevronIcon" data-toggle="collapse" data-target="#collapseExample6" aria-expanded="false" aria-controls="collapseExample6">
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="border-1px-mercury mb-3"></div>
      <div className="row collapse" id="collapseExample6">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <label className="roboto-normal-black-18px-22 w-100"> e-Signature</label>
              <img src={signatureImage ? signatureImage : logoPath} alt="img"
                style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        </div>
      </div>


      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
      </div>
    </div >
  );
}

export default Step6;
