import * as SerReq from './service'

/**
 * 用户接口服务
 */

// 查询全部用户
export function findAllUser(params: any) {
    return SerReq.getReq('findAllUser', params)
}

// 根据ID查询用户
export function findUserById(params: any) {
    return SerReq.getReq('findUserById', params)
}

// 根据字段查询用户
export function findUser(params: any) {
    return SerReq.getReq('findUser', params)
}

// 添加用户
export function addUser(params: any) {
    return SerReq.postReq('addUser', params)
}

// 编辑用户
export function editUser(params: any) {
    return SerReq.putReq('editUser', params)
}

// 删除用户
export function delUser(params: any) {
    return SerReq.delReq('delUser', params)
}