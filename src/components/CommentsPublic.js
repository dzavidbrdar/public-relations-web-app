import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Spin, Comment, List } from 'antd';

function CommentsPublic() {

    const url = 'https://main-server-si.herokuapp.com/api/products/comments';
    const avatarUrl = 'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png?fbclid=IwAR1JZbdxwQ0SX6Xi0c6sn_sYbI5j7llNRbJbTDWpdXRoIPrUDal52gX38Sc';
    const [comments, setComments] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const leftStyle = {
      textAlign: 'left'
    };
    const uvodStyle = {
      fontStyle: 'italic',
      fontSize: '15px'
    };

    const fetchComments = (async () => {
        const commentsData = await fetch(url);
        const commentsTemp = await commentsData.json();
        const data = commentsTemp.map(function(comment) {
            let commentUvodText = ' (on ' + comment.product.name + '): ';
            let commentUvod = <div style={uvodStyle}>{commentUvodText}</div>;
            let commentObject = {
              author: comment.firstName + " " + comment.lastName + ' wrote:',
              avatar: avatarUrl,
              content: (
                <p style={leftStyle}>{commentUvod} {comment.text}</p>
              )
            };
            return commentObject;
        });
        setComments(commentsTemp);
        setDataArray(data);
        setLoading(false);
    });

    useEffect(() => {
      fetchComments();
    });

    const loadingTextStyle = {
      fontSize: '14px',
      color: '#808080'
    }

    let headerText = comments.length + ' comments';
    const loadingCommentsText = <div style={loadingTextStyle}>Loading comments...</div>
    const komentari = <List
            className="comment-list"
            header={<div style={leftStyle}>{headerText}</div>}
            itemLayout="horizontal"
            dataSource={dataArray}
            renderItem={item => (
            <li>
                <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                />
            </li>
            )}
        />;

    const loadingElement = <div>{loadingCommentsText}<br></br></div>;
    
    return (
        <div>
            { loading ? <div style={{marginTop: '100px'}}><Spin size="large" /></div> : <div style={frameStyle}>{komentari}</div> }
        </div>
    );
}

const frameStyle = {
    marginRight: "300px",
    marginLeft: "300px"
}

export default CommentsPublic;