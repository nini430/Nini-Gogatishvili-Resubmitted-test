import React,{Component} from "react";
import './App.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import { ContextProvider } from "./context";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import PDP from "./pages/PDP";
import CurrencyNav from "./components/CurrencyNav";
import ModalProduct from "./components/ModalProduct";
import Cart from "./pages/Cart";

export const client=new ApolloClient({
  cache:new InMemoryCache(),
  uri:"http://localhost:4000"
})


export class App extends Component {
  render() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <NavBar/>
        <CurrencyNav/>
        <ModalProduct/>
      
      <Routes>
        <Route path="/" element={<CategoryPage/>}/>
        <Route path="clothes" element={<CategoryPage/>}/>
        <Route path="tech" element={<CategoryPage/>}/>
        <Route path="details" element={<PDP/>}/>
        <Route path="clothes/details" element={<PDP/>}/>
        <Route path="tech/details" element={<PDP/>}/>
        <Route path="cart" element={<Cart/>}/>
      </Routes>
      </ContextProvider>
    </ApolloProvider>
   
    
  )
}

}

