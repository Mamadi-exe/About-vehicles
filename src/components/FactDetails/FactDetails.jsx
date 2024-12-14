


import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row} from 'react-bootstrap';
import Styles from './FactDetails.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Footer from '../Footer/Footer.jsx'

export default function FactDetails() {
    const { type, id } = useParams();
    const [facts, setFacts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8000/${type}/${id}`;
                console.log("Fetching data from URL:", url);
                const result = await axios.get(url);
                setFacts(result.data);
                console.log("Fetched data:", result.data);  // Debugging log
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [type, id]);

    // const renderImage = (value) => {
    //     console.log("Rendering image with URL:", value);  // Debugging log
    //     return (
    //         <OverlayTrigger
    //             key={value}
    //             placement="bottom"
    //             overlay={
    //                 <Popover id={`popover-positioned-bottom`}>
    //                     <Popover.Header as="h3" className={Styles.PopoverHeader}>{facts.title}</Popover.Header>
    //                     <Popover.Body>
    //                         <strong>Holy guacamole!</strong> Check this info.
    //                     </Popover.Body>
    //                 </Popover>
    //             }
    //         >
    //             <Figure key={value}>
    //                 <Figure.Image
    //                     width={500}
    //                     height={300}
    //                     alt="Image"
    //                     src={value}
    //                 />
    //                 <Figure.Caption>{facts.title}</Figure.Caption>
    //             </Figure>
    //         </OverlayTrigger>
    //     );
    // };

    const renderNestedContent = (content, level = 3) => {
        if (typeof content === 'string') {
            return <p>{content}</p>;
        }

        if (typeof content === 'object' && content !== null) {
            return Object.entries(content).map(([key, value]) => {
                const HeadingTag = `h${level}`;
                return (
                    <div key={key}>
                        <HeadingTag>{key}</HeadingTag>
                        {renderNestedContent(value, level + 1)}
                    </div>
                );
            });
        }

        return null;
    };

    const renderContent = (content, level = 2) => {
        if (typeof content === 'string') {
            return <p>{content}</p>;
        }

        if (typeof content === 'object' && content !== null) {
            return Object.entries(content).map(([key, value]) => {
                // if (key === 'ImgUrl' && typeof value === 'string') {
                //     return renderImage(value);
                // }

                const HeadingTag = `h${level}`;
                return (
                    <Accordion defaultActiveKey="Overview and Introduction" key={key} data-bs-theme="dark">
                        <Accordion.Item eventKey={key}>
                            <Accordion.Header><HeadingTag>{key}</HeadingTag></Accordion.Header>
                            <Accordion.Body>
                                {renderNestedContent(value, level + 1)}
                                {/* {value && renderImage(value.ImgUrl)} */}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                );
            });
        }

        return null;
    };

    return (
        <section className={Styles.FactDetailsBody}>
            <Row className={Styles.MainRow}>
                <Col sm={12}>
                    <h1>{facts.title}</h1>
                    <hr></hr>
                    {renderContent(facts.Overview)}
                </Col>
            </Row>
            <Footer/>
        </section>
        
    );
}

