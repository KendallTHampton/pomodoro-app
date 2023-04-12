import React from 'react'
import Context from '../../../store/Context'
import {useContext} from 'react'
import styles from './Colors.module.css'
import {Divider} from '@mui/material'

const ColorModal = () => {
    const {userSettings, updateSettings, dispatchWhichModal} = useContext(Context)

    const {changeColorOf, colors} = userSettings

    // colors
    const allColors = [
        '#215385',
        '#e99324',
        '#08b598',
        '#c92e2e',
        '#26292b',
        '#370f65',
        '#612d1c',
    ]

    return (
        <div className={styles.colorModal}>
            <div className={styles.colorModalHeader}>
                <h4>Pick A Color</h4>
            </div>
            <Divider sx={{height: '2px', backgroundColor: '#f7f7f7'}} />
            <div className={styles.palette}>
                {allColors.map((color, index) => {
                    return (
                        <div className={styles.paletteWrapper} key={index}>
                            <div
                                className={styles.paletteColor}
                                onClick={() => {
                                    dispatchWhichModal({type: 'TOGGLE_COLOR_MODAL'})
                                    updateSettings({
                                        colors: {
                                            ...colors,
                                            [changeColorOf]: color,
                                        },
                                    })
                                }}
                                style={{
                                    backgroundColor: `${ color }`,
                                }}
                            ></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ColorModal
