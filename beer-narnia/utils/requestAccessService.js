import {requester} from './requester';

export const requestAccess = (() => {
    function getAllBeers() {
        let endpoint = 'beers?query={}&sort={"_kmd.ect": -1}';
        return requester.get('appdata', endpoint, 'kinvey');
    }


    function getBeer(beerId) {
        let endpoint = `beers/`+ beerId;
        return requester.get('appdata', endpoint, 'kinvey')
    }

    function createRequestAccess(userId, username, firstname, lastname, reason) {
        let data = {userId, username, firstname, lastname, reason};
        return requester.post('appdata', 'request-access', 'kinvey', data)
    }

    function editBeer(beerId, name, type, price, description, country, img) {
        let endpoint = `beers/${beerId}`;
        let data = {name, type, price, description, country, img};
        return requester.update('appdata', endpoint, 'kinvey', data)
    }

    function deleteBeer(beerId) {
        let endpoint = `beers/${beerId}`;
        return requester.remove('appdata', endpoint, 'kinvey')
    }

    function getPostDetails(postId) {
        let endpoint = `posts/${postId}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllBeers,
        getBeer,
        createRequestAccess,
        editBeer,
        deleteBeer,
        getPostDetails
    };
})();