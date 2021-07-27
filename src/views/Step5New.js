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

  const groupList = [
    {
      id: 1,
      label: "COVID-19 Testing"
    },
    {
      id: 2,
      label: "COVID-19 Vaccine"
    },
    {
      id: 3,
      label: "Additional Info"
    }
  ];

  const questionList = [
    {
      id: 1,
      title: "Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?",
      type: "radio",
      groupId: 1,
      default: "Yes",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 2,
      title: "Have you been in any public gatherings(i.e prayer hall, protests, parties/events/restaurant, etc)?",
      type: "radio",
      groupId: 1,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 3,
      title: "Are you a health care worker‚ nursing home worker‚ first responder?",
      type: "radio",
      groupId: 1,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 4,
      title: "Have you experienced any symptoms in the last 14 days?",
      type: "radio",
      groupId: 1,
      default: "Yes",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 5,
      title: "Do you have any pre-existing medical conditions?",
      type: "radio",
      groupId: 1,
      default: "Yes",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 6,
      title: "Do you smoke cigarettes or use other tobacco?",
      type: "radio",
      groupId: 1,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 7,
      title: "Do you use vaping products?",
      type: "radio",
      groupId: 1,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 8,
      title: "Have you experienced any of these symptoms (select any that apply)",
      type: "Choice",
      groupId: 1,
      default: "",
      choice: ['Shortness of Breath',
        'Cough',
        'Sore Throat',
        'Diarrhea',
        'Chest Pain',
        'Muscle Aches',
        'Rash',
        'Recent loss of smell or taste',
        'Extreme Fatigue',
        'Fever above 100 degrees',
        'Vomiting or severe nausea',
        'None',],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 9,
      title: "How long have you been experiencing these symptoms (in days)",
      type: "TextInput",
      groupId: 1,
      default: "",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 10,
      title: "Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 11,
      title: "Have you received any vaccinations in the past 2 weeks?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 12,
      title: "Have you receiveed a COVID-19 vaccine from different manufacturer at any time, or did you participate in a COVID-19 vaccine trial?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 13,
      title: "Have you ever had a serious reaction or fainted after receiving any vaccination?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 14,
      title: "Have you been diagnosed with COVID-19 infection in the last 90 days?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 15,
      title: "Have you ever had an anaphylactic reaction or had other severe symptoms after receiving another vaccination?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 16,
      title: "Do you have a medical condition or take medication(s) that may weaken your immune system?",
      type: "radio",
      groupId: 2,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 17,
      title: "Are you disabled?",
      type: "radio",
      groupId: 3,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 18,
      title: "Any additional personal health information you would like us to be aware of?",
      type: "radio",
      groupId: 3,
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 19,
      title: "How did you here about us?",
      type: "Choice",
      groupId: 3,
      default: "",
      choice: ['LinkedIn',
        'Facebook',
        'Instagram',
        'Ad',
        'A friend',
        'Other',],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 20,
      title: "In the future, what other services would you like Prism Health lab to provide?",
      type: "TextInput",
      groupId: 3,
      default: "",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
  ]

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

  const [value, setvalue] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onOptionChange = (val, question) => {
    console.log('val: ', val, question);
    const res = questionList.filter(item => item.id === question.id);
    if (res.length > 0) {
      res[0].default = val;
    }
    setvalue(val);
    dispatch({
      type: "SET_FORM_DATA",
      formData: { covid19: { ...state.formData.covid19, [question.title]: { value: val } } },
    });
  }

  const goToSummary = () => {
    dispatch({
      type: "SET_STEP",
      step: 7
    });
    return;
  }

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

  const setClassName = (value, arr) => {
    if (arr.length > 0) {
      let res = arr.filter(item => item === value);
      if (res.length > 0) {
        return 'border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group17';
      } else {
        return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
      }
    } else {
      return "border-1px-mist-gray ml-2 mt-2 cursor-pointer overlap-group";
    }
  }

  const setLabelClassName = (value, arr) => {
    if (arr.length > 0) {
      let res = arr.filter(item => item === value);
      if (res.length > 0) {
        return 'roboto-normal-white-18px-2';
      } else {
        return "roboto-normal-black-18px-2";
      }
    } else {
      return "roboto-normal-black-18px-2";
    }
  }

  const classes = useStyles();
  return (
    <div className="App medicalQuestinnaorie">
      <ValidatorForm
        onError={errors => console.log(errors)}
        onSubmit={handleNext}
      >
        {
          groupList.map((group, groupIndex) => (
            <Accordion expanded={expanded === `panel${group.id}`} onChange={handleChange(`panel${group.id}`)} key={groupIndex}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={"heading"}>{group.label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  <div className="p-3 w-100">
                    <div className="row mb-5 w-100">
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="roboto-normal-dark-tan-24px">
                          Questions
                        </div>
                        {
                          questionList.map((question, questionIndex) => (
                            question.groupId === group.id ?
                              <div className="row" key={questionIndex}>
                                <div className="mb-5 overlap-group2 col-12">
                                  <label className="first-name-1 roboto-medium-black-24px w-100">{question.title}
                                  </label>
                                  {
                                    question.type === "radio"
                                      ?
                                      <div className="col-lg-2 col-md-4 col-6 d-flex justify-content-between pl-0 mt-2">
                                        <div className={"options cursor-pointer " + (question.default === 'Yes' ? 'optionYes' : '')} onClick={(event) => onOptionChange(event.target.innerHTML, question)}>
                                          Yes
                                        </div>
                                        <div className={"options cursor-pointer " + (question.default === 'No' ? 'active' : '')} onClick={(event) => onOptionChange(event.target.innerHTML, question)}>
                                          No
                                        </div>
                                      </div>
                                      : question.type === "Choice" ?
                                        <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                                          <div className="row">
                                            {
                                              question.choice.map((item, index) => (
                                                <div className={setClassName(item, selectedSymptoms)} key={index} onClick={() => {
                                                  if (selectedSymptoms.length === 0) {
                                                    setselectedSymptoms([item])
                                                  } else {
                                                    let res = selectedSymptoms.filter(itm => itm === item);
                                                    if (res.length > 0) {
                                                      const index = selectedSymptoms.indexOf(item);
                                                      if (index > -1) {
                                                        selectedSymptoms.splice(index, 1);
                                                      }
                                                      setselectedSymptoms([...selectedSymptoms]);
                                                    } else {
                                                      setselectedSymptoms([...selectedSymptoms, item]);
                                                    }
                                                  }
                                                }}>
                                                  <div className={setLabelClassName(item, selectedSymptoms)}>{item}</div>
                                                </div>
                                              ))
                                            }
                                          </div>
                                        </div>
                                        : question.type === "TextInput" ?
                                          <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                                            <TextValidator
                                              onChange={(event) => sethowLongSymptomsExperience(event.target.value)}
                                              InputProps={{ classes }}
                                              value={howLongSymptomsExperience}
                                            />
                                          </div>
                                          : null
                                  }
                                </div>
                              </div>
                              : null
                          ))
                        }
                      </div>
                    </div>
                  </div>
                }
              </AccordionDetails>
            </Accordion>
          ))
        }
        <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
          <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
          <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
          {
            formData && formData.signature ?
              <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
              : null
          }
        </div>
      </ValidatorForm>
    </div>
  );
}

export default Step5;
