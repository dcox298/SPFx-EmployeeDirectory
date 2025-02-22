import { IEmployee } from "../models/IEmployee";



export default class UserService {
    /**
     * mapUser
     */
    public static mapUser(user:any,photoUrl:string):IEmployee {
        const employee:IEmployee = {
            id: user.Id||'error',
            userPrincipalName: user.userPrincipalName||'error',
            displayName:user.displayName||'error',
            givenName:user.givenName||'',
            surname:user.surname||'',
            mail:user.mail||'',
            jobTitle:user.jobTitle||'',
            mobilePhone:user.mobilePhone||'',
            officeLocation:user.officeLocation||'',
            businessPhones: user.businessPhones || [],
            photoUrl:photoUrl||''
        }
        return employee
    }
    /**
     * mapEmployee
     */
    public static async mapEmployee(user:any):Promise<IEmployee> {
        // const graph = getGraph();
        // const photo = await graph.users.getById(user.id).photo.getBlob();
        // const photoUrl=URL.createObjectURL(photo);
        const employee:IEmployee = this.mapUser(user,'');
        return employee
    }
    public static async mapEmployees(users:any[]):Promise<IEmployee[]> {
        const employees:IEmployee[] = [];
        for (const user of users) {
            employees.push(await UserService.mapEmployee(user));
        }
        return employees
    }
}