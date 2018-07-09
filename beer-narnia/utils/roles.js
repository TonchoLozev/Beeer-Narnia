import {requester} from './requester';

export let assignRole = (() => {

    function makeRegularUser(userId){
        let data = {userid: userId, roleid: '2b8b07ed-17cb-4737-9361-878e69250df0'};
        return requester.post('rpc', 'custom/addRole', 'kinvey', data);
    }

    function makeAdminUser(userId){
        let data = {userid: userId, roleid: '40e731c1-824f-485b-8d98-ffb30d85b6a9'};
        return requester.post('rpc', 'custom/addRole', 'kinvey', data);
    }

    return {
        makeAdminUser,
        makeRegularUser
    };
})();

export const isAdmin = sessionStorage.getItem('roleId') === '40e731c1-824f-485b-8d98-ffb30d85b6a9';