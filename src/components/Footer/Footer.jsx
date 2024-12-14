import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Footer.module.css'
import { useState } from 'react';

export default function Footer(){

  const [activeLink, setActiveLink] = useState('home');

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
    return(
        <section className={styles.FooterMain}>
            <Row>
                <Col sm={5} className={styles.CopyRight}>
                    
                    <a 
                    href="/" 
                    className={activeLink === "/" ? `${styles.active} ${styles['footer-link']}` : styles['footer-link']} 
                    onClick={() => onUpdateActiveLink('/')}
                    >
                      Home
                    </a>
                    <a 
                    href="/" 
                    className={activeLink === "/" ? `${styles.active} ${styles['footer-link']}` : styles['footer-link']} 
                    onClick={() => onUpdateActiveLink('/')}
                    >
                      About me
                    </a>
                </Col>
                <Col sm={2}>
                </Col>
                <Col sm={5} className={styles.SocialCol}>
                    
                    <a href="#linkedin" className={styles.Sociala}>
                      <img src={require('../Images/Linkedin.png')} alt="LinkedIn" className={styles.Social}/>
                    </a>
                    <a href="#facebook" className={styles.Sociala}>
                      <img src={require('../Images/Facebook.png')} alt="Facebook" className={styles.Social}/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCKcF7oCzAxgTfanwce9h4bQ" className={styles.Sociala}>
                      <img src={require('../Images/Youtube.png')} alt="YouTube" className={styles.Social}/>
                    </a>
                    <h6>ALL RIGHTS RESERVED 2024</h6>

                </Col>
            </Row>
            
        </section>
    )
}