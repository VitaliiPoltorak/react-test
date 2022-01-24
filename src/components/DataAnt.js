import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography, Space, Switch, Select} from 'antd';
import axios from "axios";
import _ from "lodash";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {


    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                (title === 'gender') ? (
                    <Form.Item

                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}

                    >
                        <Select value={record.gender}>
                            <Select.Option value="male">male</Select.Option>
                            <Select.Option value="female">female</Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}

                    >
                        {inputNode}
                    </Form.Item>
                )
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props) => {

    const {persons} = props
    const [form] = Form.useForm();
    const [data, setData] = useState(persons);

    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        setData(_.filter(persons, {"id": record.id}))
        form.setFieldsValue({
            name: '',
            email: '',
            gender: '',
            status: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const upDataUser = (value) => {
        setData(_.filter(persons, {"gender": value}));
    }

    const save = async (user) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => {
                return (
                    user.id === item.id
                )
            });

            const item = newData[index];

            newData.splice(index, 1, {...item, ...row});

            setData(newData);

            const response = await axios.patch(
                `https://gorest.co.in/public/v1/users/${user.id}?access-token=83fcc7cc60d2fc306303122bc0170a6b59b97b11d9b6e77198a1fdb50eb4ae91`,

                {
                    id: user.id,
                    name: newData[index].name,
                    email: newData[index].email,
                    gender: newData[index].gender,
                    status: newData[index].status
                })

            console.log('👉 Returned data:', response);
            setEditingKey('');
            setData(persons)

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'email',
            dataIndex: 'email',
            width: '15%',
            editable: true,
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            width: '30%',
            editable: true,
            // filters: [
            //     {text: 'Male', value: 'male'},
            //     {text: 'Female', value: 'female'},
            // ],
            //
            // onFilter: (value, record) => {
            //     console.log(record);
            //     console.log(value);
            //     return (record.gender.indexOf(value) === 0)
            // },
        },
        {
            title: 'status',
            dataIndex: 'status',
            width: '30%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            {/*<Form.Item label="filter">*/}
            <Select
                onChange={(value) => {
                    upDataUser(value);
                }}
            >
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
            </Select>
            {/*</Form.Item>*/}
            <Table

                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}

                rowClassName="editable-row"
                rowKey={e => e.id}
                pagination={{
                    onChange: cancel,
                }}

                onRow={(record) => {
                    return {
                        onChange: event => {

                            Object.keys(record).forEach(key => {

                                if (key === event.target.id) {

                                    record[key] = event.target.value

                                }
                            });

                        }, // change
                    };
                }}
            />
        </Form>
    );
};

export default EditableTable

// ReactDOM.render(<EditableTable />, mountNode);