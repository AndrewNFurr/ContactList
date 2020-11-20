async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJldyIsImlhdCI6MTYwNTU3OTQ0MiwiZXhwIjoxNjA2MTg0MjQyfQ.DzczKUz2dVrLpdRGayS4yEiHC9aPWPnuqCoCqDstY-s'
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
  
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
  
    return data;
  }

  export default fetchAPI;