import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CartContextProvider = ({children}) => {
    let [products, setProducts] = useState(() => {
        let products = []

        try {
            let storage_products = localStorage.getItem('cart_products')
            products = JSON.parse(storage_products) ?? []
        } catch (error) {
            console.log(error)
        }

        return products
    })

    useEffect(() => {
        localStorage.setItem("cart_products", JSON.stringify(products) ?? [])
    }, [products])

    const addProduct = (product) => {
        let storeProductIndex = products.findIndex((p) => product._id === p._id)
        let allProducts = products

        if(storeProductIndex !== -1) {
            allProducts[storeProductIndex].quantity += 1
        } else {
            product.quantity = 1
            allProducts.unshift(product)
        }

        setProducts([...allProducts])
    }

    const removeProduct = (product) => {
        let storeProductIndex = products.findIndex((p) => product._id === p._id)
        let allProducts = products

        allProducts[storeProductIndex].quantity += -1

        if(allProducts[storeProductIndex].quantity <= 0) {
            allProducts = allProducts.filter(p => p._id !== product._id)
        }

        setProducts([...allProducts])
    }

    const resetCart = () => {
        setProducts([])
    }


    return <CartContext.Provider value={{
        products,
        addProduct,
        removeProduct,
        resetCart
    }}>
        {children}
    </CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext)
}


export  {
    CartContext,
    CartContextProvider,
    useCartContext,
}