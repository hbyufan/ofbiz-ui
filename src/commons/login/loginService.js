import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setUserLoginId } from "../../store/state";

@inject(HttpClient, Store)
export class LoginService {

  constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
  }

  async loginAttempt(username, password) {
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/auth/v1",
        {
          method: 'POST',
          body: json({
              "username": username,
              "password": password
            }
          )
        }
      );
    if (response.ok) {
      const responseData = await response.json();
      this.store.dispatch('setUserLoginId', responseData['userLoginId']);
      localStorage.setItem("userLoginId", responseData['userLoginId']);
      localStorage.setItem("token", responseData['token']);
      return true;
    }
  }

}
