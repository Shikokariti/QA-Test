export class Render {
    constructor() {
    }
    renderUser() {
        let getEmail = document.getElementById('email');
        let getFirstName = document.getElementById('firstName');
        let geLastName = document.getElementById('lastName');
        let getPassword = document.getElementById('password');
        let getRePassword = document.getElementById('rePassword');
        let user = {
            email: getEmail,
            firstName: getFirstName,
            lastName: geLastName,
            password: getPassword,
            rePassword: getRePassword
        }
        return user;
    }
    validationsController(element,error) {
        element.value = '';
        element.style.border = "thick solid #cc1f26";
        element.setAttribute('placeholder', error);
    }
    removeProperty(property,element) {
        element.style.removeProperty(property);
    }
}

