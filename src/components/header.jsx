import React from "react";
import Logo from "../Logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";


function CollapsibleExample() {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-header px-2 fixed-top bg-opacity-50 ">
        <Navbar.Brand className="text-dark" href="#home">
          <img alt="" src={Logo} width="70" height="70" className="rounded" />{" "}
          BewVeD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link onClick={()=>{
              navigate('/')
            }} className="bond">
              <NavLink  style={{ textDecoration: "none", color: 'black' }} exact to="/" activeClassName="active">
                Accueil
              </NavLink>
            </Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/Formation')
            }}  className="bond">
              <NavLink  style={{ textDecoration: "none", color: 'black' }} to="/Formation"  activeClassName="active">
                Formation
              </NavLink>
            </Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/Formateur')
            }} className="bond">
              <NavLink className="bond" style={{ textDecoration: "none", color: 'black' }} to="/Formateur" activeClassName="active">
                Formateur
              </NavLink>
            </Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/Apprenant')
            }} className="bond">
              <NavLink className="bond" style={{ textDecoration: "none", color: 'black' }} to="/Apprenant" activeClassName="active">
                Apprenants
              </NavLink>
            </Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/Groupes')
            }} className="bond">
              <NavLink className="bond" style={{ textDecoration: "none", color: 'black' }} to="/Groupes" activeClassName="active">
                Groupes
              </NavLink>
            </Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/Promotion')
            }} className="bond">
              <NavLink className="bond" style={{ textDecoration: "none", color: 'black' }} to="/Promotion" activeClassName="active">
                Promotion
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

function Header() {
  return (
    <header>
      <CollapsibleExample />
    </header>
  );
}

export default Header;
