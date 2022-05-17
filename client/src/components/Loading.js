import React, { Component } from 'react';
import LoadingGif from ".././gif/loading-arrow.gif";
import styled from 'styled-components';



const Container=styled.div`
    text-align:center;

    
    
`
export default class Loading extends Component {
  render() {
    return (
      <Container >
        <div className="loading"
        >
          <h1>The content is loading... Please Wait</h1>
          <img src={LoadingGif} alt="loading-gif"/>
          </div>
      </Container>
    )
  }
}
