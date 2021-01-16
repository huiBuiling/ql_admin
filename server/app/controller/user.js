'use strict';

const Controller = require('egg').Controller;
const moment = require('moment')

class UserController extends Controller {
  async findAllUser() {
    const { ctx } = this
    const res = await ctx.service.user.getAll()
    ctx.body = res
  }

  // 根据id获取
  async findUserById() {
    const { ctx } = this
    const { id } = ctx.query;

    if(id) {
      let res = await ctx.service.user.findUserById(id)
      console.log('find_res===========', res)
      if(res && res.result) {
        ctx.body = res
      } else {
        ctx.body = '查找用户失败'
      }
    }
    
  }

  // 根据字段查询获取
  async findUser() {
    const { ctx } = this
    const { username } = ctx.query;

    console.log('username', username)

    if(username) {
      let res = await ctx.service.user.findUser(username)
      console.log('find_res2===========', res)
      if(res) {
        ctx.body = res
      } else {
        ctx.body = '查找用户失败'
      }
    } else {
      ctx.body = '查找用户失败'
    }
    
  }

  // 创建用户
  async create() {
    const { ctx } = this
    const data = ctx.request.body
    console.log('create_data', data)

    const res = await ctx.service.user.create(data)
    console.log('create_res', res.result)
    ctx.body = res && res.result && res.result.affectedRows === 1 ? '操作成功！' : '新增失败！'
  }

  // 修改用户信息
  async update() {
    const { ctx } = this
    const data = ctx.request.body
    console.log('update_data', data)

    const res = await ctx.service.user.update(data)
    console.log('update_res', res)
    ctx.body = res && res.result && res.result.affectedRows === 1 ? '操作成功！' : '修改失败！'
  }

  // 删除当前用户
  async destory() {
    const { ctx } = this
    const { id } = ctx.query;
    console.log('id======', id)
    if(id) {
      const res = await ctx.service.user.destory(id);
      console.log('destory_res', res)
      ctx.body = res && res.result && res.result.affectedRows === 1 ? '操作成功！' : '删除失败！'
    }
  }
}

module.exports = UserController;

