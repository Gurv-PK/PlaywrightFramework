import { LoginResponse } from "../models/Loginservice/LoginResponse";

export class ApiAuthService{
    constructor(request){
        this.request = request
    }

    async login(payload){
        const response = await this.request.post('/auth',{
            headers: {
            'Content-Type': 'application/json',
            },
            data:payload
        });
        const body = await response.json();
        return {
            status: response.status(),
            response: new LoginResponse(body)
        };
    }

    async getToken(username, password){
        const response = await this.login({username, password});
        if(!response.ok()){
            throw new Error(`Login Faild with status: ${response.status()}`)
        }
        const body = await response.json()
        return body.token;

    }
}