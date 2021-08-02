import React, { useContext, useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AppContext } from "../store/app";
import { makeStyles } from "@material-ui/core/styles";
const CryptoJS = require("crypto-js");
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

const RenderQuestions = (props) => {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  const { question } = props;
  const [value, setvalue] = useState({ "QuestionId": question.id, "Answers": question.type === "Choice" ? [] : [question.default] });

  useEffect(() => {
    if (formData.MedicalQuestionnaire && formData.MedicalQuestionnaire.length > 0) {
      let result = formData.MedicalQuestionnaire.filter(item => item.QuestionId === question.id);
      if (result.length > 0) {
        setvalue({ "QuestionId": result[0].QuestionId, "Answers": result[0].Answers })
      }
    }
  }, [formData])

  const onOptionChange = (val, que) => {
    setvalue({ "QuestionId": que.id, "Answers": [val] });

    if (formData.MedicalQuestionnaire && formData.MedicalQuestionnaire.length > 0) {
      let result = formData.MedicalQuestionnaire.filter(item => item.QuestionId === que.id);
      if (result.length > 0) {
        const index = formData.MedicalQuestionnaire.indexOf(result[0]);
        if (index > -1) {
          formData.MedicalQuestionnaire.splice(index, 1);
        }
      }
      let obj = {
        "MedicalQuestionnaire": [...formData.MedicalQuestionnaire, { "QuestionId": que.id, "Answers": [val] }]
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), 'secretKey').toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        },
      });
    } else {
      let obj = {
        "MedicalQuestionnaire": [{ "QuestionId": que.id, "Answers": [val] }]
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), 'secretKey').toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        },
      });
    }

  };

  const onMultiChioce = (val) => {
    console.log('val: ', val);
    setvalue(val);

    if (formData.MedicalQuestionnaire && formData.MedicalQuestionnaire.length > 0) {
      let result = formData.MedicalQuestionnaire.filter(item => item.QuestionId === val.QuestionId);
      if (result.length > 0) {
        const index = formData.MedicalQuestionnaire.indexOf(result[0]);
        if (index > -1) {
          formData.MedicalQuestionnaire.splice(index, 1);
        }
      }
      let obj = {
        "MedicalQuestionnaire": [...formData.MedicalQuestionnaire, val]
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), 'secretKey').toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        },
      });
    } else {
      let obj = {
        "MedicalQuestionnaire": [val]
      }
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), 'secretKey').toString();
      localStorage.setItem('formData', ciphertext);
      dispatch({
        type: "SET_FORM_DATA",
        formData: {
          ...obj
        },
      });
    }

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
    <div className="mb-5 overlap-group2 col-12">
      <label className="first-name-1 roboto-medium-black-24px w-100">{question.title}
      </label>
      {
        question.type === "radio"
          ?
          <div className="col-lg-2 col-md-4 col-6 d-flex justify-content-between pl-0 mt-2">
            <div className={"options cursor-pointer " + (value.Answers[0] === 'Yes' ? 'optionYes' : '')} onClick={(e) => onOptionChange("Yes", question)}>
              Yes
            </div>
            <div className={"options cursor-pointer " + (value.Answers[0] === 'No' ? 'active' : '')} onClick={(e) => onOptionChange("No", question)}>
              No
            </div>
          </div>
          : question.type === "Choice" ?
            <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
              <div className="row">
                {
                  question.choice.map((item, index) => (
                    <div className={setClassName(item, value.Answers)} key={index} onClick={() => {
                      if (value.Answers.length === 0) {
                        onMultiChioce({ "QuestionId": question.id, "Answers": [item] });
                      } else {
                        let res = value.Answers.filter(itm => itm === item);
                        if (res.length > 0) {
                          const index = value.Answers.indexOf(item);
                          if (index > -1) {
                            value.Answers.splice(index, 1);
                          }
                          onMultiChioce({ "QuestionId": question.id, "Answers": [...value.Answers] });
                        } else {
                          onMultiChioce({ "QuestionId": question.id, "Answers": [...value.Answers, item] });
                        }
                      }
                    }}>
                      <div className={setLabelClassName(item, value.Answers)}>{item}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            : question.type === "TextInput" ?
              <div className="col-lg-10 col-md-12 col-12 d-flex mt-3">
                <TextValidator
                  onChange={(event) => onOptionChange(event.target.value, question)}
                  InputProps={{ classes }}
                  value={value.Answers[0]}
                />
              </div>
              : null
      }
    </div>
  )
}

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
      default: "No",
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
      default: "No",
      choice: [],
      isRequired: false,
      errorMessage: ""
    },
    {
      id: 5,
      title: "Do you have any pre-existing medical conditions?",
      type: "radio",
      groupId: 1,
      default: "No",
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

  const handleChange = (panel) => (event, isExpanded) => {
    console.log('panel: ', panel);
    setExpanded(isExpanded ? panel : false);
  };

  const goToSummary = () => {
    dispatch({
      type: "SET_STEP",
      step: 7
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
                    <div className="row w-100">
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="roboto-normal-dark-tan-24px">
                          Questions
                        </div>
                        {
                          questionList.map((question, questionIndex) => (
                            question.groupId === group.id ?
                              <div className="row" key={questionIndex}>
                                <RenderQuestions question={question} />
                              </div>
                              : null
                          ))
                        }
                      </div>
                    </div>
                    <div className="row w-100 justify-content-end">
                      <div className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3 cursor-pointer" style={{ lineHeight: '45px' }} onClick={() => {
                        setExpanded(`panel${group.id + 1}`);
                      }}>Submit</div>
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
            formData && formData.ConsentForms && formData.ConsentForms.Signature ?
              <button className="overlap-group15 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={goToSummary}>GO TO SUMMARY</button>
              : null
          }
        </div>
      </ValidatorForm>
    </div>
  );
}

export default Step5;
