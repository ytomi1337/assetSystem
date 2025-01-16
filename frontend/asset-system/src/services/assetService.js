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
    createAsset(it_num, name, serialnum, user_new, localization, status, warranty_date, recipt_date){
        return apiAssetClient.post('/assets',{
            it_num: it_num,
            name: name,
            serialnum: serialnum,
            user_new: user_new,
            localization: localization,
            status: status,
            // warranty_date: warranty_date,
            // recipt_date: recipt_date
        })
    }
}