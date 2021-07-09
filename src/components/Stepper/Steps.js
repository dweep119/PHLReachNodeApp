import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Steps as steps_ } from "../../utils/steps";

import { AppContext } from "../../store/app";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [state] = useContext(AppContext);

    return (
        <div className={classes.root}>
            <Stepper activeStep={state.step - 1} alternativeLabel>
                {steps_.map((item, index) => (
                    <Step key={index}>
                        <StepLabel>{item.name}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}