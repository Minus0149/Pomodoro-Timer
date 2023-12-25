import "./Pomodoro.css";
import React, { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import useSound from "use-sound";
import bell from "../assets/bell.wav";

const Pomodoro = () => {
	const [secondsLeft, setSecondsLeft] = useState(25 * 60);
	const [timer, setTimer] = useState();
	const [paused, setPaused] = useState(true);
	const [mode, setMode] = useState("session");

	const [play] = useSound(bell, { volume: 0.7 });

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
		setMode("session");
	};

	const pause = () => {
		clearInterval(timer);
		setPaused(true);
	};

	useEffect(() => {
		if (secondsLeft === 0 && mode === "session") {
			clearInterval(timer);
			play();
			setMode("break");
			setSecondsLeft(5 * 60);
			setPaused(true);
		}
		if (secondsLeft === 0 && mode === "break") {
			clearInterval(timer);
			setSecondsLeft(25 * 60);
			setMode("session");
			play();
			setPaused(true);
		}
	}, [secondsLeft, timer]);

	useEffect(() => {
		return () => clearInterval(timer);
	}, [timer]);

	return (
		<div className="pomodoro">
			<h2>{mode === "session" ? "Session" : "Break"}</h2>
			<div className="timer">
				{Math.floor(secondsLeft / 60) < 10
					? `0${Math.floor(secondsLeft / 60)}`
					: Math.floor(secondsLeft / 60)}
				:{secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60}
			</div>
			<div className="buttons">
				<button
					onClick={paused ? start : pause}
					onTouchStart={(e) => {
						e.target.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						setTimeout(() => {
							e.target.classList.remove(`active`);
						}, 100);
					}}
				>
					{paused ? "start" : "pause"}
				</button>
				<button
					onClick={stop}
					onTouchStart={(e) => {
						e.target.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						setTimeout(() => {
							e.target.classList.remove(`active`);
						}, 100);
					}}
				>
					<BiReset className="icon" />
				</button>
			</div>
		</div>
	);
};

export default Pomodoro;
