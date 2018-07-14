import {requester} from './requester';

export const commentsService = (() => {
    function getAllComments(beerId) {
        let endpoint = `comments?query={"beerId":"${beerId}"}&sort={"_kmd.ect": -1}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }
    function createComment(beerId, content, author){
        let endpoint = `comments`;
        let data = {beerId, content, author};

        return requester.post('appdata', endpoint, 'kinvey', data)
    }
    function deleteComment(commentId){
        let endpoint = `comments/${commentId}`;
        return requester.remove('appdata', endpoint, 'kinvey');
    }

    return{
        getAllComments,
        createComment,
        deleteComment
    }
})();