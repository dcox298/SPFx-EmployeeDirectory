import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'EmployeeDirectoryWebPartStrings';
import EmployeeDirectory from './components/EmployeeDirectory';
import { IEmployeeDirectoryProps } from './components/IEmployeeDirectoryProps';
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IEmployeeDirectoryWebPartProps {
  view: string;
}

export default class EmployeeDirectoryWebPart extends BaseClientSideWebPart<IEmployeeDirectoryWebPartProps> {

  private _client: MSGraphClientV3;

  protected async onInit(): Promise<void> {
    return super.onInit().then(async () => {
      this._client = await this.makeClient();
    });
  }

  public async makeClient():Promise<MSGraphClientV3>{
    const client = await this.context.msGraphClientFactory.getClient('3');
    return client;
  }

  public render(): void {
    const element: React.ReactElement<IEmployeeDirectoryProps> = React.createElement(
      EmployeeDirectory,
      {
        view: this.properties.view,
        client: this._client
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('view', {
                  label: 'Layout',
                  options: [
                    { key: 'grid', text: 'Grid' },
                    { key: 'list', text: 'List' }
                  ],
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
