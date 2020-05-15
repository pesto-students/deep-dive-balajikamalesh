let usersJSON = [{"id":1, "name": "Balaji Kamalesh"},{"id":2, "name": "John Wick"}];

let router = {};

router.users = function(data,callback) {
    if(data.method === 'get'){
        if(data.id){
            let user = usersJSON.find(user => user.id == data.id);
            if(user === undefined){
                callback(404, "User not found");
            } else {
                callback(200, user);
            }
        } else {
            callback(200, usersJSON);
        }
    } else if(data.method === 'post'){
        if(Object.keys(data.queryStringObject).length > 0){
            data.queryStringObject.id = usersJSON.length + 1;
            usersJSON.push(data.queryStringObject);
            callback(200, usersJSON);
        } else {
            let newUser = JSON.parse(data.payload);
            newUser.id = usersJSON.length + 1;
            console.log(newUser);
            usersJSON.push(newUser);
            callback(200, usersJSON)
        }
    } else if(data.method === 'put'){
        let user = usersJSON.find(user => user.id == data.id);
        if(user == undefined){
            callback(404, "User not found")
        } else {
            usersJSON = usersJSON.map(user => {
                if(user.id == data.id){
                    user = JSON.parse(data.payload);
                    user.id = data.id;
                    return user;
                }
                return user;
            })
            callback(200, usersJSON);
        }        
    } else if(data.method === 'delete'){
        let user = usersJSON.find(user => user.id == data.id);
        if(user == undefined){
            callback(404, "User not found")
        } else {
            usersJSON = usersJSON.filter(user => user.id != data.id);
            callback(200, usersJSON);
        } 
    } else {
        callback(405);
    }
}

router.login = function(data,callback) {
    callback(200, { 'message': 'login' })
}

router.signup =  function(data,callback) {
    callback(200, { 'message': 'signup' })
}
router.notFound = function(data,callback) {
    callback(404, { 'message': 'Path not found' });
}

module.exports = router;