
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from './Banner.module.css';

const URL = "http://localhost:8000";

export default function Banner() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Tanks", "Planes", "Ships"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker); };
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fulltext = toRotate[i];
        let textUpdate = isDeleting ? fulltext.substring(0, text.length - 1) : fulltext.substring(0, text.length + 1);

        setText(textUpdate);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && textUpdate === fulltext) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && textUpdate === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }
    
    const [query, setQuery] = useState('');
    const [tankRecommendations, setTankRecommendations] = useState([]);
    const [planeRecommendations, setPlaneRecommendations] = useState([]);
    const [shipRecommendations, setShipRecommendations] = useState([]);
    const [prototypeRecommendations,  setPrototypeRecommendations] = useState([]);
    const [selectedFact, setSelectedFact] = useState(null);

    useEffect(() => {
      async function fetchTankFacts() {
        try {
          const response = await fetch(`${URL}/TankFacts`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTankRecommendations(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      async function fetchPlaneFacts() {
        try {
          const response = await fetch(`${URL}/PlaneFacts`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPlaneRecommendations(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      async function fetchShipFacts() {
        try {
          const response = await fetch(`${URL}/ShipFacts`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setShipRecommendations(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      async function fetchPrototypeFacts(){
        try{
          const response = await fetch(`${URL}/PrototypeFacts`);
          if(!response.ok){
            throw new Error('Network response was not ok'); 
          }
          const data = await response.json();
          setPrototypeRecommendations(data);
        } catch (error){
          console.error('Fetch error:', error);
        }
          
        
        
      }
      fetchPrototypeFacts();
      fetchShipFacts();
      fetchPlaneFacts();
      fetchTankFacts();
    }, []);

    const filteredTankRecommendations = tankRecommendations.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPlaneRecommendations = planeRecommendations.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredShipRecommendations = shipRecommendations.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPrototypeRecommendations = prototypeRecommendations.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    

    const handleSelectRecommendation = (recommendation) => {
      setSelectedFact(recommendation);
      setQuery('');
    };
    return (
        <section className={styles.Banner} id="home">
          <div className={styles.starrysky}>
                {/* Stars */}
                <div className={styles.star} style={{ top: '10%', left: '20%' }}></div>
                <div className={styles.star} style={{ top: '15%', left: '25%' }}></div>
                
                <div className={styles.star} style={{ top: '20%', left: '40%' }}></div>
                <div className={styles.star} style={{ top: '30%', left: '60%' }}></div>
                <div className={styles.star} style={{ top: '50%', left: '70%' }}></div>
                <div className={styles.star} style={{ top: '60%', left: '80%' }}></div>
                <div className={styles.star} style={{ top: '70%', left: '30%' }}></div>
                <div className={styles.star} style={{ top: '80%', left: '50%' }}></div>
                <div className={styles.star} style={{ top: '90%', left: '20%' }}></div>
                

                {/* Planets */}
                <div className={styles.planet} style={{ top: '25%', left: '15%' }}></div>
                <div className={styles.planet} style={{ top: '55%', left: '35%' }}></div>
                <div className={styles.planet} style={{ top: '75%', left: '55%' }}></div>
                <div className={styles.planet} style={{ top: '35%', left: '75%' }}></div>
            </div>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={6}>
                        <span className={styles.tagline}>Welcome to War Vehicles page</span>
                        <h1>{`You can learn about `}<span className={styles.wrap}>{text}</span></h1>
                        {/* <p>This website includes facts about many vehicles from tanks to planes and ships. Although they may be short yet they include proper facts + technical facts for nerds</p> */}
                        <Form className="d-flex position-relative">
                            <Form.Control
                              type="search"
                              placeholder="Search for any vehicle"
                              className={styles.input}
                              aria-label="Search"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              
                            />
                            
                              {filteredTankRecommendations.length > 0 && query && (
                                <ul className={styles.Recommendation}>
                                  {filteredTankRecommendations.map((item) => (
                                    <Link to={`/TankFacts/${item.id}`}>
                                    <li
                                      key={item.id}
                                      // onClick={() => handleSelectRecommendation(`/TankFacts/${item.id}`)}
                                      className={styles.RecData}



                                    >



                                      <p>{item.title}</p>
                                    </li>
                                    </Link>
                                  ))}
                                </ul>
                              )}
                            
                            {filteredPlaneRecommendations.length > 0 && query && (
                              <ul className={styles.Recommendation}>
                                {filteredPlaneRecommendations.map((item) => (
                                  <Link to={`/PlaneFacts/${item.id}`}>
                                  <li
                                    key={item.id}
                                    onClick={() => handleSelectRecommendation(item)}
                                    className={styles.RecData}
                                      
                                    //   backgroundColor: selectedFact && selectedFact.id === item.id ? '#f0f0f0' : 'white'
                                    
                                  >
                                    
                                    <p>{item.title}</p>
                                  </li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                            {filteredShipRecommendations.length > 0 && query && (
                              <ul className={styles.Recommendation}>
                                {filteredShipRecommendations.map((item) => (
                                  <Link to={`/ShipFacts/${item.id}`}>
                                  <li
                                    key={item.id}
                                    onClick={() => handleSelectRecommendation(item)}
                                    className={styles.RecData}
                                      
                                    //   backgroundColor: selectedFact && selectedFact.id === item.id ? '#f0f0f0' : 'white'
                                    
                                  >
                                    
                                    <p>{item.title}</p>
                                  </li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                            {filteredPrototypeRecommendations.length > 0 && query && (
                              <ul className={styles.Recommendation}>
                                {filteredPrototypeRecommendations.map((item) => (
                                  <Link to={`/PrototypeFacts/${item.id}`}>
                                  <li
                                    key={item.id}
                                    onClick={() => handleSelectRecommendation(item)}
                                    className={styles.RecData}
                                  >
                                    
                                    <p>{item.title}</p>
                                    
                                  </li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                        </Form>
                    </Col>
                    <Col xs={12} md={6} xl={6}>
                        <img src={require('../Images/Bannerpic.png')} alt="Banner" className={styles.BannerImg}/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
