class LoginPage{
    constructor(page){
        this.page=page;
    }
    async enter_username(username){
        try {
            await this.page.getByPlaceholder('Username').fill(username);   
        } catch (error) {
           console.log("Error happened while Entering username"+error);
        }
    }
    async enter_password(password){
        try {
            await this.page.getByPlaceholder('Password').fill(password);   
        } catch (error) {
           console.log("Error happened while Entering password"+error);
        }
    }

    async click_login_button(){
        try {
            const loginButton = this.page.getByRole('button', { name: 'Login' });
            await loginButton.waitFor({state: 'visible'});
            await loginButton.click();
        } catch (error) {
            console.log("Error while clicking login button");
        }
    }
}
export default LoginPage