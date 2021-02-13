import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

import RequestPage from "../../pages/RequestPage";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./HowWorks.css";

const HowWorks = ({ header, steps, order_button, elem_header }) => {
  return (
	  <section id="how-it-works" className="section-content">	
	  <div className="block-header">
        <h2>{header}</h2>
        {elem_header ? <h4 className="main_color">{elem_header}</h4> : null}
	  </div>
	  <Row>
        {steps.map((item, key) => {
         console.log(item)
         let panelClassName = 'bottom-side' + (item.number == '3' ? ' third' : '');
        	if (item.elem_header && item.elem_header != 'elem_header')   
        	return (
              <Col xs={12} md={4} key={key} className={panelClassName}>
                  <div className={`img-container-${item.name}`} />
                  <h3 className="main_color">{item.elem_header}</h3>
                  <ul>
	                  <li>{item.description}</li>
	                  <li>{item.description_2}</li>
	                  <li>{item.description_3}</li>
	                  <div className="comment">{item.comment}</div>
	                  {item.comment_3 ? <div className="comment">{item.comment_3}</div> : null}
                  </ul>
              </Col>
            );
          })}	    
	  </Row>
	  <Row className="centered padd">
      <Route path="/request_page" component={RequestPage} />
      <Link className="center" to={`/request_page`}>
        <Button className="orange_back">{order_button}</Button>
      </Link>
      </Row>
	  </section>
  );
};

export default HowWorks;
