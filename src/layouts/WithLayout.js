import React from "react";
import Steps from "../components/Stepper/Steps";
import {
  StepsFlex
} from "../components/styledComponents";
import Footer from "../components/Footers/Footer";
import Header from "../components/Headers/Header";

// import MobileHeader from "./MobileHeader";
import _ from "lodash";
import { Steps as steps_ } from "../utils/steps";

export default (ComposedComponent, title, options) => {
  const withLayout = (props) => {
    const state = localStorage.getItem('step');
    // const [state, dispatch] = useContext(AppContext);
    const activeStep = _.find(steps_, { step_number: parseInt(state) });
    console.log('activeStep: ', activeStep);
//     const onPrevClick = () => {
//       if (state.step > 1) {
//         dispatch({ type: "SET_STEP", step: state.step - 1 });
//       }
//     };

    // const contextRef = React.createRef();

    return (
      <div className="container">

        {/* <MainDesktopFlex className="desktop" style={{ paddingTop: "0px !important", borderTop: "none !important" }}> */}
          {/* {activeStep.step_number != 9 && <div className="ui container"> */}
            <Header />
            <StepsFlex>
              <Steps />
            </StepsFlex>
          {/* </div>} */}

          <div
            style={{
              alignItems: "center",
              // justifyContent: "center",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {/* {activeStep.step_number !== 9 &&  */}
            <div
              className="step-title"
              style={{ height: "100px" }}
            >
              <h1
                className="text-2 roboto-normal-dark-tan-48px"
                style={{
                  // borderBottom: "1px solid #959595",
                  // padding: "10px 30px"
                }}
              >
                {activeStep.name}
              </h1>
            </div>
            {/* } */}
            <ComposedComponent {...props} />
          </div>
        {/* </MainDesktopFlex> */}

        {/* <MainMobileFlex className="mobile">
          <MobileHeader activeStep={activeStep} onPrevClick={onPrevClick} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              flexDirection: "column",
              flex: 1,
              paddingTop: "88px",
            }}
          >
            <ComposedComponent {...props} />
          </div>
        </MainMobileFlex> */}
        <Footer />
      </div>
    );
  };

  return withLayout;
};