import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { initAlbumsTriggered } from "../../redux/actions/initAlbums";

import Modal from "../FlipperForMain/MainModal";
import Preloader from "../../componentsDumb/Preloader/Preloader";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import HeroElement from "../../componentsDumb/HeroElement/HeroElement";

import "./PhotoAlbumExamples.css";

class PhotoAlbumExamples extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, albumNumber: 0 };
  }
  componentDidMount() {
    this.props.initAlbumsTriggered();
  }
  showModal = number => {
	 console.log(number,this.props.images[number]); 
    this.setState({ albumNumber: number, show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      isLoadingImg,
      isLoadingAlb,
      alb,
      mainPageData,
      locale,
      albums,
      authors,
      images,
      isLoading
    } = this.props;
    let mapData;
    let low = albums.length;

    if (!images || images.length <= low || isLoadingImg || isLoadingAlb) {
      return <Preloader />;
    }
    // console.log("this.props:", images.length);

    if (images.filter(Boolean).length >= low) {
      let albums_new = albums.filter(el => {
        return el.display_on_main;
      });
      mapData = albums_new.map(item => {
        return {
          ...item,
          images: images[item.id],
          designer: authors.find(designer => {
            return designer.id === item.designer_id;
          })
        };
      });
      // console.log("mapData", mapData);
    }
    // console.log("images:", images);
    return (
	  <section id="albums">	
		  <HeroElement className="header-hero header-hero-albums" />
	      <p>{mainPageData.description}</p>
		  <Row className="section-content">
		  {images.filter(Boolean).length >= low
              ? mapData.map((item, key) => {
            let cover = item.images.find(img => {
                  return img.is_main === true;
                });
            let count = mapData.indexOf(item) + 1;
        	  return (
	                <Col xs={12} md={4} className="photo-examples-panel" key={key}>
	                <div className="photo-examples-block">
                       <img src={`https://memoriestore.com/static${cover.pic || ""}`} type="button" 
                    	 onClick={() => this.showModal(item.id)} />
                    	<Row className="details">
                    		<Col xs={6} md={6}>
                            <span className="price">{item.images.length * 2 * 5 + 149}{" "}
                            {mainPageData.price}</span>                    		
                    		</Col>
                    		<Col xs={6} md={6}>
                    		{item.images.length * 2} {mainPageData.pages}
                    		</Col>                    		
                        </Row>
                     </div>   
	                </Col>
	              );
		  }) : null};
		  </Row>
		  
          {this.state.show ? (
                  <Modal
                    selectedAlbum={this.props.images[this.state.albumNumber]}
                    show={this.state.show}
                    albumNumber={this.state.albumNumber}
                    handleClose={this.hideModal}
                    strings={mainPageData}
                  />
                ) : null}
            <Row className="centered padd">
              <Link className="center" to={`/photo_album_examples`}>
                <Button className="main_color_back">{mainPageData.more_examples_button}</Button>
              </Link>
            </Row>
	  </section>
    );
  }
}

const mapStateToProps = state => ({
  mainPageData: state.mainPage.photo_album_examples,
  locale: state.switchLocale.locale,
  albums: state.albums.data.results,
  authors: state.albums.data.authors,
  images: state.images.data,
  isLoading: state.albums.isLoading,
  isLoadingImg: state.images.isLoading,
  isLoadingAlb: state.albums.isLoading
});

const mapDispatchToProps = dispatch => ({
  initAlbumsTriggered() {
    dispatch(initAlbumsTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoAlbumExamples);
