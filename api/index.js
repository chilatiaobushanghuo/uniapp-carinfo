import http from './request'

//json类

export const getJsonlist = data =>http.get('/json/list',null,data)
export const setJsonData = (data,option) =>http.post('/json/set',data,null,option)
export const deleteJsonData = (data,option) =>http.post('/json/delete',data,null,option)
// /json/delete

//列表   categoryId
export const getGoodslist = data =>http.get('/shop/goods/list',null,data)
//详情
export const getGooddetail = data =>http.get('/shop/goods/detail',null,data)
//轮播 
export const getBannerlist = data =>http.post('/banner/list',data)
//分类
export const getCategory = data => http.get('/shop/goods/category/all', data) 

