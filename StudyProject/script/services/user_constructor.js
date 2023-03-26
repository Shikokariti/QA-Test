import { Render } from "./user_render.js";
export class User {
    id;
    firstName;
    lastName;
    email;
    password;
    rememberPassword;
    sites;
    isLoggedIn;
    constructor() {
        this.createUser();
    }
    createUser() {
        let render = new Render();
        let userElements = render.renderUser();
        this.email = userElements.email.value;
        this.firstName = userElements.firstName.value;
        this.lastName = userElements.lastName.value;
        this.password = userElements.password.value;
        this.sites = [];
        this.id = null;
        this.rememberPassword = false;
        this.isLoggedIn = false;
    }
    async validateUser(counter) {
        let render = new Render();
        let userElements = render.renderUser();
        let emailValid = await this.emailValidator(userElements.email,counter);
        let passwordValid = this.passwordValidator(userElements.password,userElements.rePassword);
        let firstNameValid = this.firstNameValidator(userElements.firstName);
        let lastNameValid = this.lastNameValidator(userElements.lastName);
        if (emailValid && passwordValid && firstNameValid && lastNameValid) {
            return true;
        }
    }
    firstNameValidator(firstName) {
        let render = new Render();
        let error;
        if (firstName.value.length < 2) {
            error = 'last name at least 2 characters';
            render.validationsController(firstName,error);
        } else {
            render.removeProperty('border',firstName);
            return true;
        }
    }
    lastNameValidator(lastName) {
        let render = new Render();
        let error;
        if (lastName.value.length < 2) {
            error = 'first name at least 2 characters';
            render.validationsController(lastName,error);
        } else {
            render.removeProperty('border',lastName);
            return true;
        }
    }
    passwordValidator(password,rePassword) {
        let render = new Render();
        let error;
        if (password.value.length < 4) {
            error = 'At least 5 characters';
            render.validationsController(password,error);
            render.validationsController(rePassword,error);
        // } else if (password.value != rePassword.value) {
        //     error = 'Password does not match';
        //     render.validationsController(password,error);
        //     render.validationsController(rePassword,error);
        } else {
            render.removeProperty('border',password);
            render.removeProperty('border',rePassword);
            return true;
        }
    }
    async emailValidator(email,counter) {
        let render = new Render();
        let error;
        console.log(counter);
        counter++;
        if (counter == 4) {
            return true;
        }
        if (email.value.length < 1) {
            error = 'Insert an email address';
            render.validationsController(email,error);
        } else if (email.value.length < 6) {
            error = 'Email is not valid';
            render.validationsController(email, error);
        } else {
            let emailVerification = await fetch("https://api.mailcheck.ai/email/"+email.value).then((response)=>response.json());
            if (emailVerification.status != 200) {
                error = 'Email is not valid'
                render.validationsController(email,error);
            } else {
                render.removeProperty('border',email);
                return true;
            }
        }
    }

}

