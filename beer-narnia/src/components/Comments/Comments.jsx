import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Comment from '../Comment/Comment.jsx';

class Comments extends PureComponent {
    constructor(props) {
        super(props);

        this.updateLi = this.updateLi.bind(this);
    }

    updateLi(){
        this.forceUpdate();
    }

    render() {
        const {comments} = this.props;
        const commentsLi = comments.map((comment, index) => {
            return (
                <li className="comments-li" key={comment._id}>
                    <Comment update={this.updateLi} comment={comment}/>
                </li>)
        });
        return (
            <div className="comments">
                <span className="title">Comments</span>
                <ul className="comments-ul">{commentsLi}</ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        comments: state.Comments.get('comments')
    }),
    {}
)
(withRouter(Comments));

Comments.propTypes = {};
