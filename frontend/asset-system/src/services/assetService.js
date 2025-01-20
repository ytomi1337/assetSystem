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
    
    getAssets(page, limit, sortValue, sortKey){
        return apiAssetClient.get(`/assets?page=${page}&limit=${limit}&sortValue=${sortValue}&sortKey=${sortKey}`)
    },
    getId(id){
        return apiAssetClient.get('/assets/'+id)
    },
    createAsset(newAsset){
        return apiAssetClient.post('/assets',newAsset)
    },
    deleteAsset(id){
        return apiAssetClient.delete('/assets/'+id)
    }
}