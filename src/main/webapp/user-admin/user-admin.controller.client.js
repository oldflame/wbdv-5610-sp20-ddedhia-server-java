(function () {
    let usersList = []
    let userNameFld
    let passwordFld
    let firstNameFld
    let lastNameFld
    let roleFld
    let userService

    function buildUser() {
        userName = userNameFld.val()
        password = passwordFld.val()
        firstName = firstNameFld.val()
        lastName = lastNameFld.val()
        role = roleFld.val()
        user = new User("", userName, password, firstName, lastName, role)

        userService.createUser(user).then((user) => {
            console.log("inside build user res", user)

            usersList.unshift(
                new User(user._id, user.username, user.password, user.firstName, user.lastName,
                         user.role))
            renderUsers(usersList)
        })
    }

    function renderUsers(users) {
        resetUsersList()

        for (let i = 0; i < users.length; i++) {
            let newRow = $(`
                <tr>
                    <td>${users[i].getUserName()}</td>
                    <td>${users[i].getPassword()}</td>
                    <td>${users[i].getFirstName()}</td>
                    <td>${users[i].getLastName()}</td>
                    <td>${users[i].getRole()}</td>
                    <td>
                    <span>
                    <i id=${users[i].getUserId()}_edit class="fa-2x fa fa-pencil"></i>
                    <i id=${users[i].getUserId()}_delete class="fa-2x fa fa-trash"></i>
                    </span>
                    </td>
                    
                </tr>
            `)

            $('#userList').append(newRow)
            $(`#${users[i].getUserId()}_delete`).click(
                () => deleteUser(users[i]._id).then(() => deleteUserFromUI(users[i].getUserId())))

            $(`#${users[i].getUserId()}_edit`).click(() => editUserData(users[i].getUserId()))
        }
    }

    function deleteUserFromUI(userId) {
        const indexToDelete = usersList.findIndex(user => user.getUserId() == userId)
        usersList.splice(indexToDelete, 1)
        console.log("post delete", usersList)
        renderUsers(usersList)
    }

    function resetUsersList() {
        let userRows = $('#userList>tr').get()
        userRows.splice(1, userRows.length - 1)
        $('#userList').html(userRows)
        $('#AddUserBtn').click(buildUser)
    }

    function formatUsers(users) {
        return users.map(
            (user) => new User(user._id, user.username, user.password, user.firstName,
                               user.lastName,
                               user.role))

    }

    function editUserData(userId) {
        getUserDetailsFromId(userId)
        // console.log("editing", userDetails)
        // populateForm(userDetails)
    }

    function getUserDetailsFromId(userId) {
        userService.findUserById(userId).then((user) => {
            populateForm(new User(user._id, user.username, user.password, user.firstName, user.lastName,
                            user.role))
        })

    }



    function populateForm(user) {
        userNameFld.val(user.getUserName())
        passwordFld.val(user.getPassword())
        firstNameFld.val(user.getFirstName())
        lastNameFld.val(user.getLastName())
        roleFld.val(user.getRole())
    }

    function main() {

        userNameFld = $('#usernameFld')
        passwordFld = $('#passwordFld')
        firstNameFld = $('#firstNameFld')
        lastNameFld = $('#lastNameFld')
        roleFld = $('#roleFld')
        userService = new AdminUserServiceClient()
        userService.findAllUsers().then((users) => {
            usersList = formatUsers(users)
            renderUsers(usersList)
        })
        $('#AddUserBtn').click(buildUser)
        $('#UpdateUserBtn').click()

    }

    $(main)
})()
