import React, {useEffect, useState, useContext, useMemo} from "react";
import "./Pomodoro.css"
import Context from "../store/Context";
import {SettingsOutlined} from "@mui/icons-material";
import pomodoroClick from "../assets/pomodoroClick.m4a";


const Pomodoro = () => {



    const clickSound = useMemo(() => new Audio(pomodoroClick), []);


    const {userSettings, dispatchWhichModal, updateSettings, } = useContext(Context)
    const {
        focusTime,
        breakTime,
        longBreakTime,
        colors,
        currentMode,
    } = userSettings

    const [timer, setTimer] = useState(focusTime * 60);
    const modes = ['Focus', 'Break', 'LongBreak']

    useEffect(() => {
        setTimer(focusTime * 60)
    }, [focusTime])

    const [isPaused, setIsPaused] = useState(true);
    const [cycleCount, setCycleCount] = useState(0)

    const startPomodoro = () => {
        setIsPaused(!isPaused)
    }


    useEffect(() => {
        let interval = null;
        if (!isPaused) {
            interval = setInterval(() => setTimer((time) => time - 1), 1000);
        } else clearInterval(interval);

        if (currentMode === "focus" && timer === 0 && !isPaused) {
            setCycleCount((prev) => prev + 1);
            setTimer(breakTime * 60);
            updateSettings({currentMode: "break"});
        }

        if (currentMode === "break" && timer === 0 && !isPaused) {
            if (cycleCount >= parseInt(userSettings.cycles, 10)) {
                setCycleCount(0);
                setTimer(longBreakTime * 60);
                updateSettings({currentMode: "longBreak"});
            } else {
                setTimer(focusTime * 60);
                updateSettings({currentMode: "focus"});
            }
        }

        if (currentMode === "longBreak" && timer === 0 && !isPaused) {
            setCycleCount(0);
            setTimer(focusTime * 60);
            updateSettings({currentMode: "focus"});
        }

        return () => clearInterval(interval);
    }, [
        isPaused,
        timer,
        breakTime,
        focusTime,
        cycleCount,
        userSettings,
        updateSettings,
        longBreakTime,
        currentMode,
        clickSound
    ]);


    const resetPomodoro = () => {
        updateSettings({
            currentMode: 'focus'
        })

        setIsPaused(true)
        setTimer(focusTime * 60)
    }

    const currentTime = `${ Math.floor(timer / 60).toString().padStart(2, '0') }:${ Math.floor(timer % 60).toString().padStart(2, '0') }`

    const modeChangeHandler = (e) => {
        if (e.target.innerText === 'Focus') {
            setIsPaused(true)
            setTimer(focusTime * 60)
            updateSettings({
                currentMode: 'focus'
            })
        }
        if (e.target.innerText === 'Break') {
            setIsPaused(true)
            setTimer(breakTime * 60)
            updateSettings({
                currentMode: 'break'
            })
        }
        if (e.target.innerText === 'LongBreak') {
            setIsPaused(true)
            setTimer(longBreakTime * 60)
            updateSettings({
                currentMode: 'longBreak'
            })
        }
    }


    return (
        <div className="pomodoro-container">
            <div className="pomodoro-container-glass"
                style={{
                    boxShadow: `inset 0 0 2000px 1000px rgba(0,0,0,0.45)`,
                    opacity: "40%"
                }}
            ></div>
            <div className="modes">
                {modes.map((mode, index) => {
                    return (

                        <h1 key={index}
                            className={currentMode === mode.substring(0, 1).toLowerCase() + mode.substring(1) ? 'mode-text active' : 'mode-text'}
                            onClick={modeChangeHandler}
                        >
                            {mode}

                        </h1>
                    )
                })}
            </div>
            <div className="time-display" >
                <h1>{currentTime}</h1>
            </div>
            <div className="pomodoro-actions">
                <button className={`settings-button start-button ${ !isPaused && 'active' }`}
                    onClick={startPomodoro}
                    style={{
                        color: `${ colors[currentMode] }`,
                        transition: 'color 0.5s ease-in-out'
                    }}
                >
                    {isPaused ? 'START' : 'PAUSE'}
                </button>
                <button className="settings-button stop-button" onClick={resetPomodoro}>Reset</button>
                <button
                    className='settings-button'
                    onClick={() => {
                        setIsPaused(true)
                        dispatchWhichModal({type: 'TOGGLE_SETTINGS_MODAL'})
                    }}
                >
                    <SettingsOutlined
                        style={{
                            color: 'gray',
                        }}
                    />
                    Settings
                </button>

            </div>
        </div>

    );
};

export default Pomodoro;
