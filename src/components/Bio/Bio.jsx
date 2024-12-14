
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import styles from './Bio.module.css';
import React from 'react';

export default function Bio() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className={styles.Bio} id="Bios">
      <Container>
        <Row>
          <Col>
            <div className={styles.Biobx}>
              <h2>What this page contains</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit ea,<br></br> incidunt sit sapiente odio rerum, inventore minima quaerat animi sint cum, pariatur id aliquam totam quos. Ipsum porro facilis explicabo.</p>
              <Carousel responsive={responsive} infinite={true} className={styles["Bio-slider"]}>
                <div className={styles.Card}>
                  <img src={require('../Images/P51.jpeg')} alt="" />
                  <h5>Facts about planes</h5>
                </div>
                <div className={styles.Card}>
                  <img src={require('../Images/Tiger_1.jpeg')} alt="" />
                  <h5>Facts about tanks</h5>
                </div>
                <div className={styles.Card}>
                  <img src={require('../Images/Yamato.jpeg')} alt="" />
                  <h5>Facts about ships</h5>
                </div>
                <div className={styles.Card}>
                  <img src={require('../Images/The_Convair_YB-60.jpg')} alt="" />
                  <h5>including Prototypes</h5>
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
