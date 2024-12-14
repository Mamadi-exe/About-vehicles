
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Navbar, Modal, Form, Button} from "react-bootstrap";
import styles from './Navbar.module.css';
import { useTheme } from '../Theme/Theme.jsx';

function Navigationbar() {
  const URL = "http://localhost:8000";
  // const URL = "https://raw.githubusercontent.com/Mamadi-exe/WarVehicles-/main/db.json";

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
  }, [theme]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <Navbar collapseOnSelect expand="lg" className={`${styles.navbar} ${scrolled ? "scrolled" : ''}`}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={require('../Images/Logo.jpg')} alt="Logo" className={styles.navbarBrandImg} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" variant="dark">
          <Nav className="me-auto">
            <Nav.Link 
              href="/" 
              className={activeLink === "/" ? `${styles.active} ${styles['navbar-link']}` : styles['navbar-link']} 
              onClick={() => onUpdateActiveLink('/')}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#Bios" 
              className={activeLink === "Bios" ? `${styles.active} ${styles['navbar-link']}` : styles['navbar-link']} 
              onClick={() => onUpdateActiveLink('Bios')}
            >
              About me
            </Nav.Link>
            

            <Nav.Item>
              <label className={styles.switch}>
                <input type="checkbox" className={styles.checkbox} onChange={toggleTheme} checked={theme === 'dark'}></input>
                <span className={styles.slider}></span>
              </label>
            </Nav.Item>
          </Nav>
          
          
          <Nav>
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
          </Nav>
          <button className={styles.Contactme} onClick={handleShow}><span>Contact me</span></button>
          
        </Navbar.Collapse>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Briefly describe why you are contacting me </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={handleClose} className="SendEmail">
              Send email
            </Button>
          </Modal.Footer>
          </Modal>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
