import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import TextArea from '../common/TextArea/TextArea.jsx';

import setCommentPost from '../../actions/CommentsActions/setCommentPost';
import setComments from '../../actions/CommentsActions/setComments';

import {commentsService} from "../../../utils/commentsService";


class Requests extends PureComponent {
    constructor(props) {
        super(props);

        this.postComment = this.postComment.bind(this);
        this.setComment = this.setComment.bind(this);
    }

    async postComment() {
        const {postComment, beerId, username, setCommentPost, update} = this.props;
        if(postComment === ''){
            return;
        }
        await commentsService.createComment(beerId, postComment, username).then(res =>{
            commentsService.getAllComments(beerId).then(comments =>{
                setComments(comments);
                update();
            }).catch(err => console.log(err));
            setCommentPost('')
        }).catch(err => console.log(err))
    }

    setComment(event) {
        const {postComment, setCommentPost} = this.props;
        const comment = event.target.value;

        setCommentPost(comment);
    }

    componentDidMount(){
        const {setCommentPost} = this.props;

        setCommentPost('');
    }
    render() {
        const {postComment} = this.props;
        return (
            <div className="post-comment">
                <TextArea
                    label="Post a comment"
                    nameClass="post-comment-area"
                    iconClass="icon-checkmark"
                    onClick={this.postComment}
                    onChange={this.setComment}
                    value={postComment}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        postComment: state.Comments.get('postComment'),
        beerId: state.Beer.get('beerId'),
        username: state.User.get('username')

    }),
    {
        setCommentPost,
        setComments
    }
)
(withRouter(Requests));

Requests.propTypes = {
    setRequests: PropTypes.func
};
