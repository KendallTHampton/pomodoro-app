import React from 'react';
import styles from './SoundSettings.module.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {useContext} from 'react';
import Context from '../../../store/Context';

const SoundSettings = () => {
    const {userSettings, updateSettings} = useContext(Context);

    const {
        tickerSound: tickerSoundFromContext,
        tickerVolume: tickerVolumeFromContext,
        alarmSound: alarmSoundFromContext,
        alarmVolume: alarmVolumeFromContext
    } = userSettings;

    const tickerSounds = ['Clock', 'White Noise', 'Pink Noise', 'None'];

    const alarmSounds = ['Bell', 'Ring', 'Alarm', 'None'];


    const handleTickerSoundChange = (event) => {
        const sound = event.target.value;
        updateSettings({tickerSound: sound});
    };

    const handleAlarmSoundChange = (event) => {
        const sound = event.target.value;
        updateSettings({alarmSound: sound});
    };

    return (
        <div className={styles.category}>
            <div className={styles.categoryHeader}>
                <VolumeUpIcon
                    sx={{
                        color: "#0fa7a28f",
                    }}
                />
                <h4>Sound Settings</h4>
            </div>

            <div className={styles.soundSettingsBody}>
                <div className={styles.soundSettingsInputs}>
                    {/*  TICKER SOUND */}
                    <div className={styles.soundSettingsInput}>
                        <p>Ticker Sound</p>
                        <div className={styles.sounds}>
                            {/* TICKER */}
                            <select
                                className={styles.soundOptions}
                                value={tickerSoundFromContext}
                                onChange={handleTickerSoundChange}
                            >
                                {tickerSounds.map((sound, index) => (
                                    <option className={styles.soundOption} key={index} value={sound}>
                                        {sound}
                                    </option>
                                ))}
                            </select>


                            <div className={styles.soundVolume}>
                                <div className={styles.soundVolumeIndicator}>
                                    <p>{tickerVolumeFromContext}</p>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    className={styles.soundVolume}
                                    value={tickerVolumeFromContext}
                                    onChange={(e) => {
                                        updateSettings({tickerVolume: +e.target.value});
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    {/* ALARM SOUND */}
                    <div className={styles.soundSettingsInput}>
                        <p>Alarm Sound</p>
                        <div className={styles.sounds}>
                            <select
                                className={styles.soundOptions}
                                value={alarmSoundFromContext}
                                onChange={handleAlarmSoundChange}
                            >
                                {alarmSounds.map((sound, index) => (
                                    <option className={styles.soundOption} key={index} value={sound}>
                                        {sound}
                                    </option>
                                ))}
                            </select>

                            <div className={styles.soundVolume}>
                                <div className={styles.soundVolumeIndicator}>
                                    <p>{alarmVolumeFromContext}</p>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    className={styles.soundVolume}
                                    value={alarmVolumeFromContext}
                                    onChange={(e) => {
                                        updateSettings({alarmVolume: +e.target.value});
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoundSettings;
