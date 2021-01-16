'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 获取全表
  async getAll() {
    const { app } = this
    try {
      const result = await app.mysql.select('users', { 
        orders: [['create_time','desc'], ['id','desc']], // 排序方式
        limit: 10, // 返回数据量
        offset: 0, // 数据偏移量
      });
      return { result }
    } catch(e) {
      return Promise.reject(e);
    }
  }

  // 根据id获取
  async findUserById(id) {
    const { app } = this
    try {
      const result = await app.mysql.get('users', { id })
      return { result }
    } catch(e) {
      return Promise.reject(e);
    }
  }

  async findUser(user_name) {
    const { app } = this
    
    // => SELECT `author`, `title` FROM `posts`
    //   WHERE `status` = 'draft' AND `author` IN('author1','author2')
    //   ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;
 
    try {
      const result = await app.mysql.select('users', { 
        where: user_name ? { user_name } : {}, // WHERE 条件 and
        // columns: ['user_name', 'age'], // 要查询的表字段
        orders: [['create_time','desc'], ['id','desc']], // 排序方式
        limit: 10, // 返回数据量
        offset: 0, // 数据偏移量
      });
      return { result }
    } catch(e) {
      return Promise.reject(e);
    }
  }

  // 插入数据
  async create(data) {
    const { app } = this
    try {
      const result = await app.mysql.insert('users', data)
      return { result }
    } catch(err) {
      console.log('err--', err)
      return null
    }
  }

  // 修改数据
  async update(data) {
    const { app } = this
    try {
      const result = await app.mysql.update('users', data)
      return { result }
    } catch(e) {
      console.log('err--', err)
      return null
    }
    
  }

  // 删除数据
  async destory(id) {
    const { app } = this
    try {
      const result = await app.mysql.delete('users', { id })
      return { result }
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

module.exports = UserService

