export class UserInfo {
    constructor(
        public name : string,
        public email : string,
        public password : string,
        public language = 'Javascript',
        public online : boolean = true,
        public wins : number = 0,
        public losses : number = 0,
        public avgScore : number = 0
    ) {}
}