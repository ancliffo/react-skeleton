import axios from 'axios';

//put this in a single, re-usable place eventually
export async function getAPIInfo(path:string): Promise<any> {
  const tempResponse = await axios.get(path)
    .catch(error => {
      console.error('Error retrieving item:', error.response?.data || error.message);
      return null;
    });
  if (!tempResponse) return null;
  return tempResponse.data;
}

export async function createAPIInfo(path:string, data:any): Promise<any> {
  const tempResponse = await axios.post(path, data)
    .catch(error => {
      console.error('Error creating item:', error.response?.data || error.message);
      return null;
    });

  if (!tempResponse) return null;
  return tempResponse.data;
}

export async function updateAPIInfo(path:string, data:any): Promise<any> {
  const tempResponse = await axios.put(path, data)
    .catch(error => {
      console.error('Error updating item:', error.response?.data || error.message);
      return null;
    });

  if (!tempResponse) return null;
  return tempResponse.data;
}