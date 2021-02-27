import React, { useEffect,useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../img/logo_mem.png";
import LoginImg from "../../img/login.svg";
import FaqPage from "../../pages/FaqPage";
import PhotoAlbumExamples from "../../pages/PhotoAlbumExamples";
import { initHeaderFooterTriggered } from "../../redux/actions/initHeaderFooter";
import { switchLocale } from "../../redux/actions/switchLocale";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import israel from "./IL.png";
import "./HeaderFooter.css";

const HeaderFooter = props => {


    useEffect(() => {
        props.initHeaderFooterTriggered(
            localStorage.getItem("locale") || undefined
        );

    }, []);


  const handleClick = e => {
    switch (e.target.value) {
      case "He_il":
        return props.switchLocale("he_il");
      case "Eng":
        return props.switchLocale("en_us");
      default:
        return console.log("Default Return");
    }
  };
  return (
    <div className={props.className}>
        <button onClick={()=>props.switchLocale("he_il")} >Lang He</button>
        <button onClick={()=>props.switchLocale("en_Us")} >Lang En</button>
	    <Navbar bg="light" expand="lg">
	    <Navbar.Brand href="/"><img src={Logo} alt="memoriestore" /></Navbar.Brand>
	    <Navbar.Toggle aria-controls="basic-navbar-nav" />
	    <Navbar.Collapse id="basic-navbar-nav">
	      <Nav className="mr-auto">
	        <Nav.Link href="/who_we_are">{props.who_we_are}</Nav.Link>
	        <Nav.Link href="/photo_album_examples">{props.albumExamples}</Nav.Link>
	        <Nav.Link href="/gift_cards">{props.gift_cards}</Nav.Link>	        
	        <Nav.Link href="/faq_page">{props.faq}</Nav.Link>
	        <Nav.Link href="/photo_album_examples">{props.forDesigner}</Nav.Link>
	        {props.log_in ? <Nav.Link href="/login_page" className="login">{props.log_in}</Nav.Link> : null }
	      </Nav>
	    </Navbar.Collapse>
	    </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.switchLocale.locale
});
const mapDispatchToProps = dispatch => ({
  initHeaderFooterTriggered(locale) {
    dispatch(initHeaderFooterTriggered(locale));
  },
  switchLocale(locale) {
    dispatch(switchLocale(locale));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderFooter);
