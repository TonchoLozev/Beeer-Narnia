import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import Popup from 'reactjs-popup';
import {NotificationManager} from 'react-notifications';

import {connect} from "react-redux";

import setBeerName from '../../actions/BeerActions/setBeerName';
import setBeerType from '../../actions/BeerActions/setBeerType';
import setBeerPrice from '../../actions/BeerActions/setBeerPrice';
import setBeerImg from '../../actions/BeerActions/setBeerImg';
import setBeerCountry from '../../actions/BeerActions/setBeerCountry';
import setBeerDescription from '../../actions/BeerActions/setBeerDescription';
import setBeer from "../../actions/BeerActions/setBeer";

import {beers} from '../../../utils/articlesService';
import Input from '../common/Input/Input.jsx';


class BeerDetailsEditable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = ({beerCount: 1, openSave: false, openDelete: false});

        this.openSave= this.openSave.bind(this);
        this.closeSave= this.closeSave.bind(this);

        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);

        this.deleteBeer = this.deleteBeer.bind(this);
        this.plusOneCount = this.plusOneCount.bind(this);
        this.minusOneCount = this.minusOneCount.bind(this);
        this.changeBeerCount = this.changeBeerCount.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeImg = this.changeImg.bind(this);
        this.changeCountry = this.changeCountry.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    openSave () {
        this.setState({openSave: true});
    }
    closeSave () {
        this.setState({openSave: false});
    }

    openDelete () {
        this.setState({openDelete: true});
    }
    closeDelete () {
        this.setState({openDelete: false});
    }

    plusOneCount() {
        this.setState({beerCount: this.state.beerCount + 1});
    }

    minusOneCount() {
        if (this.state.beerCount === 1) {
            return;
        }
        this.setState({beerCount: this.state.beerCount - 1});
    }

    changeBeerCount(event) {
        const count = event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.setState({beerCount: count});
    }

    changeName(event) {
        const {setBeerName} = this.props;
        const name = event.target.value;

        setBeerName(name);
    }

    changeImg(event) {
        const {setBeerImg} = this.props;
        const img = event.target.value;

        setBeerImg(img);
    }

    changeCountry(event) {
        const {setBeerCountry} = this.props;
        const country = event.target.value;

        setBeerCountry(country);
    }

    changeType(event) {
        const {setBeerType} = this.props;
        const type = event.target.value;

        setBeerType(type);
    }

    changeDescription(event) {
        const {setBeerDescription} = this.props;
        const description = event.target.value;

        setBeerDescription(description);
    }

    changePrice(event) {
        const {setBeerPrice} = this.props;
        const price = Number(event.target.value);
        if(isNaN(price)){
            return;
        }

        setBeerPrice(price);
    }

    saveChanges(){
        const {beerId, beerName, beerType, beerPrice, beerDescription, beerCountry, beerImg} = this.props;
        beers.editBeer(beerId, beerName, beerType, beerPrice, beerDescription, beerCountry, beerImg)
            .then(res => {
                this.closeSave();
                NotificationManager.success('Successfully update the product information');
            })
    }

    deleteBeer(){
        const {beerId, history} = this.props;
        beers.deleteBeer(beerId).then(res => {
            history.push('/');
            NotificationManager.success('Successfully update the product information');
        })
    }

    cancel(){
        const {history} = this.props;
        history.push('/')
    }

    render() {
        const {beerName, beerType, beerPrice, beerDescription, beerCountry, beerImg} = this.props;
        const {beerCount} = this.state;
        return (
            <div className="beer-details-editable">
                <span>Name</span>
                <input value={beerName} onChange={this.changeName}/>
                <img src={beerImg}/>
                <span>Image URL</span>
                <input value={beerImg} onChange={this.changeImg}/>
                <span>Country</span>
                <input value={beerCountry} onChange={this.changeCountry}/>
                <span>Type</span>
                <input value={beerType} onChange={this.changeType}/>
                <span>Description</span>
                <textarea value={beerDescription} onChange={this.changeDescription}/>
                <span>Price in euro</span>
                <input value={beerPrice} onChange={this.changePrice}/>
                <div className="buttons">
                    <button onClick={this.openSave}>Save changes</button>
                    <Popup
                        open={this.state.openSave}
                        closeOnDocumentClick
                        onClose={this.closeSave}
                    >
                        <div className="save-changes">
                            <span>Are you sure you want to save the changes?</span>
                            <div className="save-changes-buttons">
                                <button onClick={this.saveChanges}>Yes</button>
                                <button onClick={this.closeSave}>No</button>
                            </div>
                        </div>
                    </Popup>
                    <button onClick={this.cancel}>Cancel</button>
                    <button onClick={this.openDelete}>Delete article</button>
                    <Popup
                        open={this.state.openDelete}
                        closeOnDocumentClick
                        onClose={this.closeDelete}
                    >
                        <div className="save-changes">
                            <span>Are you sure you want to delete the article?</span>
                            <div className="save-changes-buttons">
                                <button onClick={this.deleteBeer}>Yes</button>
                                <button onClick={this.closeDelete}>No</button>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        cart: state.Cart.get('cart'),
        beerId: state.Beer.get('beerId'),
        beer: state.Beer.get('beer'),
        beerName: state.Beer.get('beerName'),
        beerType: state.Beer.get('beerType'),
        beerPrice: state.Beer.get('beerPrice'),
        beerDescription: state.Beer.get('beerDescription'),
        beerImg: state.Beer.get('beerImg'),
        beerCountry: state.Beer.get('beerCountry')
    }),
    {
        setBeer,
        setBeerName,
        setBeerType,
        setBeerPrice,
        setBeerImg,
        setBeerCountry,
        setBeerDescription
    }
)(withRouter(BeerDetailsEditable));


BeerDetailsEditable.propTypes = {
    setBeer: PropTypes.func,
    setBeerName: PropTypes.func,
    setBeerType: PropTypes.func,
    setBeerPrice: PropTypes.func,
    setBeerImg: PropTypes.func,
    setBeerCountry: PropTypes.func,
    setBeerDescription: PropTypes.func
};



