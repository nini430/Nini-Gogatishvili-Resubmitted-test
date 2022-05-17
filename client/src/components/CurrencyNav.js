import React, { Component } from 'react';
import styled from "styled-components";
import { Context } from '../context';



const Container=styled.div`
    position:absolute;
    z-index:300;
    width:10vw;
    right:2rem;
    top:65px;
    display:flex;
    flex-direction:column;
    text-align:center;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  


    .sub {
        cursor:pointer;
        display:flex;
        justify-content:center;
        transition:all 1s ease;
        padding:7px 0;
        font-weight:bolder;
        font-size:18px;
        
    }

    .sub:hover {
        background:#eee;
    }
`
export default class CurrencyNav extends Component {
    static contextType=Context;
    
  render() {
    const {showCurrencySwitcher,currencies,toggleSwitcher,changeCurrencySymbol}=this.context;
    if(showCurrencySwitcher===true) {
return (
     <Container>
         {currencies.currencies?.map(currency=>{
             return <span onClick={()=>{toggleSwitcher();changeCurrencySymbol(currency.symbol)}} className="sub" key={currency.symbol}>{currency.symbol} {currency.label}</span>
         })}
    </Container>
)
}}

}
