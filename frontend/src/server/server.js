import axios from 'axios';


const backend_url = String(import.meta.env.VITE_BACKEND_URL);

const GetAllTasks = async () => {
    try {
        const response = await axios.get(`${backend_url}/api/v1/tasks`);
        console.log(response?.data?.data);
        return response?.data?.data ?? [];
    } catch (error) {
        console.error(error);
    }
}

export {
    GetAllTasks,
}