import axios from 'axios';

const baseUrl = 'http://18.60.62.170:8080'; // Replace with your actual backend API URL

const getAllData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getdata`);
    if (response.status !== 200) {
      // Handle non-200 status codes (e.g., 404, 500)
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be handled in AdminPage
  }
};

const postData = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/insertdata`, data);
    if (response.status !== 201) {
      // Handle non-200 status codes (e.g., 404, 500)
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
              'Content-Type': 'application/json' // Include Content-Type header
            }
          });
      if (response.status !== 200) {
        // Handle non-200 status codes (e.g., 404, 500)
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };

export { getAllData, postData, patchData };
