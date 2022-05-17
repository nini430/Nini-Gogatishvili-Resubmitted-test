import React, { Component } from 'react'
import {gql} from "@apollo/client";
import { client } from './App';

const Context=React.createContext();


const totalQuantity=JSON.parse(localStorage.getItem("totalQuantity"))||0;
const totalPrice=JSON.parse(localStorage.getItem("totalPrice"))||0;
const CartContent=JSON.parse(localStorage.getItem("cartContent"))||[];
const currentSymbol=JSON.parse(localStorage.getItem("currentSymbol"))||"$";




 class ContextProvider extends Component {
    
     state={
         all:{},
         clothes:{},
         tech:{},
         products:[],
         loading:true,
         mainImage:"",
         currentSymbol:currentSymbol,
         currencies:{},
         showCurrencySwitcher:false,
         showModal:false,
         modalProduct:{},
         cartContent:CartContent,
         showCartOverlay:false,
         totalQuantity:totalQuantity,
         totalPrice:totalPrice,
         errorMessage:""

     }
     componentDidMount() {
            this.getData();
            localStorage.setItem("totalQuantity",JSON.stringify(this.state.totalQuantity));
            localStorage.setItem("cartContent",JSON.stringify(this.state.cartContent));
            localStorage.setItem("totalPrice",JSON.stringify(this.state.totalPrice));
            localStorage.setItem("currentSymbol",JSON.stringify(this.state.currentSymbol));
            
            
            this.setState(()=>{
                return {
                    loading:false
                }
            })
     }

     componentDidUpdate() {
        localStorage.setItem("totalQuantity",JSON.stringify(this.state.totalQuantity));
        localStorage.setItem("cartContent",JSON.stringify(this.state.cartContent));
        localStorage.setItem("totalPrice",JSON.stringify(this.state.totalPrice));
        localStorage.setItem("currentSymbol",JSON.stringify(this.state.currentSymbol));

        
     }

     getData=async()=>{
         this.GET_CATEGORY=gql`
            query getCategory($input:CategoryInput!) {
                    category(input:$input) {
                        name
                        products {
                            id
                            name
                            inStock
                            gallery
                            description
                            brand
                            category
                            attributes {
                                id
                                name
                                type
                                items {
                                    displayValue
                                    value
                                    id
                                }
                            }

                            prices {
                                amount
                                currency{
                                    label
                                    symbol
                                }
                            }
                        
                        }
                    }
            }
         `
         this.GET_CURRENCIES=gql`
            query getCurrencies {
                currencies {
                label
                symbol
            }
            
            }
         `
         const WatchQuery=client.watchQuery({
             query:this.GET_CATEGORY,
             variables:{
                 input:{title:"all"}
             }
         })

         this.obj=WatchQuery.subscribe(({data})=>{
             this.setState(()=>{
                 return {
                     all:data,
                     products:data.category.products
                 }
             })
         })
         
         const WatchQuery2=client.watchQuery({
            query:this.GET_CATEGORY,
            variables:{
                input:{title:"clothes"}
            }
        })
        this.obj=WatchQuery2.subscribe(({data})=>{
            this.setState(()=>{
                return {
                    clothes:data
                }
            })
        })

    const WatchQuery3=client.watchQuery({
        query:this.GET_CATEGORY,
        variables:{
            input:{title:"tech"}
        }
    })

    this.obj=WatchQuery3.subscribe(({data})=>{
        this.setState(()=>{
            return {
                tech:data
            }
        })
    })

    const WatchQuery4=client.watchQuery({
        query:this.GET_CURRENCIES,
        
    })

    this.obj=WatchQuery4.subscribe(({data})=>{
        this.setState(()=>{
            return {
                currencies:data
            }
        })
        
    })


}

getProduct=id=>{
    let tempProducts=[...this.state.products];
    
    const product=tempProducts.find(product=>product.id===id);
    return product;
}

selectMainImage=src=>{
    this.setState(()=>{
        return {
            mainImage:src
        }
    })
}

toggleSwitcher=()=>{
    this.setState(()=>{
        return {
            showCurrencySwitcher:!this.state.showCurrencySwitcher
        }
    })
}

toggleOverlay=()=>{
    this.setState(()=>{
        return {
            showCartOverlay:!this.state.showCartOverlay
        }
    })
}

changeCurrencySymbol=symbol=>{
    this.setState(()=>{
        return {
            currentSymbol:symbol
        }
    },()=>this.getTotalPrice())
}

hideCurrency=()=>{
    this.setState(()=>{
        return {
            showCurrencySwitcher:false
        }
    })
}

hideOverlay=()=>{
    this.setState(()=>{
        return {
            showCartOverlay:false
        }
    })
}

openModal=id=>{
    const tempProducts=[...this.state.products];
    const currentModalProduct=tempProducts.find(product=>product.id===id);
    this.setState(()=>{
        return {
            modalProduct:currentModalProduct,
            showModal:true
        }
    })
    
}

addToCart=id=>{
    const tempProducts=[...this.state.products];
    const tempCart=[...this.state.cartContent];
    const product=tempProducts.find(x=>x.id===id);
    const productById=tempCart.find(x=>x.id===id);
    const exist=tempCart.find(x=>x.identity===product.identity);
    let newItem;
    if(!product.attributes.length) {
        if(!productById) {
            newItem={...product}
            newItem["quantity"]=1;
            tempCart.push(newItem);
            this.setState(()=>{
                return {
                    cartContent:tempCart,
                    

                    
                }
            },()=>{this.getTotalQuantity();this.getTotalPrice();this.componentDidUpdate()})
        }else{
          
           tempCart.find(x=>x.id===product.id)["quantity"]+=1;
        }
        
    }
    else if(!productById) {
  
        product["quantity"]=1;
        tempCart.push(product);
    }else if(!exist) {
        let index=tempCart.indexOf(productById);
        product["quantity"]=1;
        tempCart.splice(index+1,0,product);
    }else{
        
        exist["quantity"]+=1;
    }
    
    this.setState(()=>{
        return {
            cartContent:tempCart,
            errorMessage:"",
            modalProduct:{}
            
        }
    },()=>{this.getTotalQuantity();this.getTotalPrice()})
}

closeModal=()=>{
    this.setState(()=>{
        return {
            showModal:false
        }
    })
}


increment=identity=>{
    let tempCart=[...this.state.cartContent];
    let product=tempCart.find(x=>x["identity"]===identity);
    product["quantity"]+=1;
    this.setState(()=>{
        return {
            cartContent:tempCart
        }
    },this.getTotalQuantity(),this.getTotalPrice())
}

decrement=identity=>{
    let tempCart=[...this.state.cartContent];
    let product=tempCart.find(x=>x["identity"]===identity);
    
    if(product["quantity"]===1) {
        product["quantity"]-=1;
        tempCart=tempCart.filter(x=>x["identity"]!==identity);
        this.setState(()=>{
            return {
                cartContent:tempCart,
                showCartOverlay:true
            }
        },this.getTotalQuantity(),this.getTotalPrice())
    

    }else{
        product["quantity"]-=1;
        this.setState(()=>{
            return {
                cartContent:tempCart
            }
        },this.getTotalQuantity())
    
    }

    

}




getAttributes=(id,attrName,itemValue)=>{
    let newProductsArray=[];
    let tempProducts=[...this.state.products];
    let identity=id+","+attrName+itemValue;
    tempProducts.forEach(item=>{
        const newItem={...item};
        newProductsArray=[...newProductsArray,newItem];
        
    })

    const product=newProductsArray.find(x=>x.id===id);
 
    if(product?.selected===undefined||product?.selected.find(x=>x.name===attrName)) {
        product.selected=product.selected?.filter(x=>x.name!==attrName);
        product["identity"]=product["identity"]?.split(",");
        product["identity"]=product["identity"]?.filter(x=>!x.includes(attrName));
        product["identity"]=product["identity"]?.toString();
        
        
        let obj={
            name:attrName,
            value:itemValue
        }
        product.selected=product?.selected===undefined?[obj]:[...product?.selected,obj];
        product["identity"]=product["identity"]===undefined?identity:product["identity"]+","+attrName+itemValue;
        
    }else{
        let identity=","+attrName+itemValue;
        let obj={
            name:attrName,
            value:itemValue
        }

        product["identity"]=product["identity"]+identity;

        let arr=[...product.selected,obj];
        product.selected=arr;
    }

    this.setState(()=>{
        return {
            products:newProductsArray
        }
    })
}


getTotalQuantity=()=>{
    const tempCart=[...this.state.cartContent];
    let quantity=0;
    tempCart.forEach(item=>{
        quantity+=item["quantity"];
    })

    this.setState(()=>{
        return {
            totalQuantity:quantity
        }
    })
}

getTotalPrice=()=>{
    let total=0;

    let tempCart=[...this.state.cartContent];
    tempCart.forEach(item=>{
        total+=(item["quantity"]*item.prices[item.prices.indexOf(item.prices.find(x=>x.currency.symbol===this.state.currentSymbol))].amount)
    })
    this.setState(()=>{
        return {
            totalPrice:total
        }
    })


}
        
    
    
        
        
        
checkAttributes=(id)=>{
    let tempProducts=[...this.state.products];
    let product=tempProducts.find(x=>x.id===id);
    if(product.selected?.length!==product.attributes.length) {
        this.setState(()=>{
            return {
                errorMessage:"Please select all needed attributes"
            }
        })
    }else{
        this.addToCart(id);
        this.closeModal();
    }


}

      
  render() {
    return (
      <Context.Provider value={{...this.state,getProduct:this.getProduct,selectMainImage:this.selectMainImage,toggleSwitcher:this.toggleSwitcher,changeCurrencySymbol:this.changeCurrencySymbol,hideCurrency:this.hideCurrency,openModal:this.openModal,addToCart:this.addToCart,toggleOverlay:this.toggleOverlay,hideOverlay:this.hideOverlay,closeModal:this.closeModal,getAttributes:this.getAttributes,getItemValue:this.getItemValue,checkAttributes:this.checkAttributes,increment:this.increment,decrement:this.decrement}}>{this.props.children}</Context.Provider>
    )
  }
}



const Consumer=Context.Consumer;


export {Context,ContextProvider,Consumer};

