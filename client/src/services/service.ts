import { request } from 'umi';

const BACKEND_BASE = '/api'

const getReq = async (url: string, params: any) => {
    return request(`${BACKEND_BASE}/${url}`, { 
        // 请求方式
        method: 'GET',
        params: {
            ...params
        }
    })
}

const postReq = async (url: string, data: any) => {
    return request(`${BACKEND_BASE}/${url}`, { 
        // 请求方式
        method: 'POST',
        // params: {
        //     ...params
        // },
        data: {
            ...data
        }
    })
}

const putReq = async (url: string, data: any) => {
    return request(`${BACKEND_BASE}/${url}`, { 
        // 请求方式
        method: 'PUT',
        // params: {
        //     ...params
        // },
        data: {
            ...data
        }
    })
}

const delReq: any = async (url: string, params: any) => {
    return request(`${BACKEND_BASE}/${url}`, { 
        // 请求方式
        method: 'DELETE',
        params: {
            ...params
        }
    })
}

export {
    getReq,
    postReq,
    putReq,
    delReq
}