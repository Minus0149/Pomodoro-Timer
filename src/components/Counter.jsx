import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import "./Counter.css";

import React from "react";

const Counter = ({ type, setMinutes, minutes }) => {
	const Increment = () => {
		if (type === "Session" && minutes.session < 60) {
			setMinutes({
				...minutes,
				session: minutes.session + 1,
			});
		}
		if (type === "Break" && minutes.break < 60) {
			setMinutes({
				...minutes,
				break: minutes.break + 1,
			});
		}
	};

	const Decrement = () => {
		if (type === "Session" && minutes.session > 1) {
			setMinutes({
				...minutes,
				session: minutes.session - 1,
			});
		}
		if (type === "Break" && minutes.break > 1) {
			setMinutes({
				...minutes,
				break: minutes.break - 1,
			});
		}
	};
	return (
		<div className="counter-contianer">
			<div className="counter-heading">{type} : </div>
			<div className="counter">
				<button
					className="icon"
					onClick={Decrement}
					onTouchStart={(e) => {
						e.currentTarget.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						e.currentTarget.classList.remove(`active`);
					}}
				>
					<BiMinusCircle />
				</button>
				{type === "Session" ? minutes.session : minutes.break}
				<button
					className="icon"
					onClick={Increment}
					onTouchStart={(e) => {
						e.currentTarget.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						e.currentTarget.classList.remove(`active`);
					}}
				>
					<BiPlusCircle />
				</button>
			</div>
		</div>
	);
};

export default Counter;
