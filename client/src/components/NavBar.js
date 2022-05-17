import React, { Component } from 'react';
import { Context } from '../context';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import shoppingIcon from "../icons/VSF.svg";
import downArrow from "../icons/downArrow.svg";
import cart from "../icons/cart.svg";
import CartOverlay from './CartOverlay';
import { Link } from 'react-router-dom';

const Container=styled.div`
    width:90vw;
    margin:auto;
    height:80px;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    align-items:center;
    

    .nav-links {
        display:flex;
        gap:0.3rem;
        
    }


    .nav-links a {
        text-decoration:none;
        color:var(--mainBlack);
        text-transform:uppercase;
        padding:25px 15px;
        display:block;
        margin:auto;

    }

    .nav-links .active {
        color:var(--mainGreen);
        border-bottom:1px solid var(--mainGreen);
    }

    .shoppingIcon {
        justify-self:center;
    }

    .overlays {
        justify-self:end;
        display:flex;
        gap:1rem;

        .currency {
            cursor:pointer;
            
        }

        .symbol {
            font-size:18px;
            margin-right:4px;

        }

        .cart {
            cursor:pointer;
            position:relative;
        }

        .black-circle {
            position:absolute;
            width:17px;
            height:17px;
            border-radius:50%;
            background:black;
            top:-30%;
            right:-40%;
            color:#fff;
            display:flex;
            justify-content:center;
            align-items:center;
            
        }
    }

`

const OverlayContainer=styled.div`
    position:absolute;
    top:75px;
    left:0;
    bottom:0;
    right:0;
    background:rgba(57, 55, 72, 0.22);
   
`

export default class NavBar extends Component {
    static contextType=Context;
    NavRef=React.createRef();
    cartRef=React.createRef();
    OverlayRef=React.createRef();
    
    
    
    
   closeNav=(event)=>{
       if(this.NavRef.current?.contains(event.target)) {
           
       }else{
           this.context.hideCurrency();
       }
   }

   closeOverlay=(event)=>{
       if(this.OverlayRef.current?.contains(event.target)||this.cartRef.current?.contains(event.target)) {

       }else{
           this.context.hideOverlay();
       }
   }
    


    componentDidMount() {
        document.addEventListener("click",this.closeNav);
        document.addEventListener("click",this.closeOverlay);
    
    }
    
  render() {
    const {all,clothes,tech,currentSymbol,toggleSwitcher,toggleOverlay,totalQuantity,showCartOverlay}=this.context;
    
    
    
    return (
      <Container>
          <div className="nav-links">
              <NavLink to="/">
                  {all.category?.name}
              </NavLink>
              <NavLink to="/clothes">
                  {clothes.category?.name}
              </NavLink>
              <NavLink to="/tech">
                  {tech.category?.name}
              </NavLink>
          </div>
          <div className="shoppingIcon">
            <img src={shoppingIcon} alt="shopping-icon"/>
          </div>
          <div  className="overlays">
            <div ref={this.NavRef} onClick={()=>toggleSwitcher()} className="currency">
                <span className="symbol">{currentSymbol}</span>
                <img  src={downArrow} alt="down-arrow"/>
            </div>
            <div ref={this.cartRef}  onClick={()=>toggleOverlay()} className="cart">
                <Link to="/">
           {totalQuantity!==0 && <div className="black-circle">{totalQuantity}</div> } 
                <img  src={cart} alt="cart"/>
                </Link>
                
                
            </div>
                {showCartOverlay &&
                    <OverlayContainer>
                    <div ref={this.OverlayRef} className="overlay">
                        <CartOverlay />
                    </div>
                    </OverlayContainer>
                 }
                

            
            </div>
            
      </Container>
    )
  }
}


