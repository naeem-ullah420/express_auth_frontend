import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ProdutContext = createContext(null)

const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([])

    const [pageinationDetail, setPaginationDetail] = useState({
        "current_page": 0,
        "total_count": 0,
        "total_pages": 0,
    })

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")


    return <ProdutContext.Provider value={{
        products, setProducts, 
        pageinationDetail, setPaginationDetail, 
        page, setPage,
        search, setSearch
    }}>
        {children}
    </ProdutContext.Provider>
}

function useProducts() {
    return useContext(ProdutContext)
}

export {ProdutContext, ProductProvider, useProducts}