import { DocumentCard,  DocumentCardDetails, DocumentCardTitle, DocumentCardType, ISize, Persona, PersonaSize, Stack} from "@fluentui/react"
import * as React from "react"
import { IEmployee } from "../models/IEmployee";
import { GridLayout } from "@pnp/spfx-controls-react/lib/GridLayout";



interface GridViewProps{
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
          <DocumentCard
            type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
            onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert("You clicked on a grid item")}
      
          >
            {!isCompact && (
                <Persona 
                    text={item.displayName||'Error'}
                    secondaryText={item.jobTitle||'Error'}
                    //tertiaryText={item.jobTitle||'Error'}
                    imageUrl={item.photoUrl}
                    size={PersonaSize.size72}
                    imageAlt={item.displayName||'Error'}
                    //presence={item.presence}
                    //presenceTitle={item.presence}
                    
                />
                )
            }
            <DocumentCardTitle title={item.userPrincipalName||'Error'} />
            {!isCompact && (
                <DocumentCardDetails>
                    <DocumentCardTitle title={item.mail||'Error'} showAsSecondaryTitle shouldTruncate />
                    <DocumentCardTitle title={item.jobTitle||'Error'} showAsSecondaryTitle/>
                </DocumentCardDetails>
            )}
          </DocumentCard>
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