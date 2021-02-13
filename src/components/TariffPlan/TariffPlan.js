import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Popup from "../Popup/Popup";

import planFirst from "../../img/gift.png";
import planSecond from "../../img/heart.png";
import planThird from "../../img/info.png";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import "./TariffPlan.css";

class TariffPlan extends Component {
  state = { small: false, family: false, present: false };

  showModal = tariffName => {
    this.setState({ [tariffName]: true });
  };

  hideModal = tariffName => {
    this.setState({ [tariffName]: false });
  };
  render() {
	  const items = [{id:1,image:planThird,album:this.props.smallAlbum,backName:'main_color_back',colorName:'main_color',className:'product-image main_color_back'},
    	           {id:2,image:planSecond,album:this.props.familyAlbum,backName:'orange_back',colorName:'orange',className:'product-image orange_back'},
    	           {id:3,image:planFirst,album:this.props.presentAlbum,backName:'pink_color_back',colorName:'pink_color',className:'product-image pink_color_back'}];
    return (
    	  <section id="products" className="section-content">	
    		  <div className="block-header">
    	        <h2>{this.props.header}</h2>
    	        {this.props.text_tariff_info ? <h4 className="main_color">{this.props.text_tariff_info}</h4> : null}
    		  </div>
    		  <Row>
    		  {items.map((item, key) => {
                  return (
		    		  <Col xs={12} md={4} key={key} className="product-panel">
		    		  	<div className="product-block">
		    		  		<div className="product-image-container"> 
		    		  		 <div className={item.className}><img src={item.image} alt="small-album" /></div>
		    		  	    </div>
		    		  	    <div className="product-price-container gray_color_back">
		    	              {item.album.price}
		    		  	    </div>
		    		  	    <div className="product-details-container">
		    		  	      <h4 className={item.colorName}>{item.album.album_name}</h4>
		    	              <ul className={item.colorName}>
		    	                {item.album.description_1 ? <li><span>{item.album.description_1}</span></li> : null }
		    	                {item.album.description_2 ? <li><span>{item.album.description_2}</span></li> : null }
		    	                {item.album.description_3 ? <li><span>{item.album.description_3}</span></li> : null }
		    	                {item.album.description_4 ? <li><span>{item.album.description_4}</span></li> : null }
		    	              </ul>		    		  	      
		    		  	    </div>
		    		  	    <div className="product-action-container">
		    	            <Link
		    	              to={{
		    	                pathname: `/request_page/`,
		    	                state: {
		    	                  tariffName: item.album.album_name,
		    	                  albumPrice: item.album.price,
		    	                  someInfo: "someInfo here 123"
		    	                }
		    	              }}
		    	            >
			    		          <Button className={item.backName}>להזמין</Button>
			    		        </Link>
		    		  	    </div>
		    		  	 </div>   
		    		  </Col>
            	  )})};
    		  </Row>
    	  </section>
     );
  }
}

export default TariffPlan;
