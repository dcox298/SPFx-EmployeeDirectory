import { ISize,  PersonaBase,  PersonaSize, Stack} from "@fluentui/react"
import * as React from "react"
import { IEmployee } from "../models/IEmployee";
import { GridLayout } from "@pnp/spfx-controls-react/lib/GridLayout";
import { LivePersona } from "@pnp/spfx-controls-react";
import { WebPartContext } from "@microsoft/sp-webpart-base";



interface GridViewProps{
  context:WebPartContext
  allUsers:IEmployee[];
}

export default function GridView(props:GridViewProps):JSX.Element {
    const { allUsers } = props;
    const _onRenderGridItem = (item: IEmployee, finalSize: ISize, isCompact: boolean): JSX.Element => {

        return <div
          data-is-focusable={true}
          role="listitem"
          aria-label={item.displayName}
        >
         <Stack>
            <Stack horizontal>
              <LivePersona serviceScope={props.context.serviceScope} upn={item.userPrincipalName} 
                template={
                 <PersonaBase text={item.displayName} size={PersonaSize.size56}>
                  
                 </PersonaBase>
                }
              />
            </Stack>
         </Stack>
        </div>;
      }
    return (
      <Stack>
        <GridLayout
              ariaLabel="List of content, use right and left arrow keys to navigate, arrow down to access details."
              items={allUsers}
              onRenderGridItem={(item: IEmployee, finalSize: ISize, isCompact: boolean) => _onRenderGridItem(item, finalSize, isCompact)}
        />
      </Stack>
       
      
    )
}