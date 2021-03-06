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
                        }),
    getById: (id) => fetch(hostname + resourceName + "/id",
                        {
                            method: 'GET', 
                            mode: 'cors',
                            headers: new Headers({
                                'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                            })
                        }),
    addEmployee: (account_name, email, phoneNumb) => fetch(hostname + resourceName ,
        {
            method: 'POST', 
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "accountName": account_name,
                "email": email,
                "phoneNum": phoneNumb
            })
        }
    )
  
}
