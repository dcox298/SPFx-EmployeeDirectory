export interface IUser {
    id:string;
    userPrincipalName:string;
    displayName?:string;
    givenName?:string;
    surname?:string;
    mail?:string;
    jobTitle?:string;
    mobilePhone?:string;
    officeLocation?:string;
    businessPhones:string[];
}