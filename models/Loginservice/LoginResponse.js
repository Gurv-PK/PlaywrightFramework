export class LoginResponse{
    constructor(responseBody){
        this.token = responseBody.token;
    }

    isTokenPresent(){
        return !!this.token;
    }
}