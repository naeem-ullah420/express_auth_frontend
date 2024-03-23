import axios from "axios"
import { useEffect, useState } from "react"

const useApi = (method, url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios({
            "method": method,
            "url": url,
            "headers":{
                "token" : localStorage.getItem('token')
            }
        }).then(response=> {
            // console.log("categories: ", response.data.categories)
            setData(response.data)
        }).catch(err => {
            console.log(err)
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [url])

    return {
        loading, data, error
    }
}


export default useApi