import React, { useContext } from 'react';
import { AppContext } from "../store/app";

function Step3() {

	const [state, dispatch] = useContext(AppContext);

	const handleNext = () => {
		localStorage.setItem('step', state.step + 1);
		dispatch({
			type: "SET_STEP",
			step: state.step + 1
		});
		return;
	};

	const handleBack = () => {
		localStorage.setItem('step', state.step + 1);
		dispatch({
			type: "SET_STEP",
			step: state.step - 1
		});
		return;
	};

	return (
		<div className="App">
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-5 pl-0">
					<label className="first-name roboto-medium-black-24px w-100">Preferred Language
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="w-100 d-flex mt-3">
						<div className="row">
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">English</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Spanish</div>
							</div>
							<div className="overlap-group17 border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-white-18px-2">Chinese</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Korean</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">French</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Portuguese</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Italian</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">German</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Arabic</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Japanese</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-2"></div>
				<div className="overlap-group2 col-5 pr-0">
					<label className="first-name roboto-medium-black-24px w-100">Race
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="w-100 d-flex mt-3">
						<div className="row">
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">American Indian or Alaskan Native</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Asian</div>
							</div>
							<div className="overlap-group17 border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-white-18px-2">Black or African American</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">White</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Other Race</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Decline to Specify</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-5 pl-0">
					<label className="first-name roboto-medium-black-24px w-100">Ethnicity
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="w-100 d-flex mt-3">
						<div className="row">
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Hispanic or Latinx</div>
							</div>
							<div className="overlap-group17 border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-white-18px-2">Not Hispanic or Latinx</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Decline to Specify</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-2"></div>
				<div className="overlap-group2 col-5 pr-0">
					<label className="first-name roboto-medium-black-24px w-100">Gender
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="w-100 d-flex mt-3">
						<div className="row">
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Male</div>
							</div>
							<div className="overlap-group17 border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-white-18px-2">Female</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Other</div>
							</div>
							<div className="overlap-group border-1px-mist-gray ml-2 mt-2">
								<div className="surname roboto-normal-black-18px-2">Unknown</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-5 pl-0">
					<label className="first-name roboto-medium-black-24px w-100">Height
					</label>
					<div className="w-100 d-flex mt-3">
						<input className="overlap-group first-name border-1px-mist-gray" id="height" name="lastname"
							placeholder="5’6”" />
						<div className="flex-row-item roboto-normal-black-18px-2">feet/inches</div>
					</div>
				</div>
				<div className="col-2"></div>
				<div className="overlap-group2 col-5 pr-0">
					<label className="first-name roboto-medium-black-24px w-100">Weight
					</label>
					<div className="w-100 d-flex mt-3">
						<input className="overlap-group first-name border-1px-mist-gray" id="weight" name="lastname"
							placeholder="132 lbs" />
						<div className="flex-row-item roboto-normal-black-18px-2">pounds</div>
					</div>
				</div>
			</div>
			<div className="w-100 d-flex justify-content-end mt-5 mb-3">
				<button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
				<button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
			</div>
		</div>
	);
}

export default Step3;
