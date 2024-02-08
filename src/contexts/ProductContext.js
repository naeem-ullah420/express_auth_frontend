import { createContext, useContext, useEffect, useState } from "react";


const ProductContext = createContext(null)

const ProductContextProvider = ({children}) =>{

    let [page, setPage] = useState(1)
    let [search, setSearch] = useState("")
    let [category, setCategory] = useState("")
    let [products, setProducts] = useState(() => {
        let products = []

        try {
            let storage_products = localStorage.getItem('products')
            products = JSON.parse(storage_products)
        } catch (error) {
            console.log(error)
        }

        return products
    })

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products))
    }, [products])

    let store_data = {
        page, setPage,
        search, setSearch,
        products, setProducts,
        category, setCategory,
    }
    return <ProductContext.Provider value={store_data}>
        {children}
    </ProductContext.Provider>

}

const   useProduct = () => {
    return useContext(ProductContext)
}


export {ProductContext, ProductContextProvider, useProduct}