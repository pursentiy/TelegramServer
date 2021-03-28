const UserSession = {
    set current(type) {
        this.CurrentType = type;
    },
    User: "user",
    Debug: "debug",
    CurrentType: ""
}

var SetCurrentSessionType = (userSessionType) => {
    UserSession.current = userSessionType;
}

module.exports = {
    UserSession, SetCurrentSessionType
}