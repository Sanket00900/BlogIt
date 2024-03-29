import { useState, useEffect } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
    "content": string,
    "title": string,
    "author": string,
    "id": number,
    "authon": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")} `
            }
        })
            .then(response => {
                setBlogs(response.data.posts);  //backend response saved name !
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blogs
    };
} 