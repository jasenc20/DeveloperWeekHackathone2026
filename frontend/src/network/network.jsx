import axios from "axios";

const BaseURL = "http://127.0.0.1:8000";


export const getRequest = async (endpoint,param = {}) =>{
    try{
        const newUrl = `${BaseURL}/${endpoint}`
        const response = await axios.get(newUrl, {
            params: param,
        })

        return response.data;
    }catch(error){
        console.error("Error performing Get Response ",error.response?.data || error.message)
        throw error
    }
}

export const putRequest = async (endpoint, param) =>{
    
    try{
        const newUrl = BaseURL + "/"+endpoint
        const response = await axios.get(newUrl, {
            params: param
        })
        return response
    }catch(error){
        console.error("Error ")
    }
}

export const postRequest = async (endpoint,param) =>{
    
    try{
        const newUrl = `${BaseURL}/${endpoint}`
        const response = await axios.post(newUrl, param)

        return response.data;
    }catch(error){
        console.error("Error performing Get Response ",error.response?.data || error.message)
        throw error
    }
}

export const deleteRequest = async (endpoint) =>{
    
    try{

    }catch(error){

    }
}
