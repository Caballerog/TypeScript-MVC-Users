export var Fetch = (
        resource:any,
        init:RequestInit={ method : 'GET' },
        defaultMessage=true):Promise<Response | void> => { 
            
    let _init : any = {...init}; 
    _init.headers = _init.headers || {};
    _init.headers['Content-Type'] = _init.headers['Content-Type'] || 'application/json; charset=utf-8';

    return new Promise<Response>((resolve,reject)=>{
        const { origin, pathname } = location;

        return fetch(resource,_init)        
        .then(res => {
            if (res.status >= 400/* Http error response range */) {
                if (defaultMessage)
                    alert(`Error fetching resource ${resource}: ${res.statusText}`); 
                reject(res.statusText);
            }
            else
                resolve(res); 
        })        
        .catch((error) => {
            if (error)
                alert(error); 
            else if (defaultMessage)
                console.warn(`Fetch exception with no error message`)
            reject(error);
        });
    })
}