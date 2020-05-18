const Router = require('./router');

class User extends Router {
    constructor() {
        super('user');
        this.users = [{"id":1,"name":"Balaji","age":23},{"id":2,"name":"Balaji","age":23},{"id":3,"name":"Balaji","age":23}]
    }

  _get(req, res) {
    if(req.id){
      let userFound = this.users.find(x => x["id"] == req.id);
      if(userFound)
        res.end(JSON.stringify(userFound));
      else
        res.end(`record not found for the id: ${req.id}`)
    }else{
      res.end(JSON.stringify(this.users));
    }
  }
  _post(req, res) {
    let payload = JSON.parse(req.body);
    payload.id = this.users.length + 1;
    this.users.push(payload);
    res.end(`record created with id: ${payload.id}`)
  }

  _put(req, res) {
    if(req.id){
      let isFound = false;
      this.users = this.users.map(user => {
                      if(user.id == req.id){
                        user = JSON.parse(req.body);
                        user.id = req.id;
                        isFound = true;
                      }
                      return user;
                    })
      isFound ? res.end(`record updated for id: ${req.id}`) : res.end(`Record not found for id: ${req.id}`);
    }else{
      res.end(`put request requires an id`);
    }
  }

  _delete(req, res) {
    if(req.id){
      let foundIndex = -1;
      this.users.forEach((element,index) => {
        if(element.id == req.id){
          foundIndex = index;
        }
      });

      this.users.splice(foundIndex,1);
      
      (foundIndex !== -1) ? res.end(`record deleted for id: ${req.id}`) : res.end(`Record not found for id: ${req.id}`);
    }else{
      res.end(`delete request requires an id`);
    }
  }
}

module.exports = User