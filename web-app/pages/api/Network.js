let domain = "http://" + (process.env.REACT_APP_API_IP || 'localhost') + ":8080/vision"
console.log('domain:', domain)

export async function HttpRequest(method, route, body) {
    let url = domain + route;
    //log in to server
    let data = {
        method: method,
        // credentials: 'same-origin',
        // mode: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if (body) {
        data.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(url, data);
        let contentType = response.headers.get('content-type')
        console.log(response);

        // if(!response.ok) {
        //     throw new Error(response.statusText);
        // }

        // if (contentType.includes('application/json')) {
        //     let jsonResponse = await response.json();

        //     if (jsonResponse.error) {                
        //         throw jsonResponse.error;
        //     }

        //     return jsonResponse.data;
        // }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default {HttpRequest};
