import React, { useContext, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AppContext } from "../store/app";
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

function Step5() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;

  const symptomsList = [
    {
      key: 'Shortness of Breath',
      value: 'Shortness of Breath'
    },
    {
      key: 'Cough',
      value: 'Cough'
    },
    {
      key: 'Sore Throat',
      value: 'Sore Throat'
    },
    {
      key: 'Diarrhea',
      value: 'Diarrhea'
    },
    {
      key: 'Chest Pain',
      value: 'Chest Pain'
    },
    {
      key: 'Muscle Aches',
      value: 'Muscle Aches'
    },
    {
      key: 'Rash',
      value: 'Rash'
    },
    {
      key: 'Recent loss of smell or taste',
      value: 'Recent loss of smell or taste'
    },
    {
      key: 'Extreme Fatigue',
      value: 'Extreme Fatigue'
    },
    {
      key: 'Fever above 100 degrees',
      value: 'Fever above 100 degrees'
    },
    {
      key: 'Vomiting or severe nausea',
      value: 'Vomiting or severe nausea'
    },
    {
      key: 'None',
      value: 'None'
    }
  ];
  const aboutUSList = [
    {
      key: 'LinkedIn',
      value: 'LinkedIn'
    },
    {
      key: 'Facebook',
      value: 'Facebook'
    },
    {
      key: 'Instagram',
      value: 'Instagram'
    },
    {
      key: 'Ad',
      value: 'Ad'
    },
    {
      key: 'A friend',
      value: 'A friend'
    },
    {
      key: 'Other',
      value: 'Other'
    }
  ];

  const [expanded, setExpanded] = React.useState('panel1');
  const [isCovidSymptoms, setisCovidSymptoms] = useState(formData.isCovidSymptoms ? formData.isCovidSymptoms : false);
  const [isPublicGatherings, setisPublicGatherings] = useState(formData.isPublicGatherings ? formData.isPublicGatherings : false);
  const [isHealthcareWorker, setisHealthcareWorker] = useState(formData.isHealthcareWorker ? formData.isHealthcareWorker : false);
  const [isCovidSymptoms14, setisCovidSymptoms14] = useState(formData.isCovidSymptoms14 ? formData.isCovidSymptoms14 : false);
  const [existingMedical, setexistingMedical] = useState(formData.existingMedical ? formData.existingMedical : false);
  const [cigarettes, setcigarettes] = useState(formData.cigarettes ? formData.cigarettes : false);
  const [vapingProducts, setvapingProducts] = useState(formData.vapingProducts ? formData.vapingProducts : false);
  const [selectedSymptoms, setselectedSymptoms] = useState(formData.selectedSymptoms ? formData.selectedSymptoms : []);
  const [howLongSymptomsExperience, sethowLongSymptomsExperience] = useState(formData.howLongSymptomsExperience ? formData.howLongSymptomsExperience : '');
  const [isCovidSymptomsVaccine, setisCovidSymptomsVaccine] = useState(formData.isCovidSymptomsVaccine ? formData.isCovidSymptomsVaccine : false);
  const [receivedVaccine, setreceivedVaccine] = useState(formData.receivedVaccine ? formData.receivedVaccine : false);
  const [receivedVaccineFromOther, setreceivedVaccineFromOther] = useState(formData.receivedVaccineFromOther ? formData.receivedVaccineFromOther : false);
  const [vaccineReaction, setvaccineReaction] = useState(formData.vaccineReaction ? formData.vaccineReaction : false);
  const [covidInfection, setcovidInfection] = useState(formData.covidInfection ? formData.covidInfection : false);
  const [severeSymptom, setsevereSymptom] = useState(formData.severeSymptom ? formData.severeSymptom : false);
  const [weekImmuneSystem, setweekImmuneSystem] = useState(formData.weekImmuneSystem ? formData.weekImmuneSystem : false);
  const [isDisabled, setisDisabled] = useState(formData.isDisabled ? formData.isDisabled : false);
  const [healthInformation, sethealthInformation] = useState(formData.healthInformation ? formData.healthInformation : false);
  const [hearAboutUs, sethearAboutUs] = useState(formData.hearAboutUs ? formData.hearAboutUs : []);
  const [otherService, setotherService] = useState(formData.otherService ? formData.otherService : '');


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNext = () => {
    dispatch({
      type: "SET_FORM_DATA",
      formData: {
        expanded,
        isCovidSymptoms,
        isPublicGatherings,
        isHealthcareWorker,
        isCovidSymptoms14,
        existingMedical,
        cigarettes,
        vapingProducts,
        selectedSymptoms,
        howLongSymptomsExperience,
        isCovidSymptomsVaccine,
        receivedVaccine,
        receivedVaccineFromOther,
        vaccineReaction,
        covidInfection,
        severeSymptom,
        weekImmuneSystem,
        isDisabled,
        healthInformation,
        hearAboutUs,
        otherService
      }
    })
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

  const setClassName = (value) => {
    if (selectedSymptoms.length > 0) {
      let res = selectedSymptoms.filter(item => item === value);
      if (res.length > 0) {
        return 'border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group17';
      } else {
        return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
      }
    } else {
      return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
    }
  }

  const setLabelClassName = (value) => {
    if (selectedSymptoms.length > 0) {
      let res = selectedSymptoms.filter(item => item === value);
      if (res.length > 0) {
        return 'roboto-normal-white-18px-2';
      } else {
        return "roboto-normal-black-18px-2";
      }
    } else {
      return "roboto-normal-black-18px-2";
    }
  }

  const setAdditionalClassName = (value) => {
    if (hearAboutUs.length > 0) {
      let res = hearAboutUs.filter(item => item === value);
      if (res.length > 0) {
        return 'border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group17';
      } else {
        return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
      }
    } else {
      return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
    }
  }

  const setLabelAdditionalClassName = (value) => {
    if (hearAboutUs.length > 0) {
      let res = hearAboutUs.filter(item => item === value);
      if (res.length > 0) {
        return 'roboto-normal-white-18px-2';
      } else {
        return "roboto-normal-black-18px-2";
      }
    } else {
      return "roboto-normal-black-18px-2";
    }
  }

  const handleSubmit = () => {
    console.log('event');
  }
  const classes = useStyles();
  return (
    <div className="App medicalQuestinnaorie">
      <ValidatorForm
        onError={errors => console.log(errors)}
        onSubmit={handleSubmit}
      >
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={"heading"}>COVID-19 Testing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="p-3">
              <div className="row mb-5 w-100">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="roboto-normal-dark-tan-24px">
                    Questions
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isCovidSymptoms ? 'active' : '')} onClick={() => setisCovidSymptoms(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isCovidSymptoms ? '' : 'active')} onClick={() => setisCovidSymptoms(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you been in any public gatherings(i.e prayer hall, protests, parties/events/restaurant, etc)?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isPublicGatherings ? 'active' : '')} onClick={() => setisPublicGatherings(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isPublicGatherings ? '' : 'active')} onClick={() => setisPublicGatherings(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Are you a health care worker‚ nursing home worker‚ first responder?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isHealthcareWorker ? 'active' : '')} onClick={() => setisHealthcareWorker(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isHealthcareWorker ? '' : 'active')} onClick={() => setisHealthcareWorker(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you experienced any symptoms in the last 14 days?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isCovidSymptoms14 ? 'active' : '')} onClick={() => setisCovidSymptoms14(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isCovidSymptoms14 ? '' : 'active')} onClick={() => setisCovidSymptoms14(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="roboto-normal-dark-tan-24px">
                    Questions
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Do you have any pre-existing medical conditions?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (existingMedical ? 'active' : '')} onClick={() => setexistingMedical(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (existingMedical ? '' : 'active')} onClick={() => setexistingMedical(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Do you smoke cigarettes or use other tobacco?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (cigarettes ? 'active' : '')} onClick={() => setcigarettes(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (cigarettes ? '' : 'active')} onClick={() => setcigarettes(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Do you use vaping products?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (vapingProducts ? 'active' : '')} onClick={() => setvapingProducts(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (vapingProducts ? '' : 'active')} onClick={() => setvapingProducts(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5 w-100">
                <div className="col-lg-7 col-md-9 col-12">
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you experienced any of these symptoms <span style={{ fontWeight: 400 }}> (select any that apply)</span>
                      </label>
                      <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                        <div className="row">
                          {
                            symptomsList.map((item, index) => (
                              <div className={setClassName(item.value)} key={index} onClick={() => {
                                if (selectedSymptoms.length === 0) {
                                  setselectedSymptoms([item.value])
                                } else {
                                  setselectedSymptoms([...selectedSymptoms, item.value]);
                                }
                              }}>
                                <div className={setLabelClassName(item.value)}>{item.value}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5 w-100">
                <div className="col-lg-7 col-md-9 col-12">
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">How long have you been experiencing these symptoms<span style={{ fontWeight: 400 }}> (in days)</span>
                      </label>
                      <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                        <TextValidator
                          onChange={(event) => sethowLongSymptomsExperience(event.target.value)}
                          InputProps={{ classes }}
                          value={howLongSymptomsExperience}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100 justify-content-end">
                <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={() => {
                  setExpanded('panel2');
                  handleChange('panel2')
                }}>Submit</button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={"heading"}>COVID-19 Vaccine</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="p-3">
              <div className="row mb-5 w-100">
                <div className="col-lg-7 col-md-8 col-12">
                  <div className="roboto-normal-dark-tan-24px">
                    Questions
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isCovidSymptomsVaccine ? 'active' : '')} onClick={() => setisCovidSymptomsVaccine(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isCovidSymptomsVaccine ? '' : 'active')} onClick={() => setisCovidSymptomsVaccine(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you received any vaccinations in the past 2 weeks?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (receivedVaccine ? 'active' : '')} onClick={() => setreceivedVaccine(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (receivedVaccine ? '' : 'active')} onClick={() => setreceivedVaccine(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you receiveed a COVID-19 vaccine from different manufacturer at any time, or did you participate in a COVID-19 vaccine trial?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (receivedVaccineFromOther ? 'active' : '')} onClick={() => setreceivedVaccineFromOther(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (receivedVaccineFromOther ? '' : 'active')} onClick={() => setreceivedVaccineFromOther(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you ever had a serious reaction or fainted after receiving any vaccination?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (vaccineReaction ? 'active' : '')} onClick={() => setvaccineReaction(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (vaccineReaction ? '' : 'active')} onClick={() => setvaccineReaction(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you been diagnosed with COVID-19 infection in the last 90 days?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (covidInfection ? 'active' : '')} onClick={() => setcovidInfection(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (covidInfection ? '' : 'active')} onClick={() => setcovidInfection(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Have you ever had an anaphylactic reaction or had other severe symptoms after receiving another vaccination?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (severeSymptom ? 'active' : '')} onClick={() => setsevereSymptom(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (severeSymptom ? '' : 'active')} onClick={() => setsevereSymptom(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Do you have a medical condition or take medication(s) that may weaken your immune system?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (weekImmuneSystem ? 'active' : '')} onClick={() => setweekImmuneSystem(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (weekImmuneSystem ? '' : 'active')} onClick={() => setweekImmuneSystem(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100 justify-content-end">
                <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={() => {
                  setExpanded('panel3');
                  handleChange('panel3')
                }}>Submit</button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={"heading"}>Additional Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="p-3 w-100">
              <div className="row mb-5 w-100">
                <div className="col-lg-7 col-md-8 col-12">
                  {/* <div className="roboto-normal-dark-tan-24px">
										Questions
									</div> */}
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Are you disabled?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (isDisabled ? 'active' : '')} onClick={() => setisDisabled(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (isDisabled ? '' : 'active')} onClick={() => setisDisabled(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">Any additional personal health information you would like us to be aware of?
                      </label>
                      <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-between pl-0 mt-2">
                        <div className={"options cursor-pointer " + (healthInformation ? 'active' : '')} onClick={() => sethealthInformation(true)}>
                          Yes
                        </div>
                        <div className={"options cursor-pointer " + (healthInformation ? '' : 'active')} onClick={() => sethealthInformation(false)}>
                          No
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">How did you here about us?
                      </label>
                      <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                        <div className="row">
                          {
                            aboutUSList.map((item, index) => (
                              <div className={setAdditionalClassName(item.value)} key={index} onClick={() => {
                                if (hearAboutUs.length === 0) {
                                  sethearAboutUs([item.value])
                                } else {
                                  sethearAboutUs([...hearAboutUs, item.value]);
                                }
                              }}>
                                <div className={setLabelAdditionalClassName(item.value)}>{item.value}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-5 overlap-group2 col-12">
                      <label className="first-name-1 roboto-medium-black-24px w-100">In the future, what other services would you like Prism Health lab to provide?
                      </label>
                      <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                        <TextValidator
                          onChange={(event) => setotherService(event.target.value)}
                          InputProps={{ classes }}
                          value={otherService}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100 justify-content-end">
                <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={() => {
                  setExpanded('');
                  handleChange('')
                }}>Submit</button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </ValidatorForm>
      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}

export default Step5;
