import React from 'react'
import {useContext} from 'react'
import Context from '../../../store/Context'
import {Divider} from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens';
import styles from './ColorsSettings.module.css'

const ColorsSettings = () => {
    const {userSettings, updateSettings, dispatchWhichModal} = useContext(Context)
    const {colors} = userSettings

    return (
        <div className={styles.category}>
            <div className={styles.categoryHeader}>
                <ColorLensIcon
                    sx={{
                        color: "#0fa7a28f",
                    }}
                />
                <h4>COLORS</h4>
            </div>

            <div className={styles.colorSettingsBody}>
                <div className={styles.colorSettingsInputs}>
                    <div className={styles.colorSettingsInput}>
                        <p>Color Themes</p>
                        <div className={styles.colorThemes}>
                            <p>Choose Theme</p>

                            <div className={styles.colorCard}>
                                {Object.entries(colors).map(([key, color], index) => {
                                    return (
                                        <div
                                            className={styles.colorTheme}
                                            key={index}
                                            onClick={() => {
                                                dispatchWhichModal({
                                                    type: "TOGGLE_COLOR_MODAL",
                                                });
                                                updateSettings({
                                                    changeColorOf: key,
                                                });
                                            }}
                                            style={{
                                                backgroundColor: `${ color }`,
                                            }}>

                                        </div>
                                    );
                                })}
                            </div>
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
    )
}

export default ColorsSettings
