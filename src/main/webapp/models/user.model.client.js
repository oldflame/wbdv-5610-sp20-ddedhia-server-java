function User(_id, username, password, firstName, lastName, role) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this._id = _id;

    function setUsername(username) {
        this.username = username;
    }

    this.getUserName = function () {
        return this.username;
    }

    function setPassword(password) {
        this.password = password;
    }

    this.getPassword = function () {
        return this.password;
    }

    function setFirstName(firstName) {
        this.firstName = firstName;
    }

    this.getFirstName = function () {
        return this.firstName;
    }

    function setLastName(lastName) {
        this.lastName = lastName;
    }

    this.getLastName = function () {
        return this.lastName;
    }

    function setRole(role) {
        this.role = role;
    }

    this.getRole = function () {
        return this.role;
    }

    this.getUserId = function () {
        return this._id;
    }

    function setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    this.getPhoneNumber = function(){
        return this.phoneNumber
    }

    function setEmail(email){
        this.email = email
    }

    this.getEmail = function () {
        return this.email
    }

    function setDateOfBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth
    }

    this.getDateOfBirth = function(){
        return this.dateOfBirth
    }

    this.getUser = function () {
        return {
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role
        }
    }

}