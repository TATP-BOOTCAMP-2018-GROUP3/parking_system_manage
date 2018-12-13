import { hostname } from'../config/Config';
const resourceName = "/parkingclerks";

export default {
    getAll: () => fetch(hostname + resourceName ,
                        {
                            method: 'GET', 
                            mode: 'cors',
                            headers: new Headers({
                                'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                            })
                        })
  
}
