class User {
    constructor(name_user, firstname_user, email_user, pseudo_user, password_user, password2_user) {
        // this.id_user = id_user
        this.name_user = name_user,
            this.firstname_user = firstname_user,
            this.email_user = email_user,
            this.pseudo_user = pseudo_user,
            this.password_user = password_user
        this.password2_user = password2_user
    }

    /* getIdUser(){
         return this.id_user
     }*/

    getNameUser() {
        return this.name_user
    }
    getFirstnameUser() {
        return this.firstname_user
    }
    getEmailUser() {
        return this.email_user
    }
    getPseudoUser() {
        return this.pseudo_user
    }
    getPasswordUser() {
        return this.password_user
    }
    getPassword2User() {
        return this.password2_user
    }



    /*setIdUser(id_user){
        this.id_user = id_user
    }*/
    setNameUser(name_user) {
        this.name_user = name_user
    }
    setFirstnameUser(firstname_user) {
        this.firstname_user = firstname_user
    }
    setEmailUser(email_user) {
        this.email_user = email_user
    }
    setPseudoUser(pseudo_user) {
        this.pseudo_user = pseudo_user
    }
    setPasswordUser(password_user) {
        this.password_user = password_user
    }
    setPassword2User(password2_user) {
        this.password2_user = password2_user
    }

}
module.exports = User