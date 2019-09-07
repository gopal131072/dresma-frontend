import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Card, Modal, Form, Input, InputNumber } from 'antd';
import { getUsers, deleteUser, updateUser, setActiveItem } from './UserActions';
import { UserContainerWrapper } from './UserContainerStyle';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.columns = [
            { title: 'ID', dataIndex: 'id', key: 'id', width: 100},
            { title: 'Name', dataIndex: 'employee_name', key: 'employee_name', width: 150},
            { title: 'Salary', dataIndex: 'employee_salary', key: 'employee_salary', width: 50 },
            { title: 'Age', dataIndex: 'employee_age', key: 'employee_age', width: 50 },
            { title: 'Profile Image', dataIndex: 'profile_image', key: 'profile_image', width: 50 },            
            { title: 'Edit', dataIndex: '', render: (item) => 
                <Button type="primary" onClick={() => {
                    this.props.setActiveItem(item);
                    this.setModalVisibility(true);
                }}>
                    Edit
                </Button>,
            width: 100},
            { title: 'Delete', dataIndex: '', render: (item) => 
                <Button type="danger" onClick={() => {this.deleteItem(item.id)}}>
                    Delete
                </Button>,
            width: 100},
        ];
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                let data = { 
                    employee_name: values.name,
                    employee_age: values.age,
                    employee_salary: values.salary,
                    profile_image: values.profile_image
                }
                this.props.updateUser(values.id, data, () => {
                    this.populateData(this.props.page, this.props.page_size);
                    this.setModalVisibility(false);
                });
            }
        });
    }

    handleCancel = (e) => {
        this.setModalVisibility(false);
    }

    componentDidMount() {
        this.populateData(this.props.page, 10);
    }

    populateData = (page, pageSize) => {
        this.props.getUsers(pageSize, page);
    }

    setModalVisibility = (data) => {
        this.setState({
            ...this.state,
            visible: data
        })
    }

    deleteItem = (id) => {
        confirm({
            title: 'Are you sure you want to delete this user?',
            onOk: () => {
                this.props.deleteUser(id, () => {
                    this.populateData(this.props.page, this.props.page_size);
                });
            },
            onCancel: () => {
            }
        });
    }

    modalComponent = () => {
        const {getFieldDecorator} = this.props.form;
        const active_item = this.props.active_item ? this.props.active_item : {
            id: 0,
            employee_name: '',
            employee_salary: 0,
            employee_age: 0,
            profile_image: ''
        };
        return <Modal
            visible={this.state.visible}
            okText="Save"
            cancelText="Cancel"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
        <Form>
            <FormItem>
                {getFieldDecorator('id', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    disabled: true,
                    initialValue: active_item.id
                })(
                    <Input disabled={true}/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your Name!' }],
                    initialValue: active_item.employee_name
                })(
                    <Input placeholder="Name" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('age', {
                    rules: [{ required: true, message: 'Please input your age!' }],
                    initialValue: active_item.employee_age
                })(
                    <InputNumber placeholder="Age" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('salary', {
                    rules: [{ required: true, message: 'Please input your salary!' }],
                    initialValue: active_item.employee_salary
                })(
                    <InputNumber placeholder="Salary" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('profile_image', {
                    rules: [{ required: true, message: 'Please input your profile image!' }],
                    initialValue: active_item.profile_image
                })(
                    <Input placeholder="Profile image" />
                )}
            </FormItem>
        </Form>
        </Modal>
    }
    render() {
        let first_item = this.props.users && this.props.users.length ? this.props.users[0] : null;

        let card_component = first_item ? 
        <Card title={first_item.employee_name}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>{`Employee ID : ${first_item.id}`}</span>
                <span>{`Employee Name : ${first_item.employee_name}`}</span>
                <span>{`Employee Salary : ${first_item.employee_salary}`}</span>
                <span>{`Employee Age : ${first_item.employee_age}`}</span>
                <span>{`Profile Image : ${first_item.profile_image}`}</span>
            </div>
        </Card> : null;

        return (
            !this.props.loading ?
            <UserContainerWrapper>
                {card_component}
                <Table bordered columns={this.columns} dataSource={this.props.users}
                pagination={{current: this.props.page, total: this.props.total, pageSize: this.props.page_size,
                onChange: this.populateData, showSizeChanger: true, onShowSizeChange: this.populateData}}
                scroll={{ y: 240 }} />
                {this.modalComponent()}
            </UserContainerWrapper>
            :
            <UserContainerWrapper>
                <Icon type="loading"/>
            </UserContainerWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.USERREDUCER.data,
        loading: state.USERREDUCER.loading,
        total: state.USERREDUCER.total,
        page: state.USERREDUCER.page,
        page_size: state.USERREDUCER.page_size,
        active_item: state.USERREDUCER.active_item
    }
}

const mapDispatchToProps = {
    getUsers,
    deleteUser,
    updateUser,
    setActiveItem
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(UserContainer));