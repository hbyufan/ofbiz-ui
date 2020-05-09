import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import {SearchUtils} from "../../../commons/util/search-utils";
import { safeGet } from '../../../commons/util/utility';

@inject(HttpClient)
export class ResourceEntities {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createResource(resource) {
    const body = json(resource);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/PartyRoleAndPartyDetail`, {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while creating resource');
        }
        return response.json();
      });
  }

  getResourceList(params) {

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/PartyRoleAndPartyDetail?roleTypeId=PROJECT_TEAM`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((resource) => {
          (resource.name = `${resource.firstName} ${resource.lastName}`)
          return resource;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}
