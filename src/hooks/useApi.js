import axios from "axios"
import { useEffect, useState } from "react";

export const useApi = (url, method = 'GET', payload = {}, log = false) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    const fetchData = async () => {

        let config = {
            method: method,
            url:  url,
            headers: { 'token': localStorage.getItem('token') }
        }

        if(payload) {
            config['data'] = payload
        }

        axios(config).then(response => {
            setData(response.data)
        }).catch(error => {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(log && !loading) {
            console.log({
                "responseData" : data,
                "error": error
            })
        }
    }, [loading])

    return {loading, data, error}
}