let Events = require("../models/events");
let Slots = require("../models/slots");

dataController = {};

dataController.sendData = (req, res) => {
  let result = {
    emergencyRelationShipList: [
      { label: "Self", value: "Self" },
      { label: "Spouse", value: "Spouse" },
      { label: "Child", value: "Child" },
      { label: "Legally adopted child", value: "Legally adopted child" },
      { label: "Stepchild", value: "Stepchild" },
      { label: "Grandchild", value: "Grandchild" },
    ],
    languageList: [
      {
        key: 'English',
        value: 'English'
      },
      {
        key: 'Spanish',
        value: 'Spanish'
      },
      {
        key: 'Chinese',
        value: 'Chinese'
      },
      {
        key: 'French',
        value: 'French'
      },
      {
        key: 'Portugese',
        value: 'Portugese'
      },
      {
        key: 'German',
        value: 'German'
      },
      {
        key: 'Italian',
        value: 'Italian'
      },
      {
        key: 'Arbic',
        value: 'Arbic'
      },
      {
        key: 'Korean',
        value: 'Korean'
      },
      {
        key: 'Japanese',
        value: 'Japanese'
      },
      {
        key: 'Decline to Specify',
        value: 'Decline to Specify'
      }
    ],
    raceList: [
      {
        key: 'American Indian or Alaskan Native',
        value: 'American Indian or Alaskan Native'
      },
      {
        key: 'Asian',
        value: 'Asian'
      },
      {
        key: 'Black or African American',
        value: 'Black or African American'
      },
      {
        key: 'Native Hawaiian or Pacific Islander',
        value: 'Native Hawaiian or Pacific Islander'
      },
      {
        key: 'White',
        value: 'White'
      },
      {
        key: 'Other Race',
        value: 'Other Race'
      },
      {
        key: 'Decline to Specify',
        value: 'Decline to Specify'
      }
    ],
    ethnicityList: [
      {
        key: 'Hispanic or Latinx',
        value: 'Hispanic or Latinx'
      },
      {
        key: 'Not Hispanic or Latinx',
        value: 'Not Hispanic or Latinx'
      },
      {
        key: 'Decline to Specify',
        value: 'Decline to Specify'
      },
    ],
    genderList: [
      {
        key: 'Male',
        value: 'Male'
      },
      {
        key: 'Female',
        value: 'Female'
      },
      {
        key: 'Transgender',
        value: 'Transgender'
      },
      {
        key: 'Non-Binary',
        value: 'Non-Binary'
      },
      {
        key: 'Other',
        value: 'Other'
      },
      {
        key: 'Unknown',
        value: 'Unknown'
      },
      {
        key: 'Decline to Specify',
        value: 'Decline to Specify'
      }
    ],
    relationShipList: [
      { label: "Spouse", value: "Spouse" },
      { label: "Grandparent", value: "Grandparent" },
      { label: "Grandchild", value: "Grandchild" },
      { label: "Nephew or Niece", value: "Nephew or Niece" },
      { label: "Foster Child", value: "Foster Child" },
      { label: "Ward", value: "Ward" },
      { label: "Stepson or Stepdaughter", value: "Stepson or Stepdaughter" },
      { label: "Child", value: "Child" },
      { label: "Employee", value: "Employee" },
      { label: "Unknown", value: "Unknown" },
      { label: "Handicapped Dependent", value: "Handicapped Dependent" },
      { label: "Sponsored Dependent", value: "Sponsored Dependent" },
      { label: "Dependent of a Minor Dependent", value: "Dependent of a Minor Dependent" },
      { label: "Significant Other", value: "Significant Other" },
      { label: "Mother", value: "Mother" },
      { label: "Father", value: "Father" },
      { label: "Emancipated Minor", value: "Emancipated Minor" },
      { label: "Organ Donor", value: "Organ Donor" },
      { label: "Cadaver Donor", value: "Cadaver Donor" },
      { label: "Injured Plaintiff", value: "Injured Plaintiff" },
      { label: "Child Where Insured Has No Financial Responsibility", value: "Child Where Insured Has No Financial Responsibility" },
      { label: "Life Partner", value: "Life Partner" },
      { label: "Dependent", value: "Dependent" },
      { label: "Other Relationship", value: "Other Relationship" },
    ],
    insuranceCompanies: [
      { label: "NO INSURANCE - HRSA PROGRAM", value: "NO INSURANCE - HRSA PROGRAM" },
      { label: "BCBS", value: "BCBS" },
      { label: "Zelis Payments", value: "Zelis Payments" },
      { label: "SELF PAY CASH", value: "SELF PAY CASH" },
      { label: "SELF PAY CREDIT CARD", value: "SELF PAY CREDIT CARD" },
      { label: "AETNA", value: "AETNA" },
      { label: "Amerigroup,", value: "Amerigroup," },
      { label: "Anthem and their affiliates", value: "Anthem and their affiliates" },
      { label: "ANTHEM MAINE HEALTH", value: "ANTHEM MAINE HEALTH" },
      { label: "BLUE CHOICE", value: "BLUE CHOICE" },
      { label: "CIGNA", value: "CIGNA" },
      { label: "EMPIRE", value: "EMPIRE" },
      { label: "GOLDEN RULE", value: "GOLDEN RULE" },
      { label: "HEALTH PLAN", value: "HEALTH PLAN" },
      { label: "HEALTH PLAN OF SC", value: "HEALTH PLAN OF SC" },
      { label: "HEALTHY BLUE", value: "HEALTHY BLUE" },
      { label: "HUMANA", value: "HUMANA" },
      { label: "MEDICAID", value: "MEDICAID" },
      { label: "MEDICARE", value: "MEDICARE" },
      { label: "MOLINA", value: "MOLINA" },
      { label: "TRAVELERS", value: "TRAVELERS" },
      { label: "UNICARE", value: "UNICARE" },
      { label: "UNITED HEALTH CARE", value: "UNITED HEALTH CARE" },
      { label: "WPS-TRICARE East Region", value: "WPS-TRICARE East Region" },
      { label: "WPS-TRICARE For Life (TDEFIC)", value: "WPS-TRICARE For Life (TDEFIC)" },
      { label: "OTHER", value: "OTHER" }
    ],
    groupList: [
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
    ],
    questionList: [
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
  }
  Events.find()
    .then(async events => {
      await Slots.find()
        .then(slots => {
          res.send({ status: true, data: {...result, events, slots} });
        }).catch(err => {
          res.status(500).send({
            message: "Some error occurred while retrieving slots."
          });
        });
    }).catch(err => {
      res.status(500).send({
        message: "Some error occurred while retrieving events."
      });
    });

}

module.exports = dataController;