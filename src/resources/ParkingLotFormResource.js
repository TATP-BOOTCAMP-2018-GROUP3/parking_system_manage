const hostname = "https://parking-system-backend-prod.herokuapp.com";
const resourceName = "/parkinglots";

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
