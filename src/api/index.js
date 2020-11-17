export const fetchAPI = async (url, method="GET", sendData=null) => {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJldyIsImlhdCI6MTYwNTU3MzE0OCwiZXhwIjoxNjA2MTc3OTQ4fQ.UVdeaU2J89nu6R7Yg1vH5WxmFWXz8PCKn9TBnum5nfc'
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
  
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
  
    return data;
  }