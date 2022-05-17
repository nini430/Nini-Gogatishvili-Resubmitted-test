import React, { Component } from 'react';
import styled from 'styled-components';
import { Context } from '../context';



const Container=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
border-bottom:1px solid  #E5E5E5;
padding:1rem 0;

    .brand {
        font-size:30px;
    }
    .name {
        font-size:30px;
        font-weight:300;
    }
    .price {
        font-size:24px;
    }
    .attrName {
        font-size:18px;
        text-transform:uppercase;
        font-family:"Roboto Condensed";
    }

    .attr {
        display:flex;
        gap:2rem;
    }

    input[type="radio"] {
        z-index:300;
        opacity:0.01;
    }
    label {
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .box-cont {
        position:relative;
        min-width:40px;
        min-height:40px;
        padding:5px;
        border:1px solid var(--mainBlack);

    }

    .color-cont {
        position:relative;
        width:25px;
        height:25px;

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
        color:#fff;
    }

    .color-input:checked+label {
        padding:1px;
        border:1px solid var(--mainGreen);
    }

      .one-img {
        width:200px;
        height:300px;
        object-fit:cover;
      }
       
    }

    .gallery {
        display:flex;
        gap:2rem;
    }

    .increment-decrement {
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        align-items:center;
    }

    .increment-decrement span {
        border:1px solid var(--mainBlack);
        padding:10px 15px;
        font-size:22px;
        cursor:pointer;
    }
    .quantity {
        font-size:22px;
    }

    .images {
        width:200px;
        height:300px;
        position:relative;
        overflow-y:hidden;

        img {
            width:200px;
            height:300px;
            object-fit:cover;
        }
    }

    



    

`
const Label=styled.label`
    background:${props=>props.item} content-box;
`

const SingleImage=styled.img`
    display:flex;
    flex-direction:column;
    transform:translateY(${props=>props.slideIndex*(-100)}%);
`

const Arrow=styled.span`
    position:absolute;
    bottom:1rem;
    right:${props=>props.direction==="left"?"3rem":"1rem"};
    background:rgba(0,0,0,0.73);
    padding:5px;
    cursor:pointer;
`

export default class ProductInCart extends Component {
   
    state={
        slideIndex:0
    }

    handleClick=(direction)=>{
        if(direction==="left") {
            this.state.slideIndex>0?
            this.setState(()=>{
                return {
                    slideIndex:this.state.slideIndex-1
                }
            }):
            this.setState(()=>{
                return {
                    slideIndex:this.props.product.gallery.length-1
                }
            })
        }else{
            this.state.slideIndex<this.props.product.gallery.length-1?
            this.setState(()=>{
                return {
                    slideIndex:this.state.slideIndex+1
                }
            }):
            this.setState(()=>{
                return {
                    slideIndex:0
                }
            })
        }
    }
    

   
    static contextType=Context;
  render() {
      const {identity,attributes,gallery,prices,name,brand,quantity}=this.props.product;
      const {index}=this.props;
      const {currentSymbol,cartContent,increment,decrement}=this.context;
      const price=prices[prices.indexOf(prices.find(x=>x.currency.symbol===currentSymbol))].amount;
     
     
        
    

    return (
      <Container>
          <div className="info">
              <h1 className="brand">{brand}</h1>
              <h2 className="name">{name}</h2>
              <h3 className="price">{currentSymbol} {price}</h3>
              <div className="attributes">
                  {attributes.map((attribute)=>(
                      <div key={attribute.name}  className="attribute">
                      <h2 className="attrName">{attribute.name}</h2>
                      <div className="attr">
                      {attribute.items.map((item)=>(
                          attribute.name!=="Color"?
                          <div key={item.id} className="box-cont">
                              <input className="box-input" type="radio" name={attribute.name+index} defaultChecked={cartContent[index]?.["identity"]?.includes(attribute.name+item.value)?true:false}/>
                              <label htmlFor={item.id}>{item.value}</label>
                          </div>:
                          <div key={item.id} className="color-cont">
                            <input className="color-input" type="radio" name={attribute.name+index} defaultChecked={cartContent[index]?.["identity"]?.includes(attribute.name+item.value)?true:false}/>
                              <Label item={item.value} htmlFor={item.id}></Label>
                          </div>
                      ))}
                      </div>
                      </div>
                     
                  ))}
                  
              </div>
          </div>
          <div className="gallery">
            
            <div className="increment-decrement">
                <span onClick={()=>increment(identity)}>+</span>
                <p className="quantity">{quantity}</p>
                <span onClick={()=>decrement(identity)}>-</span>
            </div>
                <div className="img-container">
            {gallery.length===1 ? <img className="one-img" src={gallery[0]} alt="img"/>:

            <div className="images">
                {gallery.map(image=>{
                    return <SingleImage key={image} slideIndex={this.state.slideIndex} src={image} alt="img"/>
                })}
                <Arrow direction="left" onClick={()=>this.handleClick("left")}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</Arrow>
                <Arrow direction="right" onClick={()=>this.handleClick("right")}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></Arrow>
            </div>
            }
            </div>
            
          
          </div>
      </Container>
    )
  }
}

