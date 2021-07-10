import React, { useContext } from 'react';
import { AppContext } from "../store/app";

function Step4() {

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
		localStorage.setItem('step', state.step - 1);
		dispatch({
			type: "SET_STEP",
			step: state.step - 1
		});
		return;
	};

	return (
		<div className="App">
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-12 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Do you have Medicare, Medicaid, or another insurance?
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="col-2 d-flex justify-content-between pl-0 mt-2">
						<div className="options active">
							Yes
						</div>
						<div className="options">
							No
						</div>
					</div>
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-6 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Photo of Insurance Card - Front
					</label>
					<input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
						placeholder="Street Address" />
				</div>
				<div className="overlap-group2 col-6 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Photo of Insurance Card - Back
					</label>
					<input type="file" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
						placeholder="Street Address 2" />
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-6 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Primary Insurance Company
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input type="text" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
						placeholder="Primary Insurance Company" />
				</div>
				<div className="overlap-group2 col-6 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Insurance ID #
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input type="text" className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
						placeholder="Insurance ID #" />
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-6 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Group Number
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
						placeholder="Group Number" />
				</div>
				<div className="overlap-group2 col-6 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Plan Name
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
						placeholder="Plan Name" />
				</div>
			</div>
			<div className="mt-5 mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-12 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Is the insured person the same as the patient?
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<div className="col-2 d-flex justify-content-between pl-0 mt-2">
						<div className="options">
							Yes
						</div>
						<div className="options active">
							No
						</div>
					</div>
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-6 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Patient Relationship to Insured
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add" name="lastname"
						placeholder="Patient Relationship to Insured" />
				</div>
				<div className="overlap-group2 col-3 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Date of Birth
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="add2" name="lastname"
						placeholder="Date of Birth" />
				</div>
			</div>
			<div className="mb-5 col-12 d-flex pr-0 pl-0">
				<div className="overlap-group2 col-3 pl-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">First Name
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="state" name="lastname"
						placeholder="First Name" />
				</div>
				<div className="overlap-group2 col-3 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Last Name
						<span className="roboto-medium-tia-maria-24px ml-1">*</span>
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
						placeholder="Last Name" />
				</div>
				<div className="overlap-group2 col-3 pr-0">
					<label className="first-name-1 roboto-medium-black-24px w-100">Middle Name
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="zipcode" name="lastname"
						placeholder="Middle Name" />
				</div>
				<div className="overlap-group2 col-3">
					<label className="first-name-1 roboto-medium-black-24px w-100">Suffix
					</label>
					<input className="overlap-group mt-2 first-name-1 w-100 border-1px-mist-gray" id="city" name="lastname"
						placeholder="City" />
				</div>
			</div>

			<div className="w-100 d-flex justify-content-end mt-5 mb-3">
				<button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
				<button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
			</div>
		</div>
	);
}

export default Step4;