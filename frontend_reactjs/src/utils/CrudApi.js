import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
console.log(`${process.env.REACT_APP_BACKEND_URL}`);

const getAllData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getdata`);
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const postData = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/insertdata`, data);
    if (response.status !== 201) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const patchData = async (uniqueId, data) => {
  try {
    const response = await axios.patch(`${baseUrl}/patchdata/${uniqueId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

const deleteData = async (uniqueId) => {
  try {
    const response = await axios.delete(`${baseUrl}/deletedata/${uniqueId}`);
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

const putData = async (uniqueId, data) => {
  try {
    const response = await axios.put(`${baseUrl}/updatedata/${uniqueId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export { getAllData, postData, patchData, deleteData, putData };