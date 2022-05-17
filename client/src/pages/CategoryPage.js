import React, { Component } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import { Context } from '../context';
import Loading from '../components/Loading';


const Container=styled.div`
    padding:4rem 0;
    margin:auto;
    width:90vw;

    .title {
        font-size:42px;
        color:var(--mainBlack);
        text-transform:capitalize;
        margin-left:15px;
    }

    .products {
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(350px,1fr));
        grid-gap:3rem;
    }


`

export default class CategoryPage extends Component {
    static contextType=Context;
  render() {
    const url=window.location.pathname.slice(1);
    const {all,clothes,tech,loading}=this.context;
    const contextArray=[{...all},{...clothes},{...tech}];
    if(loading) {
        return <Loading/>
    }
 
    let currentCategory=contextArray.find(x=>x.category?.name===url);
    
  
    if(!currentCategory) {
        currentCategory=all;
    }

    const {name,products}={...currentCategory.category};
    
    return (
      <Container>
        <h1 className="title">{name}</h1>
        <div className="products">
        {
            products?.map(product=>{
                return <Product key={product.id} product={product}/>
            })
        }
        </div>
      </Container>

    )
  }
}
