import { hostname } from'../config/Config';
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
    addLot: (name, capacity) => fetch(hostname + resourceName ,
        {
            method: 'POST', 
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "parkingLotName": name,
                "capacity": capacity
            })
        }
    ),
    closeLot: (id) => fetch(hostname + resourceName + "/" + id,
        {
            method: 'PATCH', 
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({status: "close"})
        }
    ),
    openLot: (id) => fetch(hostname + resourceName + "/" + id,
    {
        method: 'PATCH', 
        mode: 'cors',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({status: "open"})
    }
),
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
                        body: JSON.stringify({employeeId: parkingClerkId})
                    }),
    updateParkingLot: (parkingLot) => fetch(hostname + resourceName + "/" + parkingLot.id,
                    {
                        method: 'PATCH',
                        mode: 'cors',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('AUTH'),
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(parkingLot)
                    }),
}
