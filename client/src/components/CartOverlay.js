import React, { Component } from 'react';
import styled from 'styled-components';
import { Context } from '../context';
import { Link } from 'react-router-dom';




const MiniCartWrapper=styled.div`
    position:absolute;
    padding:1rem;
    right:2rem;
    min-width:20%;
    background:white;
    min-height:5%;
    z-index:400;
    overflow-y:scroll;
    ::-webkit-scrollbar {
        width:10px;
    }
    ::-webkit-scrollbar-track {
        background:#f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background:#888;
    }
    ::-webkit-scrollbar-thumb:hover {
        background:#555;
    }

    .itemsNum {
        font-size:14px;
        margin-bottom:1rem;
        
    }

    .products {
        display:grid;
        grid-template-columns:1fr 1fr;
        margin:1rem 0;
        

    }

    
    .img-container {
        align-self:flex-start;
        display:flex;
        gap:1rem;
        justify-content:space-between;
    }
    .increment-decrement {
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        align-items:center;
    }

    .increment-decrement span {
        width:30px;
        height:30px;
        font-size:25px;
        border:1px solid var(--mainBlack);
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    }

    .img-container img {
        width:150px;
        height:150px;
        object-fit:cover;
    }

    .attributes {
        display:flex;
        gap:0.5rem;
    }

    .box-cont {
        position:relative;
        padding:5px;
        min-width:30px;
        min-height:30px;
        border:1px solid var(--mainBlack);
        
    }
    .color-cont {
        position:relative;
        width:16px;
        height:16px;
    }
    label {
        display:flex;
        justify-content:center;
        align-items:center;
        

    }

    input[type="radio"] {
        opacity:0.01;
        z-index:200;
    }

    input[type="radio"]+label {
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    .box-input:checked+label {
        background:black;
        color:white;
    }
    .color-input:checked+label {
        border:1px solid #5ECE7B;
        padding:1px;
    }

    .totals {
        display:flex;
        justify-content:space-between;
        gap:2rem;
        text-align:left;
    }

    
    
    .buttons {
        display:flex;
        justify-content:space-between;
        gap:2rem;
    }

    .checkout,.view {
        width:190px;
        height:40px;
        border:none;
        background:transparent;
        text-transform:uppercase;
        cursor:pointer;
        
    }

    .checkout {
        background:var(--mainGreen);
        color:#fff;
    }
    .view {
        border:1px solid var(--mainBlack);
    }
    
    
`

const Label=styled.label`
    background:${props=>props.item} content-box;
`



export default class CartOverlay extends Component {
    static contextType=Context;
    
    
    
   
  render() {
      const {cartContent,currentSymbol,increment,decrement,totalQuantity,totalPrice,hideOverlay}=this.context;
      
      
      
          return  (
            <MiniCartWrapper>
            <div className="itemsNum">
            <span ><strong>My Bag</strong>,{totalQuantity} items</span>
            </div>
            <div className="cartContent">
        {cartContent.map((item,indexUnique)=>{
        const {identity,name,brand,gallery,prices,attributes,quantity}=item;
        const price=prices[prices.indexOf(prices.find(x=>x.currency.symbol===currentSymbol))].amount;
        return <div key={indexUnique} className="products">
            <div className="info">
                  <p>{brand}</p>
                  <p>{name}</p>
                  <h3>{currentSymbol} {price}</h3>
                  {
                      attributes.map((attribute,index1)=>(
                          <div key={index1}>
                          <p>{attribute.name}</p>
                          <div className="attributes">
                          {attribute.items.map((item,index)=>(
                              
                              attribute.name!=="Color"?
                              <div key={index} className="box-cont">
                                 
                                  <input className="box-input" type="radio" name={attribute.name+indexUnique} defaultChecked={cartContent[indexUnique]["identity"].includes(attribute.name+item.value)?true:false}/>
                                  
                                 
                                  <label htmlFor={item.value}>{item.value}</label>

                              </div>:
                              <div key={index} className="color-cont">
                                 <input className="color-input" type="radio"  name={attribute.name+indexUnique} defaultChecked={cartContent[indexUnique]["identity"].includes(attribute.name+item.value)?true:false}/>
                                 <Label item={item.value} htmlFor={item.value}></Label>
                              </div>
                          ))}
                          </div>
                          </div>
                      ))
                  }

            </div>
            <div className="img-container">
                <div className="increment-decrement">
                    <span onClick={()=>increment(identity)}>+</span>
                    <p>{quantity}</p>
                    <span onClick={()=>decrement(identity)}>-</span>
                </div>
                <img src={gallery[0]} alt="img"/>
            </div>
        </div>
    })}
    </div>
    <div className="totals">
        <h2>Total</h2>
        <h2> {currentSymbol} {parseFloat(totalPrice).toFixed(2)}</h2>
    </div>
    <div className="buttons">
        <Link to="/cart">
        <button onClick={()=>hideOverlay()} className="view">view bag</button>
        </Link>
        
        <button className="checkout">checkout</button>
    </div>

        </MiniCartWrapper>
          )
         
          
        
    
      
    
  }
}
