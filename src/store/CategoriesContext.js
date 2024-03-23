import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const CategoryContext = createContext(null)

const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([])

    return <CategoryContext.Provider value={{
        categories, setCategories
    }}>
        {children}
    </CategoryContext.Provider>
}

function useCategories() {
    return useContext(CategoryContext)
}


export {
    CategoryContext, 
    CategoryProvider,
    useCategories
}
