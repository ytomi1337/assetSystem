import axios from "axios";

const apiAssetClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getAssets(){
        return apiAssetClient.get('/assets')
    }
}