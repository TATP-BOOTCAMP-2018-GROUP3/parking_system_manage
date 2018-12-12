const hostname = "https://parking-system-backend.herokuapp.com";
const resourceName = "/parkinglots";

export default {
    getAll: () => fetch(hostname + resourceName ,
                    {
                        method: 'GET', 
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
                        })
                    }),
    unassignClerk: (parkingLot) => fetch(hostname + resourceName + "/" + parkingLot.id ,
                    {
                        method: 'PUT', 
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                            'Content-Type' : 'application/json'
                        }),
                        body: JSON.stringify({...parkingLot})
                    }),
    assignClerk: (parkingLot, parkingClerkId) => fetch(hostname + resourceName + "/" + parkingLot.id ,
                    {
                        method: 'PATCH', 
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                            'Content-Type' : 'application/json'
                        }),
                        body: JSON.stringify({...parkingLot, employeeId: parkingClerkId})
                    }),
}
