import { toast } from 'react-toastify';

const handleApiError = (err) => {

    const message =
        err.response?.data?.message
        || err.message;

    toast.error(message);
};

export default handleApiError;