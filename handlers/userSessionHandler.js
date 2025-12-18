const UserSession = {
    set Current(type) {
        this.CurrentType = type;
    },
    User: "user",
    Production: "production",
    CurrentType: ""
}

const SetCurrentSessionType = (userSessionType) => {
    UserSession.Current = userSessionType;
}

module.exports = {
    UserSession, SetCurrentSessionType
}