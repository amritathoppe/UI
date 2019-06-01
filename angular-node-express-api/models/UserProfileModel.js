class UserProfileModel
{
    constructor(id, userName, password, firstName, lastName, interests, state)
    {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.interests = interests;
        this.state = state;
    }
}

module.exports = UserProfileModel;
