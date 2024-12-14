import React from 'react';
import { Col } from "react-bootstrap";
import Styles from './FactsCard.module.css'

export default function FactsCard({title, shortIntro, imgUrl}){
    return(
        <section>
            <Col>
                <div className={Styles.Factsimgbx}>
                    <img src={imgUrl} alt="" />
                    <div className={Styles.Factstxt}>
                        <h4>{title}</h4>
                        <span>{shortIntro}</span>
                    </div>
                    
                </div>
            </Col>
        </section>
    )
}