import "./Pomodoro.css";
import React, { useEffect, useState } from "react";

const Pomodoro = () => {
	const [secondsLeft, setSecondsLeft] = useState(25 * 60);
	const [timer, setTimer] = useState();
	const [paused, setPaused] = useState(true);

	const start = () => {
		setPaused(false);
		const timer = setInterval(() => {
			setSecondsLeft((secondsLeft) => secondsLeft - 1);
			if (secondsLeft === 0) {
				clearInterval(timer);
			}
		}, 1000);
		setTimer(timer);
	};

	const stop = () => {
		clearInterval(timer);
		setSecondsLeft(25 * 60);
		setPaused(true);
	};

	const pause = () => {
		clearInterval(timer);
		setPaused(true);
	};

	useEffect(() => {
		if (secondsLeft === 0) {
			clearInterval(timer);
		}
	}, [secondsLeft, timer]);

	useEffect(() => {
		return () => clearInterval(timer);
	}, [timer]);

	return (
		<div className="pomodoro">
			<div>
				{Math.floor(secondsLeft / 60)}:
				{secondsLeft % 60 ? secondsLeft % 60 : "00"}
			</div>
			<div className="buttons">
				<button onClick={paused ? start : pause}>
					{paused ? "start" : "pause"}
				</button>
				<button onClick={stop}>stop</button>
			</div>
		</div>
	);
};

export default Pomodoro;
