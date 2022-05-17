import React, { Component } from 'react';
import { Context } from '../context';
import styled from 'styled-components';
import Loading from '../components/Loading';
import {Markup} from "interweave";



const Container=styled.div`
  padding:3rem 0;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    grid-column-gap:2rem;
   

    .photos {
      display:flex;
      flex-direction:column;
      align-items:center;
    }

    .photos img {
        width:150px;
        height:90px;
        object-fit:cover;
        margin:2rem 0;
        cursor:pointer;
    }

    .mainPhoto img {
        width:500px;
        height:500px;
        object-fit:cover;
    }

    .info {
      .brand,name {
        font-size:30px;
      }

      .name {
        font-weight:300;
      }
    }

    .attributes {
      display:flex;
      gap:1rem;
    }

    .box-cont {
      width:50px;
      height:45px;
      position:relative;
      border:1px solid var(--mainBlack);
      cursor:pointer;
    }

    .color-cont {
      width:40px;
      height:40px;
      position:relative;
      cursor:pointer;
    }
    input[type="radio"] {
      
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      right:0;
      bottom:0;
      
    }

    input[type="radio"] {
      opacity:0.01;
      z-index:300;
    }
    label {
      
      display:flex;
      justify-content:center;
      align-items:center;
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      right:0;
      bottom:0;
    }

    .box-input:checked+label {
      background:var(--mainBlack);
      color:#fff;
    }

    

    .color-input:checked+label {
        border:1px solid #5ECE7B;
        padding:1px;
        
    }



    

    .price {
        font-size:18px;
        font-family:"Roboto Condensed";
        text-transform:uppercase;
    }

    .value {
      font-size:30px;
    }
`

const Button=styled.button` 
  background:${props=>props.disabled===true?"gray":"#5ECE7B"};
  color:#fff;
  border:none;
  width:300px;
  height:50px;
  text-transform:uppercase;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:600;
  cursor:pointer;
  margin-bottom:1rem;
  
`

const Label=styled.label`
    background:${props=>props.itemValue} content-box;
`


export default class PDP extends Component {
  static contextType=Context;
  render() {
    let url=new URLSearchParams(window.location.search).get("item");
    const {products,getProduct,selectMainImage,mainImage,currentSymbol,getAttributes,checkAttributes,addToCart,errorMessage}=this.context;
    
    
    const currentProduct=getProduct(url);
    if(!currentProduct) {
      return <Loading/>
    }
    let {id,name,brand,gallery,prices,attributes,description,inStock}={...currentProduct};
    const price=prices[prices.indexOf(prices.find(x=>x.currency.symbol===currentSymbol))].amount;
    

   
   
    return (
      <Container>
        <div className="photos">
          {
            gallery?.map((image,index)=>{
              return <img onClick={()=>selectMainImage(image)} key={index} src={image} alt="img"/>
            })
          }
        </div>
        <div className="mainPhoto">
          <img src={mainImage!==""?mainImage:gallery[0]} alt="main"/>
        </div>
        <div className="info">
          <span>{errorMessage}</span>
          <h2 className="brand">{brand}</h2>
          <h2 className="name">{name}</h2>
       
          {
            attributes.map(attribute=>(
              <div>
                <h2 className="attr-name">{attribute.name}</h2>
                <div className="attributes">
                {
                  attribute.items.map(item=>(
      
                    attribute.name!=="Color"? 
                     <div className="box-cont">
                      <input onClick={()=>getAttributes(id,attribute.name,item.value)} id={item.id}  className="box-input" type="radio" name={id+attribute.name} clicked={item.value===products.find(x=>x.id===id)?.selected?.find(x=>x.name===attribute.name)?.value?true:false} disabled={!inStock?true:false}/>
                      <label>{item.value}</label>
                    </div>:
                      <div className="color-cont">
                      <input onClick={()=>getAttributes(id,attribute.name,item.value)}  id={item.id} className="color-input" type="radio" name={id+attribute.name} clicked={item.value===products.find(x=>x.id===id)?.selected?.find(x=>x.name===attribute.name)?.value?true:false} disabled={!inStock?true:false} />
                      <Label itemValue={item.value}></Label>
                    </div>
                  ))
                }
                </div>
                </div>
                
                
            ))

          }

          <div className="price-section">
            <h2 className="price">price</h2>
            <h2 className="value"> {currentSymbol} {price} </h2>
          </div>

          <Button disabled={!inStock?true:false}   onClick={currentProduct.attributes.length?()=>checkAttributes(id):()=>addToCart(id)}  >add to cart</Button><br/>
            <Markup content={description}/>
        </div>
        
      </Container>
    )
  }
}
