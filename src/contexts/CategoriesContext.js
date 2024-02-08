import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

const CategoriesContext = createContext(null);

const CategoriesContextProvider = ({children}) => {
    let [categories, setCategories] = useState(() => {
        let categories = []

        try {
            let store_categories = localStorage.getItem('categories')
            categories = JSON.parse(store_categories) ?? []
        } catch (error) {
            console.log(error)
        }

        return categories
    })

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories) ?? [])
    }, [categories])


    const addCountOfProductInCategories = (category_id) => {
        setCategories((allCategories) => {
            const index = allCategories.findIndex((c) => c._id === category_id)
            allCategories[index].product_count += 1
            return allCategories
        })
    }


    return <CategoriesContext.Provider value={{
        categories,
        setCategories,
        addCountOfProductInCategories
    }}>
        {children}
    </CategoriesContext.Provider>
}

const useCategoriesContext = () => {
    return useContext(CategoriesContext)
}


export  {
    CategoriesContext,
    CategoriesContextProvider,
    useCategoriesContext,
}