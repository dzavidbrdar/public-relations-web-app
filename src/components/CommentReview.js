import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Table, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class CommentReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayAllowed: false,
            columns: [
                {
                    title: 'Comment',
                    dataIndex: 'comment',
                },
                {
                    title: 'Author',
                    dataIndex: 'name',
                },
                {
                    title: 'Contact',
                    dataIndex: 'mail',
                },
                {
                    title: 'Product',
                    dataIndex: 'product',
                },
                {
                    title: 'Action',
                    render: (text, record) => <span><button type="button" className="ant-btn" ant-click-animating-without-extra-node="false" onClick={(e) => this.clickOnDelete(record.key, record.productId, e, this)}><span>Delete</span></button></span>
                }

            ]
        }
    }

    componentDidMount() {
        fetch('https://main-server-si.herokuapp.com/api/products/comments')
            .then(res => res.json())
            .then(json => {
                let items = [];
                json.forEach(element => {
                    let item = { key: element.id, productId: element.product.id, comment: element.text, name: element.firstName + ' ' + element.lastName, mail: element.email, product: element.product.name };
                    items.push(item);
                });
                this.setState({
                    data: items.reverse()
                });
            }
            );
    }

    static getDerivedStateFromProps(props, state) {
        if (getCookie("token") != "") return { displayAllowed: true };
        else return { displayAllowed: false };
    }

    clickOnDelete(key, productKey, e, comp) {
        e.preventDefault();
        confirm({
            title: 'Are you sure you want to delete this comment?',
            icon: <ExclamationCircleOutlined />,
            content: '*Only delete comments that are offensive or inappropriate',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = () => {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        const data = comp.state.data.filter(item => item.key !== key);
                        comp.setState({ data });
                        message.success('Selected comment has been successfully deleted!');
                    }
                    if (ajax.readyState == 4 && ajax.status == 404)
                        message.error('Error 404');
                }
                ajax.open("DELETE", 'https://main-server-si.herokuapp.com/api/products/' + productKey + '/comments/' + key, true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
                console.log("poslao del req");
                ajax.send();
            },
            onCancel() {
            }
        });
    }

    render() {
        let { data, columns } = this.state;
        if (!this.state.displayAllowed) return <p>Zabranjen pristup</p>;
        else return (
            <div>
                <div style={TableDiv}> <h3>Comment Review</h3><br></br>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                    />,
                </div>
            </div>
        );
    }
}

let getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const TableDiv = {
    padding: '10px',
    margin: '20px',
}

export default CommentReview;