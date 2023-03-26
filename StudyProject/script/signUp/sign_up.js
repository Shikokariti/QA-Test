import { User } from '../services/user_constructor.js';
import { UsersDB } from '../services/user_db.js';
import { Render } from "../services/user_render.js";
let db = new UsersDB();
let counter = 0;
document.getElementById('loginScreenBtn').addEventListener('click',()=>{
    window.location.href = "../../html/login/login.html";
});
//Transfer to login screen//
document.getElementById('signUpSuccess').addEventListener('click',()=>{
    window.location.href = "../../html/login/login.html";
});
//Check and create User//
document.getElementById('signUpBtn').addEventListener('click',async ()=>{
    let user = new User();
    counter++;
    let validUser = await user.validateUser(counter);
    if (validUser) {
        let userExist = db.checkIfExistUserByEmail(user.email);
        if (!userExist) {
            db.createUser(user);
            popUp(user);
        } else {
            let render = new Render();
            let userElements = render.renderUser();
            render.validationsController(userElements.email,'Email Already Exist');
        }
    }
});
//Success POPUP
function popUp(user) {
        document.getElementById('welcome').innerText = `Welcome ${user.firstName} ${user.lastName}`;
        document.getElementById('signUpCard').style.display = "none";
        document.getElementById('signUpSuccess').style.display = "block";
}