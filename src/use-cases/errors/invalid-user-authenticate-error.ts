export class InvalidUserAuthenticateError extends Error{
    constructor(){
        super('E-mail/Password invalid')
    }
}