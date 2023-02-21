export const useAPI = () => {
  const baseUrl = process.env.API_URL;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors'
  }

  const get = async (url) => {
    const response = await fetch(baseUrl+url, {
      ...options,
      method: 'GET'
    });
    return response.json();
  }

  const post = async (url, data) => {
    const response = await fetch(baseUrl+url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const put = async (url, data) => {
    const response = await fetch(baseUrl+url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const del = async (url) => {
    const response = await fetch(baseUrl+url, {
      ...options,
      method: 'DELETE'
    });
    return response.json();
  }

  return { get, post, put };
}
