import { hostname } from'../config/Config';
const resourceName = "/auth";

export default {
    login: (request) => fetch(hostname + resourceName + '/login',
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(request)
                    })
}