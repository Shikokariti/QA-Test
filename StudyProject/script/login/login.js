import { UsersDB } from '../services/user_db.js';
import { Render } from "../services/user_render.js";
let db = new UsersDB();
document.getElementById('loginBtn').addEventListener('click',credentialsValidation);
document.getElementById('signUpBtn').addEventListener('click',()=>{
    window.location.href = "../../html/signUp/sign_up.html";
});

function credentialsValidation() {
    let validUser = false;
    let render = new Render();
    let userElements = render.renderUser();
    let user = db.getUserByEmail(userElements.email.value);
    if (user == null) {
        render.validationsController(userElements.email,'Error')
    } else {
        render.removeProperty('border',userElements.email);
        if (user.password == userElements.password.value) {
            validUser = true;
        }
        if (validUser) {
            render.removeProperty('border',userElements.password);
            user.isLoggedIn = true;
            alert('login success');
        } else {
            render.validationsController(userElements.password,'Wrong password')
        }
    }

}
