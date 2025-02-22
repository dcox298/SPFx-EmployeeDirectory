import { MSGraphClientV3 } from "@microsoft/sp-http";
export interface IEmployeeDirectoryProps {
  view:string;
  client:MSGraphClientV3;
}
