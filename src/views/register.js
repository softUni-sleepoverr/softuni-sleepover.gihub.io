import { register } from "../data/user.js";
import { html } from "../lib/lit-html.js";
import { submitHandler } from "../util.js";

const registerTemplate = (onSubmit) => html`
    <h2>Register</h2>
    <form @submit=${onSubmit}>
    <label>Email <input type="text" name="email"></label>
    <label>Username <input type="text" name="username"></label>
    <label>Password <input type="password" name="password"></label>
    <label>Repeat <input type="password" name="repass"></label>
    <button>Login</button>
</form>
`;
export function registerView(ctx){
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({email,username, password, repass}){

    
    if(email =='' || password == '' || username == ''){
        return alert('ALl fields are required')
    }
    if(password !== repass){
        return alert('Password must match!')
    }
    await register( email, username, password );
    ctx.page.redirect('/rooms')
}
}