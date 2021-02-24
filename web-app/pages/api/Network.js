let domain = "http://" + (process.env.REACT_APP_API_IP || 'localhost') + ":8080"
console.log('domain:', domain)

export async function HttpRequest(method, route ,body) {
    let url = domain + route;
    //log in to server
    let data = {
        method: method,
        // credentials: 'same-origin',
        // mode: 'same-origin',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Accept': 'application/'+type,
        //     'Content-Type': 'application/'+type
        // }
    }

    if (body) {
        data.body = body;
    }

    try {
        let response = await fetch(url, data);
        let contentType = response.headers.get('content-type')
        console.log(response);

    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default {HttpRequest};
