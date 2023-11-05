import { createContext, useContext, useState } from "react";


const ProductContext = createContext(null)

const ProductContextProvider = ({children}) =>{
    let [page, setPage] = useState(1)
    let [search, setSearch] = useState("")
    let [products, setProducts] = useState([])

    let store_data = {
        page, setPage,
        search, setSearch,
        products, setProducts
    }
    return <ProductContext.Provider value={store_data}>
        {children}
    </ProductContext.Provider>
}

const useProduct = () => {
    return useContext(ProductContext)
}


export {ProductContext, ProductContextProvider, useProduct}