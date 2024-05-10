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
    console.log('formData.MedicalQuestionnaire: ', formData.MedicalQuestionnaire);
    if (formData.MedicalQuestionnaire && formData.MedicalQuestionnaire.length > 0) {
      let result = formData.MedicalQuestionnaire.filter(item => item.QuestionId === question.id);
      if (result.length > 0) {
        setvalue({ "QuestionId": result[0].QuestionId, "Answers": result[0].Answers })
      }
    }
  }, [formData, question])

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
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
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
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
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
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
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
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ ...formData, ...obj }), process.env.REACT_APP_SECRET_KEY).toString();
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
    <div className="col-12">
      {
        question.parentQuestionId ?
          formData.MedicalQuestionnaire && formData.MedicalQuestionnaire.length > 0
          && formData.MedicalQuestionnaire.map((item, index) => {
            if (question.parentQuestionId === item.QuestionId && question.parentAnswer === item.Answers[0]) {
              return (
                <div className="mb-5 overlap-group2 col-12" key={index}>
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
                      : question.type === "choice" ?
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
                        : question.type === "textInput" ?
                          <div className="col-lg-10 col-md-12 col-12 d-flex mt-3 pr-0 pl-0">
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
            } else {
              return null;
            }
          })
          :
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
                : question.type === "choice" ?
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
                  : question.type === "textInput" ?
                    <div className="col-lg-10 col-md-12 col-12 d-flex mt-3 pr-0 pl-0">
                      <TextValidator
                        onChange={(event) => onOptionChange(event.target.value, question)}
                        InputProps={{ classes }}
                        value={value.Answers[0]}
                      />
                    </div>
                    : null
            }
          </div>
      }
    </div>
  )
}

function Step5() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;

  const { groupList } = state.formData;

  const { questionList } = state.formData;

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
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
          groupList && groupList.map((group, groupIndex) => (
            <Accordion expanded={expanded === `panel${group.index}`} onChange={handleChange(`panel${group.index}`)} key={groupIndex}>
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
                          questionList && questionList.map((question, questionIndex) => (
                            question.groupId === group.id ?
                              <div className="row" key={questionIndex}>
                                <RenderQuestions question={question} />
                              </div>
                              : null
                          ))
                        }
                      </div>
                    </div>
                    {
                      groupList && groupList.length - 1 !== groupIndex ?
                        <div className="row w-100 justify-content-end">
                          <div className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3 cursor-pointer" style={{ lineHeight: '45px' }} onClick={() => {
                            setExpanded(`panel${group.index + 1}`);
                          }}>Submit</div>
                        </div>
                        : null
                    }
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
