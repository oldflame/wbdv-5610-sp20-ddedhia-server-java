(function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001835414/users';
    var self = this;

    function createUser(user) {
        console.log(JSON.stringify(user))
        return(fetch( self.url, {
            method: 'POST',
            body : JSON.stringify(user.getUser()),
            headers : {
                'content-type' : 'application/json'
            }
        }).then(response =>response.json()))
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(response => response.json())
    }

    function findUserById(userId) {
    }

    function updateUser(userId, user) {
    }

    function deleteUser(userId) {
        return(fetch( `${self.url}/${userId}`, {
            method: 'DELETE',
            headers : {
                'content-type' : 'application/json'
            }
        }).then(response =>response.json()))
    }
})
()
