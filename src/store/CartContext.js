import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext(null)

const CartContextProvider = ({children}) => {

    let [storeProducts, setStoreProducts] = useState(() => {
        let cart_store = []
        try{
            cart_store = JSON.parse(localStorage.getItem("cart_store"))
        } catch(e) {
            console.log("error: ", e)
        }
        return cart_store
    })

    useEffect(() => {
        localStorage.setItem("cart_store", JSON.stringify(storeProducts))
    }, [storeProducts])


    const addProduct = (product) => {
        const index = storeProducts.findIndex(sp => sp._id === product._id)

        if(index!==-1) {
            // need to increase quantity
            storeProducts[index].quantity += 1
            setStoreProducts([...storeProducts])
        } else {
            // else first time add the product
            product.quantity = 1
            setStoreProducts((previousProducts) => {
                return [product, ...previousProducts]
            })
        }
    }

    const removeProduct = (product) => {
        const index = storeProducts.findIndex(sp => sp._id === product._id)
        storeProducts[index].quantity -= 1
        if(storeProducts[index].quantity < 1) {
            storeProducts = storeProducts.filter(sp => sp._id !== product._id)
        }

        setStoreProducts([...storeProducts])
    }

    return <CartContext.Provider value={{
        storeProducts,
        addProduct,
        removeProduct
    }}>
        {children}
    </CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext)
}


export {
    CartContext,
    CartContextProvider,
    useCartContext
}