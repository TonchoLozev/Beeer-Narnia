import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {connect} from "react-redux";

import BeerDetails from '../BeerDetails/BeerDetails.jsx';
import BeerDetailsEditable from '../BeerDetailsEditable/BeerDetailsEditable.jsx';
import PostComment from '../PostComment/PostComment.jsx';
import Comments from '../Comments/Comments.jsx';

import {beers} from '../../../utils/articlesService';
import {commentsService} from "../../../utils/commentsService";

import setBeer from '../../actions/BeerActions/setBeer';
import setBeerName from '../../actions/BeerActions/setBeerName';
import setBeerType from '../../actions/BeerActions/setBeerType';
import setBeerPrice from '../../actions/BeerActions/setBeerPrice';
import setBeerImg from '../../actions/BeerActions/setBeerImg';
import setBeerCountry from '../../actions/BeerActions/setBeerCountry';
import setBeerDescription from '../../actions/BeerActions/setBeerDescription';
import setComments from '../../actions/CommentsActions/setComments';


class Beer extends PureComponent {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {beerId, setComments} = this.props;

        await beers.getBeer(beerId).then(beer => {
            const {
                setBeer,
                setBeerName,
                setBeerType,
                setBeerPrice,
                setBeerImg,
                setBeerCountry,
                setBeerDescription
            } = this.props;
            const {name, description, price, img, country, type} = beer;

            setBeer(beer);
            setBeerName(name);
            setBeerPrice(price);
            setBeerType(type);
            setBeerImg(img);
            setBeerCountry(country);
            setBeerDescription(description);

        }).catch(err => console.log(err));

        commentsService.getAllComments(beerId).then(comments =>{
            setComments(comments)
        }).catch(err => console.log(err));
    }

    render() {
        const {checkIsAdmin, username} = this.props;
        return (
            <div className="beer-page">
                {checkIsAdmin ? <BeerDetailsEditable/> : <BeerDetails/>}
                {username !== '' ? <PostComment/> : <p>You have to be logged in to post comments</p>}
                <Comments/>
            </div>
        );
    }
}

export default connect(
    state => ({
        username: state.User.get('username'),
        checkIsAdmin: state.User.get('checkIsAdmin'),
        beerId: state.Beer.get('beerId')
    }), {
        setBeer,
        setBeerName,
        setBeerType,
        setBeerPrice,
        setBeerImg,
        setBeerCountry,
        setBeerDescription,
        setComments
    }
)(Beer);


Beer.propTypes = {
    setBeer: PropTypes.func,
    setBeerName: PropTypes.func,
    setBeerType: PropTypes.func,
    setBeerPrice: PropTypes.func,
    setBeerImg: PropTypes.func,
    setBeerCountry: PropTypes.func,
    setBeerDescription: PropTypes.func,
    setComments: PropTypes.func

};

