import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import Button from '../common/Button/Button.jsx';

import calcTime from '../../helpers/commetTime';
import setComments from '../../actions/CommentsActions/setComments';

import {commentsService} from "../../../utils/commentsService";

class Request extends PureComponent {
    constructor(props) {
        super(props);
        this.state = ({commentId: ''});

        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount() {
        const {comment} = this.props;
        const {_id} = comment;

        this.setState({commentId: _id});
    }

    deleteComment() {
        const {update, comments, setComments} = this.props;
        const {commentId} = this.state;

        commentsService.deleteComment(commentId).then(res => {

            let commentsArr = comments;
            let index;
            commentsArr.forEach((comment, i) => {
                if (commentId === comment._id) {
                    index = i;
                }
            });
            commentsArr.splice(index, 1);

            setComments(commentsArr);

            update();
            NotificationManager.success('Comment deleted');
        }).catch(err => console.log(err));
    }

    render() {
        const {comment, username, checkIsAdmin} = this.props;
        const {author, content, _kmd} = comment;
        const commentTime = calcTime(_kmd.ect);

        return (
            <div className="comment">
                <div className="comment-and-time">
                    <span className="comment-content">{content}</span>
                    <span className="comment-time">posted {commentTime} by {author}</span>
                </div>
                {username === author || checkIsAdmin ? <Button icon="icon-cross" onClick={this.deleteComment}/> : ''}
            </div>);
    }
}

export default connect(
    state => ({
        username: state.User.get('username'),
        checkIsAdmin: state.User.get('checkIsAdmin'),
        comments: state.Comments.get('comments')
    }),
    {
        setComments
    }
)
(withRouter(Request));

Request.propTypes = {};
