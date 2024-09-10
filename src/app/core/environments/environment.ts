export const enverionment = {
    baseUrl: "https://ecommerce.routemisr.com",
    
}

export let cartItems:number = 0;
export function updatecartnumber(o:string |number){
    if(o == "+"){
        cartItems = cartItems + 1
    } else if( o == "-") {
        cartItems = cartItems - 1
    }
    else if(o == "*")
    {
        cartItems = 0
    }
    else{
        cartItems != o
    }
    console.log("hello from environment function",cartItems)
}
