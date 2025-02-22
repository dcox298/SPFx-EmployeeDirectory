import * as React from 'react';
import { useState } from 'react';
import styles from './EmployeeDirectory.module.scss';
import type { IEmployeeDirectoryProps } from './IEmployeeDirectoryProps';
import { IEmployee } from '../models/IEmployee';
import UserService from '../Services/UserService';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Separator } from '@fluentui/react/lib/Separator';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination';
import GridView from './GridView';
import { DetailsList } from '@fluentui/react/lib/DetailsList';


export default function EmployeeDirectory(props: IEmployeeDirectoryProps):JSX.Element {
  
  const [isLoaded,setLoaded] = useState(false);
  const [error,setError] = useState(undefined);

  const initMe:IEmployee = {id:'loading',userPrincipalName:'loading',businessPhones:[]}
  const [me,setMe] = useState(initMe);

  const initAllUsers:any[] = [];
  const [allUsers,setAllUsers] = useState(initAllUsers);
 
  React.useEffect(() => {
    (async (): Promise<void> => {

      const graphcClient = props.client;

      let rawUsers= await graphcClient.api('/users').top(100).get();
      while(rawUsers['@odata.nextLink']){
        const nextUsers = await graphcClient.api(rawUsers['@odata.nextLink']).get();
        rawUsers['@odata.nextLink'] = nextUsers['@odata.nextLink'];
        rawUsers.value = rawUsers.value.concat(nextUsers.value);
        
      }
      console.log(rawUsers);
      const allEmployees:IEmployee[] = await UserService.mapEmployees(rawUsers.value);
        setAllUsers(allEmployees);
        setMe(me);
        setLoaded(true);
    })().catch(err => {
      console.error(err);
        setError(err);
        setLoaded(true);
    });
  },[]);

  const { view } = props;

  return (
      <section className={`${styles.employeeDirectory}`}>
        {isLoaded?
          <Stack>   
            {error?(
              <Stack.Item>
                <Text>{JSON.stringify(error)}</Text>
              </Stack.Item>
            )
            :(
            <>
              <Stack.Item>
                <Separator />
              </Stack.Item>
              <Stack.Item>
                  {view === 'list' &&(<DetailsList items={allUsers} />)}
                  {view === 'grid' &&(<GridView allUsers={allUsers} />)}
              </Stack.Item>
              <Stack.Item>
                <Pagination 
                  currentPage={1} 
                  totalPages={10} 
                  onChange={function (page: number): void {
                            throw new Error("Function not implemented.");} 
                          }        
                  hideFirstPageJump
                  hideLastPageJump 
                />
              </Stack.Item>
            </>
            )
            }
          </Stack>
        :<Spinner />}
      </section>
  )
}