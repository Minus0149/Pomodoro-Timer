import "./Pomodoro.css";
import React, { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import useSound from "use-sound";
import bell from "../assets/bell.wav";
import { IoMdSettings } from "react-icons/io";
import Setting from "./Setting";

const Pomodoro = () => {
	const [minutes, setMinutes] = useState({ session: 25, break: 5 });
	const [secondsLeft, setSecondsLeft] = useState(minutes.session * 60);
	const [timer, setTimer] = useState();
	const [paused, setPaused] = useState(true);
	const [setting, setSetting] = useState(false);
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
		setSecondsLeft(minutes.session * 60);
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
			setSecondsLeft(minutes.break * 60);
			setPaused(true);
		}
		if (secondsLeft === 0 && mode === "break") {
			clearInterval(timer);
			setSecondsLeft(minutes.session * 60);
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
			{setting && (
				<Setting
					minutes={minutes}
					setMinutes={setMinutes}
					setSetting={setSetting}
					stop={stop}
				/>
			)}
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
					className="icon"
					onClick={stop}
					onTouchStart={(e) => {
						e.currentTarget.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						e.currentTarget.classList.remove(`active`);
					}}
				>
					<BiReset />
				</button>
				<button
					className="icon"
					onClick={() => {
						pause();
						setSetting(true);
					}}
					onTouchStart={(e) => {
						e.currentTarget.classList.add(`active`);
					}}
					onTouchEnd={(e) => {
						e.currentTarget.classList.remove(`active`);
					}}
				>
					<IoMdSettings />
				</button>
			</div>
		</div>
	);
};

export default Pomodoro;
