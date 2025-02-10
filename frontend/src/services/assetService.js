import axios from "axios";

const apiAssetClient = axios.create({
    baseURL: 'http://10.5.1.60:3001',
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
    },
    updateAsset(id, changes){
        return apiAssetClient.patch('/assets/'+id, changes)
    },
    getCategories(){
        return apiAssetClient.get('/categories')
    },
    getLocalizations(){
        return apiAssetClient.get('/localizations')
    },
}