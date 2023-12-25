import Counter from "./Counter";
import "./Setting.css";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const Setting = ({ minutes, setMinutes, setSetting, stop }) => {
	return (
		<div className="setting-container">
			<header className="setting-header">
				<h2>Settings</h2>
				<button
					className="icon"
					onClick={() => {
						setSetting(false);
						stop();
					}}
					onTouchStart={(e) => {
						e.currentTarget.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						e.currentTarget.classList.remove(`active`);
					}}
				>
					<FaXmark />
				</button>
			</header>
			<div className="counters">
				<Counter type="Session" setMinutes={setMinutes} minutes={minutes} />
				<Counter type="Break" setMinutes={setMinutes} minutes={minutes} />
			</div>
		</div>
	);
};

export default Setting;
