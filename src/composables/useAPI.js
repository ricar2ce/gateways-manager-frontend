import {Notify} from "quasar";

export const useAPI = () => {
  const baseUrl = process.env.API_URL;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors'
  }

  /**
   * GET All gateways
   * @param url
   * @returns {Promise<any>}
   */
  const get = async (url) => {
    return await fetch(baseUrl + url, {
      ...options,
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        Notify.create({
          message: error,
          color: 'negative',
        });
      });
  }

  /**
   * POST create a new gateway
   * @param url
   * @param data
   * @returns {Promise<Response<any, Record<string, any>, number>>}
   */
  const post = async (url, data) => {
    return await fetch(baseUrl+url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Success:', data)
        if (data?.success) {
          Notify.create({
            message: data.message,
            color: 'positive',
            position: 'bottom',
          });
        } else {
          console.log("Error updating gateway");
          Notify.create({
            message: data?.message,
            color: 'negative',
          });
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        Notify.create({
          message: error,
          color: 'negative',
        });
      });
  }

  /**
   * PUT update a gateway
   * @param url
   * @param data
   * @returns {Promise<any>}
   */
  const put = async (url, data) => {
    return await fetch(baseUrl+url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data?.success) {
          Notify.create({
            message: data.message,
            color: 'positive',
            position: 'bottom',
          });
        } else {
          console.log("Error updating gateway: ", data?.message);
          Notify.create({
            message: data?.message,
            color: 'negative',
          });
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        Notify.create({
          message: error,
          color: 'negative',
        });
      });
  }

  /**
   * DELETE a gateway
   * @param url
   * @returns {Promise<any>}
   */
  const remove = async (url) => {
    return await fetch(baseUrl+url, {
      ...options,
      method: 'DELETE'
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data?.success) {
          Notify.create({
            message: data.message,
            color: 'positive',
            position: 'bottom',
          });
        } else {
          console.log("Error deleting gateway: ", data?.message);
          Notify.create({
            message: data?.message,
            color: 'negative',
          });
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        Notify.create({
          message: error,
          color: 'negative',
        });
      });
  }

  return { get, post, put, remove };
}
