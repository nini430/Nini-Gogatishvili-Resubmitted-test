import React, { Component } from 'react';
import styled from 'styled-components';
import ProductInCart from '../components/ProductInCart';
import { Context } from '../context';


const Container=styled.div`
  width:90vw;
  margin:auto;


  .title {
    font-size:22px;
    text-transform:uppercase;
    font-weight:700;
    padding:2rem 0;
    border-bottom:1px solid  #E5E5E5;
  }
  .empty {
    text-align:center;
    font-size:35px;
    padding:2rem;
  }

  .sum {
    margin:2rem  0;
  }
  .tax,.quantity,.total {
    text-transform:capitalize;
    font-size:24px;
  }

  .order {
    width:300px;
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:var(--mainGreen);
    color:#fff;
    text-transform:uppercase;
    border:none;
    cursor:pointer;
  }

  
`

export default class Cart extends Component {
  static contextType=Context;
  render() {
    const {cartContent,currentSymbol,totalPrice,totalQuantity}=this.context;
    return (
      <Container>
        <div className="title">
          <h1>cart</h1>
        </div>
        {cartContent.length===0 ? <h1 className="empty">Your Cart is Currently Empty</h1>:

        
          cartContent.map((product,index)=>{
            return <ProductInCart key={product.identity} product={product} index={index}/>
          })
        }
{cartContent.length!==0 && 

<div className="sum">
<p className="tax">tax 21% :  <strong>{currentSymbol} {parseFloat(totalPrice*0.21).toFixed(2)}</strong> </p>
<p className="quantity">quantity:  <strong>{totalQuantity}</strong></p>
<p className="total">total: <strong>{currentSymbol} {parseFloat(totalPrice).toFixed(2)}</strong></p>
<button className="order">order</button>
</div>
}
       
      

      </Container>
    )
  }
}

