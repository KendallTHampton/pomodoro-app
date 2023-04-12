import React from "react";
import styles from "./TimeSettings.module.css";
import {useContext} from "react";
import Context from "../../../store/Context.js";
import {Divider} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const TimeSettings = () => {
    const {userSettings, updateSettings} = useContext(Context);

    return (
        <div className={styles.category}>
            <div className={styles.categoryHeader}>
                <AccessTimeRoundedIcon
                    sx={{
                        color: "#0fa7a28f",
                    }}
                />
                <h4>TIMER</h4>
            </div>
            <div className={styles.timeSettingsBody}>
                <h4>Time (minutes)</h4>
                <div className={styles.timerInputs}>
                    <div className={styles.timeSettingsInputs}>
                        <div className={styles.timeSettingsInput}>
                            <p>Pomodoro</p>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={userSettings.focusTime}
                                onChange={(e) => {
                                    if (e.target.value > 60) {
                                        e.target.value = 60;
                                    }
                                    updateSettings({
                                        focusTime: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.timeSettingsInput}>
                            <p>Short Break</p>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={userSettings.breakTime}
                                onChange={(e) => {
                                    if (e.target.value > 60) {
                                        e.target.value = 60;
                                    }
                                    if (e.target.value < 1) {
                                        e.target.value = 1;
                                    }
                                    updateSettings({
                                        breakTime: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.timeSettingsInput}>
                            <p>Long Break</p>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={userSettings.longBreakTime}
                                onChange={(e) => {
                                    if (e.target.value > 60) {
                                        e.target.value = 60;
                                    }
                                    if (e.target.value < 1) {
                                        e.target.value = 1;
                                    }
                                    updateSettings({
                                        longBreakTime: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.timeSettingsSelections}>
                        <p>Long Break Cycle</p>
                        <div className={styles.timeSettingsInput}>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={userSettings.cycles}
                                onChange={(e) => {
                                    if (e.target.value > 60) {
                                        e.target.value = 60;
                                    }
                                    updateSettings({
                                        cycles: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Divider
                sx={{
                    height: "2px",
                    backgroundColor: " #f7f7f7",
                    margin: "2rem 0",
                }}
            />
        </div>
    );
};

export default TimeSettings;
