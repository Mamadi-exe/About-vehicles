import Styles from './Spinner.module.css'
import React from 'react'

export default function Spinner(){
    return(
        <div className={Styles.wrapper}>
            <div className={Styles.circle}></div>
            <div className={Styles.circle}></div>
            <div className={Styles.circle}></div>
            <div className={Styles.shadow}></div>
            <div className={Styles.shadow}></div>
            <div className={Styles.shadow}></div>
        </div>
    )
}