import React, { useContext } from 'react';
import { AppContext } from "../store/app";

function Step6() {

	const [state, dispatch] = useContext(AppContext);
	
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
		<div className="App">
			<div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
				<button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
				<button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>NEXT</button>
			</div>
		</div>
	);
}

export default Step6;
