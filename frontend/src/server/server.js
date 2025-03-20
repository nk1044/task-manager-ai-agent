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

const GetTaskById = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/v1/tasks/${id}`);
        console.log(response?.data?.data);
        return response?.data?.data ?? [];
    } catch (error) {
        console.error(error);
    }
}

const CreateTask = async (task) => {
    try {
        const response = await axios.post(`${backend_url}/api/v1/tasks`, task);
        console.log(response?.data?.data);
        return response?.data?.data ?? null;
    } catch (error) {
        console.error(error);
    }
}

const UpdateTask = async (data) => {
    try {
        const response = await axios.put(`${backend_url}/api/v1/task/`, data);
        console.log(response?.data?.data);
        return response?.data?.data ?? null;
    } catch (error) {
        console.error(error);
    }
}

const DeleteTask = async (id) => {
    try {
        const response = await axios.delete(`${backend_url}/api/v1/tasks/${id}`);
        console.log(response?.data?.data);
        return response?.data?.data ?? null;
    } catch (error) {
        console.error(error);
    }
}

const UpdateTaskStatus = async (id, status) => {
    try {
        const response = await GetTaskById(id);
        response.status = status;
        const result = await UpdateTask(response);
        console.log(result?.data?.data);
        return result?.data?.data ?? null;
        
    } catch (error) {
        console.error(error);
    }
}

export {
    GetAllTasks,
    GetTaskById,
    CreateTask,
    UpdateTask,
    DeleteTask,
    UpdateTaskStatus,
}