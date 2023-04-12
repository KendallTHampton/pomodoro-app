import React from 'react'
import Context from '../../../store/Context'
import {useContext} from 'react'
import {Divider} from '@mui/material'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styles from './Settings.module.css'
import TimeSettings from './TimeSettings'
import ColorsSettings from './ColorsSettings';
import SoundSettings from './SoundSettings';


const Settings = () => {

    const {userSettings, dispatchWhichModal} =
        useContext(Context);
    const {focusTime, breakTime, longBreakTime, cycles} = userSettings;
    const timer = [focusTime, breakTime, longBreakTime, cycles]

    return (
        <div className={styles.modal}>
            <div className={styles.modal__header}>
                <h4>Settings</h4>
                <DisabledByDefaultIcon
                    className={styles.modal__closeButton}
                    onClick={() => {
                        timer.every(timerNumber => timerNumber > 0) ? dispatchWhichModal({type: 'TOGGLE_CLOSE_MODAL'}) : alert('You did not set the timer correctly. Please set the timer to a number greater than 0.')
                    }}
                >
                </DisabledByDefaultIcon>
            </div>
            <Divider
                sx={{
                    height: "2px",
                    backgroundColor: "#f7f7f7",
                }}
            />
            <div className={styles.modal__body}>
                <form>
                    <TimeSettings />
                    <ColorsSettings />
                    <SoundSettings />

                </form>
            </div>
        </div>

    )
}

export default Settings