import React, { useContext, useRef, useState } from 'react';
import SignaturePad from "react-signature-canvas";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { AppContext } from "../store/app";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function Step6() {

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  const today = moment().toDate();
  const todayDate = moment(today).format('MM/DD/YYYY');
  const signature = useRef(null);
  const [signatureImage, setsignatureImage] = useState(formData.signature ? formData.signature : null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    dispatch({
      type: "SET_FORM_DATA",
      formData: {
        signature: signatureImage
      }
    });
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
      <div className="row justify-content-between">
        <div className="col-lg-2 col-md-3 col-12">
          <div className="consentForm">
            <p className="text-center first-name-1 roboto-medium-black-24px w-100 mt-3 mb-3">HIPAA</p>
            <div className="text-center roboto-normal-black-18px-2">
              <button className="border-1px-mist-gray consentFormBtn active" onClick={handleClickOpen}>Click to View</button>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-12">
          <div className="consentForm">
            <p className="text-center first-name-1 roboto-medium-black-24px w-100 mt-3 mb-3">Pfizer</p>
            <div className="text-center roboto-normal-black-18px-2">
              <button className="border-1px-mist-gray consentFormBtn active" onClick={handleClickOpen}>Click to View</button>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-12">
          <div className="consentForm">
            <p className="text-center first-name-1 roboto-medium-black-24px w-100 mt-3 mb-3">Telehealth</p>
            <div className="text-center roboto-normal-black-18px-2">
              <button className="border-1px-mist-gray consentFormBtn active" onClick={handleClickOpen}>Click to View</button>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-12">
          <div className="consentForm">
            <p className="text-center first-name-1 roboto-medium-black-24px w-100 mt-3 mb-3">Consent</p>
            <div className="text-center roboto-normal-black-18px-2">
              <button className="border-1px-mist-gray consentFormBtn active" onClick={handleClickOpen}>Click to View</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <label className="signLabel">
            e-Signature:
          </label>
        </div>
        <div className="col-12 mt-3">
          <div className="signDiv">
            {
              signatureImage ?
                <div style={{ position: "relative", marginBottom: 20 }}>
                  <img src={signatureImage} alt="img" style={{ width: "100%", height: "100%" }} />
                </div>
                :
                <div style={{ position: "relative", marginBottom: 20 }}>
                  <SignaturePad penColor='black' ref={signature}
                    canvasProps={{ height: 250, className: 'signCanvas' }} backgroundColor={"white"} />
                </div>
            }
            <div className="mt-3 mb-3">
              <hr className="consentHR" />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                {
                  signatureImage ?
                    <div>
                      <label className="text-center first-name-1 roboto-medium-black-24px">
                        Patient Signature
                      </label>
                      <br />
                      <label className="text-center first-name-1 roboto-medium-black-24px">
                        {
                          formData.firstName && formData.lastName ?
                            `${formData.firstName} ${formData.lastName}`
                            : 'Neha Patel'
                        }
                      </label>
                      <br />
                      <label className="text-center first-name-1 roboto-medium-black-24px">
                        {todayDate}
                      </label>
                    </div>
                    : null
                }
              </div>
              <div className="col-lg-6 col-md-6 col-12" style={{ margin: "auto" }}>
                <div className="d-flex justify-content-end">
                  {
                    !signatureImage ?
                      <div className="roboto-normal-black-18px-2">
                        <button className="border-1px-mist-gray consentFormBtn signature active" onClick={() => {
                          // onNextClick();
                          const data = signature.current.toData();
                          if (data && data.length === 0) {
                            toast.error('Not allowed blank signature.', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          } else {
                            const t = signature.current.toDataURL('image/png');
                            setsignatureImage(t);
                          }
                        }}>Save</button>
                      </div>
                      : null

                  }
                  <div className="roboto-normal-black-18px-2">
                    <button className="border-1px-mist-gray consentFormBtn signature ml-3" onClick={() => {
                      signature.current && signature.current.clear();
                      setsignatureImage(null);
                    }}>Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Consent Form"}</DialogTitle>
        <DialogContent>
          <embed src="https://prism.org/wp-content/uploads/2021/05/Prism-Health-Lab-Consent-Form.pdf"
            frameBorder="0" width="100%" height="450px" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Step6;
