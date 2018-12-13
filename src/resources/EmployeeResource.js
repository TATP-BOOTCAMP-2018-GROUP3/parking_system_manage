import { hostname } from'../config/Config';
const resourceName = "/employees";

export default {
    getAll: () => fetch(hostname + resourceName ,
                    {
                        method: 'GET', 
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                        })
                    }),
    forzenOrUnforzen: (record,newState) => fetch(hostname + resourceName  + "/" + record.id ,
    {
        method: 'PATCH', 
        mode: 'cors',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
            'Content-Type' : 'application/json'
        }),
        body: JSON.stringify({workingStatus: newState})
    }),
    updateEmployee: (employee) => fetch(hostname + resourceName + "/" + employee.id,
    {
        method: 'PATCH',
        mode: 'cors',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(employee)
    }),
}
