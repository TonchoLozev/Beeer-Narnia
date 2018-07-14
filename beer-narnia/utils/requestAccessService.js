import {requester} from './requester';

export const requestAccess = (() => {
    function getAllRequests() {
        let endpoint = 'request-access?query={}&sort={"_kmd.ect": -1}';
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

    function deleteRequest(requestId) {
        let endpoint = `request-access/${requestId}`;
        return requester.remove('appdata', endpoint, 'kinvey')
    }

    function getPostDetails(postId) {
        let endpoint = `posts/${postId}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllRequests,
        getBeer,
        createRequestAccess,
        editBeer,
        deleteRequest,
        getPostDetails
    };
})();