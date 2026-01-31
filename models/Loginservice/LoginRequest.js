import Apidata from '../../test-data/logindata.json' assert { type: 'json' }


export class LoginRequest{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    static validLogin(){
        return new LoginRequest(Apidata.validcreds.username,Apidata.validcreds.password)
    }

    static InvalidLogin(){
        return new LoginRequest(Apidata.invalidcreds.username,Apidata.invalidcreds.password)
    }

    toJSON(){
        return {
            username: this.username,
            password: this.password
        };
    }
}