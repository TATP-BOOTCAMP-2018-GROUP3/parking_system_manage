import { hostname } from'../config/Config';
const resourceName = "/returnorders";

export default {
    getAll: () => fetch(hostname + resourceName,
                    {
                        method: 'GET', 
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                        })
                    }),
    getByStatus: (status) => fetch(hostname + resourceName + "?status=" + status, 
                            {
                                method: 'GET', 
                                mode: 'cors',
                                headers: new Headers({
                                    'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                                })
                            }),
    getById: (id) => fetch(hostname + resourceName + "/" + id, {method: 'GET', mode: 'cors'}),
    add: (order) => fetch(hostname + resourceName,
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(order)
                    }),
    markCompleted: (order) => fetch(hostname + resourceName + "/" + order.id,
                    {
                        method: 'PATCH',
                        mode: 'cors',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                        }),
                        body: JSON.stringify({...order, status: 'Completed'})
                    })
  
}
  