
import React from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import FactsCard from '../FactsCard/FactsCard';
import { Link } from 'react-router-dom';
import styles from './Facts.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner.jsx';
// import Placeholder from 'react-bootstrap/Placeholder';


export default function Facts() {
  const [tankFacts, setTankFacts] = useState([]);
  const [planeFacts, setPlaneFacts] = useState([]);
  const [shipFacts, setShipFacts] = useState([]);
  const [prototypeFacts, setPrototypeFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tankResponse = await axios.get('http://localhost:8000/TankFacts');
        const planeResponse = await axios.get('http://localhost:8000/PlaneFacts');
        const shipResponse = await axios.get('http://localhost:8000/ShipFacts');
        const prototypeResponse = await axios.get('http://localhost:8000/PrototypeFacts');
        
        setTankFacts(tankResponse.data);
        setPlaneFacts(planeResponse.data);
        setShipFacts(shipResponse.data);
        setPrototypeFacts(prototypeResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after all requests complete
      }
    };

    fetchData();
  }, []);

  if(isLoading === true){
    return <Spinner />
    // return(
    //   <Placeholder as="p" animation="wave">
    //     <Placeholder xs={6} />
    //     <Placeholder className="w-75" />
    //     <br />
    //     <Placeholder className="w-25" />
    //     <Placeholder className="h-100" xs={12}  size="lg"/>
    //     <Placeholder xs={4} className="me-1"/>
    //     <Placeholder xs={4} />
    //     <Placeholder xs={4} />
    //   </Placeholder>
      
    // )
  }

  return (
    
    
    <section className={styles.Facts} id="Facts">
      <Container>
        <Row>
          <Col>
            <h2>Facts</h2>
            
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum adipisci aperiam itaque vitae, delectus corporis ipsam. Est atque minima eaque nihil mollitia nobis quod, illo ut voluptates ullam aspernatur recusandae!</p>
            <Tabs
              defaultActiveKey="tanks"
              id="facts-tab"
              className={`mb-3 ${styles.Cards}`}
              justify
            >
              
                  <Tab eventKey="tanks" title="Tanks">

                  <Row>
                    {tankFacts.map((tank, index) => (
                      <Col key={index} xs={12} md={4} className="d-flex justify-content-center mb-4">
                        <Link to={`/TankFacts/${tank.id}`}>
                          <FactsCard {...tank} />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="planes" title="Planes">
                  <Row>
                    {planeFacts.map((plane, index) => (
                      <Col key={index} xs={12} md={4} className="d-flex justify-content-center mb-4">
                        <Link to={`/PlaneFacts/${plane.id}`}>
                          <FactsCard {...plane} />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="ships" title="Ships">
                  <Row>
                    {shipFacts.map((ship, index) => (
                      <Col key={index} xs={12} md={4} className="d-flex justify-content-center mb-4">
                        <Link to={`/ShipFacts/${ship.id}`}>
                          <FactsCard {...ship} />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="prototypes" title="Prototypes">
                  <Row>
                    {prototypeFacts.map((prototype, index) => (
                      <Col key={index} xs={12} md={4} className="d-flex justify-content-center mb-4">
                        <Link to={`/PrototypeFacts/${prototype.id}`}>
                          <FactsCard {...prototype} />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Tab>
              
              
            </Tabs>
          </Col>
        </Row>
      </Container>
    </section>
    
  );
}

