import { useState, useEffect } from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            //we are going to make api request below

            try {
                const res = await axios.get(url)
                console.log(url)
                setData(res.data)

            } catch (err) {
                setError(err)
            }
            setLoading(false)
        };
        fetchData()


    }, [url]) //whenever our url changes we fire this function

    const reFetch = async () => {
        setLoading(true);
        //we are going to make api request below
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    };
    return { data, loading, error, reFetch }
}

export default useFetch;

