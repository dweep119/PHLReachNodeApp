import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../store/app";
import moment from "moment";
import _ from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Step1() {

  const [state, dispatch] = useContext(AppContext);
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
  const [selectedDate, setselectedDate] = useState('07/14/2021');
  const [selectedSlot, setselectedSlot] = useState(null);
  const [availableSlots, setavailableSlots] = useState(null);

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
  ];

  const slots1 = [
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
    {
      slot: '17:0'
    },
    {
      slot: '17:15'
    },
    {
      slot: '17:30'
    },
    {
      slot: '17:45'
    },
    {
      slot: '18:0'
    },
    {
      slot: '18:15'
    },
    {
      slot: '18:30'
    },
    {
      slot: '18:45'
    },
    {
      slot: '19:0'
    },
    {
      slot: '19:15'
    },
    {
      slot: '19:30'
    },
    {
      slot: '19:45'
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      getAvailableSlots();
    }, 0);
  });

  const handleNext = () => {
    if (selectedSlot) {
      localStorage.setItem('step', state.step + 1);
      dispatch({
        type: "SET_STEP",
        step: state.step + 1
      });
      return;
    } else {
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
    let arr = [];
    if (selectedDate === '07/12/2021' || selectedDate === '07/14/2021') {
      arr = slots;
    } else {
      arr = slots1
    }

    arr &&
      arr.map((item) => {
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
              9am-1pm<br />4pm-8pm<br />9am-1pm<br />4pm-8pm
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
        {
          dates.map((item, index) => (
            <div className="col-3 pl-0" key={index}>
              <div className={"btn-date" + (selectedDate === item.key ? ' active' : '')} onClick={() => setselectedDate(item.key)}>
                {item.value}
              </div>
            </div>

          ))
        }
      </div>
      <div className="select-a-time-slot">Select a time slot</div>
      <div className="col-12 p-0">
        {
          availableSlots &&
          Object.keys(availableSlots).map((slot, index) => (
            <div className="w-100 mt-4" key={index}>
              <div className="row w-100 m-0">
                <div className="col-2">
                  <div className="overlap-group14">
                    <div className="address-3 roboto-normal-black-18px-22">{slot}</div>
                  </div>
                </div>
                <div className="d-flex col-10 pr-0">
                  {availableSlots[slot].map((item, i) => (
                    <div className={"col-3 " + (i === 0 ? 'vertical-divider pl-30' : '')} key={i}>
                      <div className={(selectedSlot && selectedSlot.time_12hr === item.time_12hr ? 'overlap-group6' : 'overlap-group14')} onClick={() => setselectedSlot(item)}>
                        <div className={"x900-am" + (selectedSlot && selectedSlot.time_12hr === item.time_12hr ? ' roboto-normal-white-18px-2' : ' roboto-normal-black-18px-22')}>{item.time_12hr}</div>
                      </div>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="w-100 mt-3 d-flex justify-content-between">
        <div className="selecte-more-times">Selecte more times</div>
        <div className="text-7 roboto-medium-black-18px-2">Only 1 time slot per service</div>
      </div>
      <div className="mt-5 mb-3 float-right">
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px" onClick={handleNext}>NEXT</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Step1;
