import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
// import { OptionProps as Option } from 'antd/lib/select'

interface Props{
    datas: any;
    visible: boolean,
    isAdd: boolean,
    onCancel: () => void;
    onSubmit: (val: any) => void;
}

/**
 * @author hui
 * @date 2021/1/5
 * @Description: 用户管理
*/
const { Option } = Select;

/**
 * React.FC<>是在typescript使用的一个泛型
 * FC就是FunctionComponent的缩写，是函数组件
 * 在这个泛型里面可以使用useState
 */
const ShopModal: React.FC<Props> = ({ 
    datas,
    visible,
    isAdd,
    onCancel,
    onSubmit
 }) => {
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: { span: 18 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 30 },
            sm: { span: 18 },
        },
    };

    // 重置
    // function onReset() {
    //     formRef.current.resetFields();
    // };

    // 提交表单且数据验证成功后回调事件
    // function onFinish(values: string) {
    //     console.log(values);
    // };

    /**
     * resetFields	重置一组字段到 initialValues
     * (fields?: NamePath[]) => void
     */
    
    return (
        <Modal
            visible={visible}
            title={isAdd ? '新增用户':'修改用户'}
            cancelText="取消"
            onCancel={onCancel}
            okText={isAdd ? '添加':'修改'}
            key="modal_user"
            onOk={() => {
                form.validateFields()
                .then((values: any) => {
                    // 重置表单
                    form.resetFields();
                    values = isAdd ? values : {...values, id: datas.id}
                    onSubmit(values);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
            <Form 
                {...formItemLayout} 
                form={form}
                // onFinish={onFinish}
                initialValues={{
                    ['user_name']: !isAdd ? datas && datas.user_name : '',
                    ['age']: !isAdd ? datas && datas.age : null,
                    ['gender']: !isAdd ? datas && datas.gender :  '',
                }}
            >
                <Form.Item 
                    label="用户名" 
                    name="user_name"
                    rules={[{ required: true, message: '请输入用户名' }]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="年龄" 
                    name="age"
                    rules={[{ required: true, message: '请输入年龄' }]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="性别" 
                    name="gender"
                    rules={[{ required: true }]}
                    hasFeedback
                >
                    <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择性别"
                        // onChange={changeSaleType}
                    >
                        <Option value="0">男</Option>
                        <Option value="1">女</Option>
                    </Select>
                </Form.Item>

                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default ShopModal

