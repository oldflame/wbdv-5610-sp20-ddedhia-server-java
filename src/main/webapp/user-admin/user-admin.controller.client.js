(function () {
    let usersList = []
    let userNameFld
    let passwordFld
    let firstNameFld
    let lastNameFld
    let roleFld
    let userService
    let userId

    function buildUser() {
        userName = userNameFld.val()
        password = passwordFld.val()
        firstName = firstNameFld.val()
        lastName = lastNameFld.val()
        role = roleFld.val()
        user = new User("", userName, password, firstName, lastName, role)

        resetFields()

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
                () => userService.deleteUser(users[i]._id)
                    .then(() => deleteUserFromUI(users[i].getUserId())))

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
        $('#UpdateUserBtn').click(updateUser)
    }

    function formatUsers(users) {
        return users.map(
            (user) => new User(user._id, user.username, user.password, user.firstName,
                               user.lastName,
                               user.role))

    }

    function editUserData(userId) {
        getUserDetailsFromId(userId)
    }

    function getUserDetailsFromId(userId) {
        userService.findUserById(userId).then((user) => {
            populateForm(
                new User(user._id, user.username, user.password, user.firstName, user.lastName,
                         user.role))
        })

    }

    function resetFields() {
        $('#usernameFld').val('')
        $('#passwordFld').val('')
        $('#firstNameFld').val('')
        $('#lastNameFld').val('')
        $('#roleFld').val('')
    }

    function populateForm(user) {
        userNameFld.val(user.getUserName())
        passwordFld.val(user.getPassword())
        firstNameFld.val(user.getFirstName())
        lastNameFld.val(user.getLastName())
        roleFld.val(user.getRole())
        userId = user.getUserId()
    }

    function updateUser() {
        console.log('Updating user')
        userName = userNameFld.val()
        password = passwordFld.val()
        firstName = firstNameFld.val()
        lastName = lastNameFld.val()
        role = roleFld.val()
        user = new User(userId, userName, password, firstName, lastName, role)

        resetFields()

        userService.updateUser(userId, user).then(() => {
            console.log("updated user", user)
            const indexToUpdate = usersList.findIndex((u) => u.getUserId() == userId)
            usersList.splice(indexToUpdate, 1, user)
            console.log("Post update", usersList, user)
            renderUsers(usersList)
        })

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
        $('#UpdateUserBtn').click(updateUser)

    }

    $(main)
})()
