'use strict';

module.exports = app => {
  // const { INTEGER, STRING } = app.Sequelize;
  // 用户信息
  const Apps = app.model.define('gs_users', {
    // ID
    id: { type: INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: false, comment: 'ID' },
    // 姓名
    user_name: { type: STRING(20), allowNull: true, comment: '姓名' },
    // 登录密码
    login_pwd: { type: STRING(20), allowNull: true, comment: '登录密码' },
    // 性别
    gender: { type: STRING(2), allowNull: true, comment: '性别' },
    // 生日
    birthday: { type: STRING(20), allowNull: true, comment: '生日' },
  }, {
    // 主键生成
    paranoid: true,
    // 时间戳
    timestamps: true,
  });

  return Apps;
};
