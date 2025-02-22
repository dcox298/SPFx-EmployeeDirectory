export interface IEmployee {
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
    photoUrl?:string;
}