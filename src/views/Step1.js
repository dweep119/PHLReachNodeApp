import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from "../store/app";
import moment from "moment";
import _ from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recaptcha from 'react-google-invisible-recaptcha';
import { ClipLoader } from "react-spinners";
const CryptoJS = require("crypto-js");

function Step1() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;

  const refRecaptcha = useRef(null);
  const dates = [
    {
      key: '07/12/2021',
      value: 'July 12, 2021'
    },
    {
      key: '07/13/2021',
      value: 'July 13, 2021'
    },
    {
      key: '07/14/2021',
      value: 'July 14, 2021'
    },
    {
      key: '07/15/2021',
      value: 'July 15, 2021'
    },
  ];
  let _slots = [];

  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#940227eb");
  const [selectedDate, setselectedDate] = useState(formData.DateOfService ? formData.DateOfService : '07/14/2021');
  const [selectedSlot, setselectedSlot] = useState(formData.TimeOfService ? formData.TimeOfService : null);
  const [availableSlots, setavailableSlots] = useState(null);
  const [showMoreTimes, setshowMoreTimes] = useState(false);

  const slots = [
    {
      slot: '9:0'
    },
    {
      slot: '9:15'
    },
    {
      slot: '9:30'
    },
    {
      slot: '9:45'
    },
    {
      slot: '10:0'
    },
    {
      slot: '10:15'
    },
    {
      slot: '10:30'
    },
    {
      slot: '10:45'
    },
    {
      slot: '11:0'
    },
    {
      slot: '11:15'
    },
    {
      slot: '11:30'
    },
    {
      slot: '11:45'
    },
    {
      slot: '12:0'
    },
    {
      slot: '12:15'
    },
    {
      slot: '12:30'
    },
    {
      slot: '12:45'
    },
    {
      slot: '13:0'
    },
    {
      slot: '13:15'
    },
    {
      slot: '13:30'
    },
    {
      slot: '13:45'
    },
    {
      slot: '14:0'
    },
    {
      slot: '14:15'
    },
    {
      slot: '14:30'
    },
    {
      slot: '14:45'
    },
    {
      slot: '15:0'
    },
    {
      slot: '15:15'
    },
    {
      slot: '15:30'
    },
    {
      slot: '15:45'
    },
    {
      slot: '16:0'
    },
    {
      slot: '16:15'
    },
    {
      slot: '16:30'
    },
    {
      slot: '16:45'
    },
  ];

  useEffect(() => {
    setselectedDate(formData.DateOfService ? formData.DateOfService : '07/14/2021');
    setselectedSlot(formData.TimeOfService ? formData.TimeOfService : null);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [formData]);

  useEffect(() => {
    setTimeout(() => {
      getAvailableSlots();
    }, 0);
  }, [selectedDate]);

  const onResolved = () => {
    dispatch({
      type: "SET_STEP",
      step: state.step + 1
    });
    return;
  };

  const goToSummary = () => {
    dispatch({
      type: "SET_STEP",
      step: 7
    });
    return;
  }

  const handleNext = () => {
    if (selectedSlot) {
      refRecaptcha.current.execute();
      let obj = {
        "DateOfService": selectedDate,
        "TimeOfService": selectedSlot,
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), process.env.REACT_APP_SECRET_KEY).toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        }
      });
    } else {
      refRecaptcha.current.reset();
      toast.error("Please Select a Slot.", {
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

  const getAvailableSlots = async () => {

    slots &&
      slots.map((item) => {
        const { slot, isBooked } = item;
        let time_12hr = moment(slot, ["HH:mm"]).format("h:mm A");
        let req_time = moment(slot, ["HH:mm"]).format("HH:mm:00");
        let hour = `${time_12hr.slice(0, 2).replace(":", "")} ${time_12hr.slice(-2)}`;
        _slots.push({
          time_12hr: time_12hr,
          time_24hr: slot,
          isBooked: isBooked,
          hour: hour,
          req_time: req_time
        });
        // console.log("=====", groupby(_slots, "hour"));
      });

    _slots = _.groupBy(_slots, "hour");
    setavailableSlots(_slots);

  };

  if (loading) return <div style={{ textAlign: "center" }}><ClipLoader color={color} loading={loading} size={100} /></div>;

  return (
    <div className="App">
      <div className="row">
        <div className="col-lg-5 col-md-5 col-12 mb-3 lh-22">
          <div className="overlap-group10">
            <div className="eventName">Event Name</div>
          </div>
          <div className="d-flex mt-3">
            <div className="address-1 roboto-medium-black-18px-22 col-lg-3 col-md-4 col-3 text-right pl-0">Address:</div>
            <div className="address-2 roboto-normal-black-18px-2">6301 N. Western Ave<br />Chicago, IL 60659
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="text-3 roboto-medium-black-18px-22 col-lg-3 col-md-4 col-3  text-right pl-0">Phone:<br />Email:<br />Website:</div>
            <div className="text-4 roboto-normal-black-18px-2">
              (800)-325-1812<br />info@prism.org<br />prism.org</div>
          </div>
          <div className="d-flex mt-4">
            <div className="hours roboto-medium-black-18px-22 col-lg-3 col-md-4 col-3 text-right pl-0">Dates:</div>
            <div className="text-5 roboto-normal-black-18px-2">
              Monday, July 12<br />Tuesday, July 13<br />Wednesday, July 14<br />Thursday, July 15
            </div>
            <div className="text-6 roboto-normal-black-18px-2 ml-3">
              9am-1pm<br />4pm-8pm<br />9am-1pm<br />4pm-8pm
            </div>
          </div>
          <div className="btn-directions mt-4 col-lg-6 col-md-8">
            GET DIRECTIONS
          </div>
        </div>
        <div className="col-lg-7 col-md-7 col-12 addressMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.2012640176413!2d-87.6917052845552!3d41.99595597921298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd1dd7c7704d5%3A0x965bfba71b4353b7!2s6301%20N%20Western%20Ave%2C%20Chicago%2C%20IL%2060659%2C%20USA!5e0!3m2!1sen!2sin!4v1625936751040!5m2!1sen!2sin"
            frameBorder="0"
            title="Prism Health Lab"
            style={{ border: 0, height: "100%", width: "100%" }}
            allowFullScreen=""
          />
        </div>
      </div>
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <div className="select-a-time-slot">Available Dates</div>
      <div className="mt-2 mb-5 row">
        {
          dates.map((item, index) => (
            <div className="col-lg-3 col-md-3 col-6 mt-2" key={index}>
              <div className={"btn-date" + (selectedDate === item.key ? ' active' : '')} onClick={() => {
                setselectedSlot(null);
                setselectedDate(item.key);
              }}>
                {item.value}
              </div>
            </div>

          ))
        }
      </div>
      <div className="select-a-time-slot">Select a time slot</div>
      {
        availableSlots &&
        Object.keys(availableSlots).map((slot, index) => (
          <div className={"row mr-0 slot " + (index >= 4 && !showMoreTimes ? 'd-none' : '')} key={index}>
            <div className="col-lg-2 col-md-2 col-3 slotTime">
              <div className="overlap-group14">
                <div className="address-3 roboto-normal-black-18px-2">{slot}</div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-9">
              <div className="vertical-divider row">
                {availableSlots[slot].map((item, i) => (
                  <div className="col-lg-3 col-md-3 col-4 pr-0 timeSlot" key={i}>
                    <div className={(selectedSlot && selectedSlot.time_12hr === item.time_12hr ? 'overlap-group6' : 'overlap-group14')} onClick={() => setselectedSlot(item)}>
                      <div className={"x900-am" + (selectedSlot && selectedSlot.time_12hr === item.time_12hr ? ' roboto-normal-white-18px-2' : ' roboto-normal-black-18px-2')}>{item.time_12hr}</div>
                    </div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        ))
      }
      <div className="w-100 mt-3 d-flex justify-content-between">
        {
          slots.length >= 4 && !showMoreTimes ?
            <div className="select-more-times cursor-pointer" onClick={() => setshowMoreTimes(true)}>
              Show more times
            </div>
            :
            <div className="select-more-times cursor-pointer" onClick={() => setshowMoreTimes(false)}>
              Hide more times
            </div>
        }
        <div className="text-7 roboto-medium-black-18px-2">Only 1 time slot per service</div>
      </div>
      <div className="mt-5 mb-5 pb-5 float-right">
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px" onClick={handleNext}>NEXT</button>
        {
          formData && formData.ConsentForms && formData.ConsentForms.Signature ?
            <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
            : null
        }
      </div>
      <Recaptcha
        onResolved={onResolved}
        ref={refRecaptcha}
        sitekey="6Ld-96kbAAAAANMg6o3MbINxeqVFrKP7VFiRAmpz"
      />
      <ToastContainer />
    </div>
  );
}

export default Step1;
