import { MSGraphClientV3 } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IEmployeeDirectoryProps {
  context:WebPartContext;
  client:MSGraphClientV3;
  view:string;
}
