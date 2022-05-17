import React, { Component } from 'react';
import { Context } from '../context';
import styled from "styled-components";


const Container=styled.div`
    position:absolute;
    top:75px;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.2);
    z-index:300;
    display:flex;
    justify-content:center;
    align-items:center;
    
    
`


const ModalWrapper=styled.div`
    width:30%;
    min-height:60%;
    background:#fff;
    border-radius:0.5rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    
    .list {
        display:flex;
        gap:1rem;
        

    }
    
    .box-cont {
        position:relative;
        border:1px solid var(--mainBlack);
        min-width:30px;
        min-height:30px;
        margin:0.5rem 0;
        cursor:pointer;

        
    }

    .color-cont {
        position:relative;
        border:none;
        width:20px;
        height:20px;
        cursor:pointer;
        margin:0.5rem 0;
        
    }
    .img img {
        width:100px;
        height:100px;
        object-fit:cover;
    }

    input[type="radio"]{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        width:100%;
        height:100%;

    }

    
    label {
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        height:100%;
    }

    input[type="radio"] {
        
        opacity:0.01;
        z-index:300;
    }

    .addCart {
        background:var(--mainGreen);
        color:#fff;
        padding:10px;
        margin:2rem 0;
        text-transform:uppercase;
        border:none;
        cursor:pointer;
        
    }

    

    .box-input:checked+label {
        background:black;
        color:#fff;
        width:100%;
        height:100%;
        
    }

    .color-input:checked+label {
        border:1px solid #5ECE7B;
        padding:1px;
       
    }
`

const Label=styled.label`
    background:${props=>props.item} content-box;
`

export default class ModalProduct extends Component {

   
    
    static contextType=Context;
  render() {
      const {showModal,modalProduct,currentSymbol,getAttributes,products,checkAttributes,errorMessage}=this.context;
   
      
    if(showModal) {
        const {id,gallery,attributes,prices,name,brand}=modalProduct;
      const price=prices[prices.indexOf(prices.find(x=>x.currency.symbol===currentSymbol))].amount;
        return <Container>
            <ModalWrapper>
            <span>{errorMessage}</span>
                <div className="img">
                    <img src={gallery[0]} alt="img"/>
                </div>
                
                <div className="name">
                    <span>{brand} {name}</span>
                </div>
                <div className="price">
                    <h2>Price : {currentSymbol} {price}</h2>
                </div>
                <div className="attributes">
                   
                    {
                        attributes.map(attribute=>(
                            <div key={attribute.name} className="attributeCategory">
                            <span>{attribute.name}</span>
                            <div className="list">
                            {attribute.items.map(item=>(
                                
                                attribute.name!=="Color"?
                                <div key={item.id} className="box-cont"  >
                                    <input onClick={()=>getAttributes(id,attribute.name,item.value)}  className="box-input" type="radio" name={id+attribute.name} clicked={item.value===products.find(x=>x.id===id).selected?.find(x=>x.name===attribute.name)?.value?"true":"false"}/>
                                    <label htmlFor={item.id}>{item.value}</label>
                                </div>:
                                
                                <div key={item.id} className="color-cont" >
                                    <input onClick={()=>getAttributes(id,attribute.name,item.value)}  className="color-input" type="radio" name={id+attribute.name} clicked={item.value===products.find(x=>x.id===id).selected?.find(x=>x.name===attribute.name)?.value?"true":"false"}/>
                                    <Label className="label" item={item.value} htmlFor={item.id}></Label>
                                </div>
                            ))}

                            </div>
                            </div>

                            
                            
                        ))
                    }
                   
                </div>
                <button onClick={()=>checkAttributes(id)} className="addCart">Add to Cart</button>
            </ModalWrapper>
        </Container>
    }
   
      
    
  }
}

