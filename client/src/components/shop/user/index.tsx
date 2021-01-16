import React, { Component } from 'react';
import { Button, Table, Divider } from 'antd';
import { connect, Dispatch, ConnectProps, namespace_user } from 'umi';
import moment from "moment";
import "moment/locale/zh-cn";

import '@/static/common.less'
import SearchForm from './search';
import ShopModal from './modal';

interface PageProps extends ConnectProps {
  name: string;
  loading: boolean;
  tableData: any[];
  dispatch: Dispatch
}

interface PageSate {
    searchVal: string | number;
    visible: boolean;
    isAdd: boolean;
    disabled: boolean;
    record: any;
}

/**
 * @author hui
 * @date 2019/4/28
 * @Description: 商铺管理 - 商铺模块
*/
const MODELS_NAME  = namespace_user
class UserPage extends Component <PageProps, PageSate> {
    private formRef = React.createRef<HTMLInputElement>();

    constructor(props: PageProps){
        super(props);
        this.state = {
            searchVal: '',
            visible: false, 
            isAdd: true, 
            disabled: false,
            record: {}
        }
    }

    // 修改查询
    changeForm = (val: string | number) => {
        this.setState({
            searchVal: val
        })
    }

    // 根据条件查询
    onSearch = () => {
        const { searchVal } = this.state

        // 空查询
        if(!searchVal) {
            this.onReset()
            return
        }

        this.props.dispatch({
            type: `${MODELS_NAME}/findUser`,
            payload: {
               searchVal: searchVal
            }
        })
    }

    // 重置查询
    onReset = ()=>{
        this.props.dispatch({
            type: `${MODELS_NAME}/findAllUser`,
            payload: {}
        })

        this.setState({
            searchVal: ''
        })
    }

    // 新增或修改用户信息
    openModal = (record?: any) => {
        this.setState({
            isAdd: record === undefined,
            record: record || {},
            visible: true,
        })
    }

    // 关闭模态
    onCancel = () => {
        this.setState({
            visible: false,
            record: {}
        })
    }

    // 模态提交事件
    onSubmit = (formData: any) => {
        const { isAdd } = this.state
        const type = isAdd ? 'addUser' : 'editUser'
        // console.log('formData', formData, type)
        this.props.dispatch({
            type: `${MODELS_NAME}/${type}`,
            payload: formData
        })

        this.onCancel()
    }

    render (){
        const { searchVal, visible, isAdd, record } = this.state;
        const { tableData } = this.props;
        
        const columns = [
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render: (text: string) => {
                    return text === '0' ? '男' : '女'
                }
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: (text : string) => {
                    return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
                }
            },
            {
                title: '操作',
                dataIndex: 'opera',
                key: 'opera',
                render: (text: string, record: any) =>{
                    return <a onClick={()=>this.openModal(record)}>修改</a>
                }
            }
        ];

        return (
            <div className="qlm">
                {visible && <ShopModal
                    datas={isAdd ? {} : record}
                    visible={visible}
                    isAdd={isAdd}
                    onCancel={this.onCancel}
                    onSubmit={(val: any) => this.onSubmit(val)}
                />}

                <SearchForm
                    label="用户名"
                    searchVal={searchVal}
                    changeForm={this.changeForm}
                    onSearch={this.onSearch}
                    onReset={this.onReset}
                />

                <Divider />

                <div className="qlm-table">
                    <div className="qlm-table-btn">
                        <Button type="primary" onClick={() => this.openModal()}>创建用户</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
        )
    }
}

const mapState = (state: any) => {
    return {
      ...state[MODELS_NAME],
      loading: state.loading.models[MODELS_NAME]
    }
}
export default connect(mapState, null, null, { forwardRef: true })(UserPage);