import axios from "axios";

const apiAssetClient = axios.create({
    baseURL: 'http://10.5.1.60:3000',
    withCredentials: true,
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
    getStatus(){
        return apiAssetClient.get('/status')
    },
    getUsers(userName){
        return apiAssetClient.get('/users?userName='+ userName)
    },
    getAllUsers(){
        return apiAssetClient.get('/users')
    },
    applyFilters(page, limit, sortValue, sortKey, appliedFilters){
        return apiAssetClient.post(`/assets/filter?page=${page}&limit=${limit}&sortValue=${sortValue}&sortKey=${sortKey}`, appliedFilters)
    },
    getUserAssets(page, limit, userName){
        return apiAssetClient.post(`/assets/user?page=${page}&limit=${limit}`, { userName })
    },
    updateAssetfromUser(recivedAssets, user){
        return apiAssetClient.put('/assets/changeOwner', { recivedAssets, user})
    },
    getPhones(page, limit, sortValue, sortKey){
        return apiAssetClient.get(`/phones?page=${page}&limit=${limit}&sortValue=${sortValue}&sortKey=${sortKey}`)
    },
    applyPhoneFilters(page, limit, sortValue, sortKey, appliedFilters){
        return apiAssetClient.post(`/phones/filter?page=${page}&limit=${limit}&sortValue=${sortValue}&sortKey=${sortKey}`, appliedFilters)
    },
    createPhone(newPhone){
        console.log(newPhone);
        return apiAssetClient.post('/phones',newPhone)
    },
    getPhoneId(id){
        return apiAssetClient.get('/phones/'+id)
    },
    deletePhone(id){
        return apiAssetClient.delete('/phones/'+id)
    },
    updatePhone(id, changes){
        return apiAssetClient.patch('/phones/'+id, changes)
    },
}