import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {

    const { token } = useSelector((state) => state.auth);

    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL, // burasi VITE_apiKey mi olacak, emin degilim? Stock-App .env'de kendi clarusway hesabi yazilmis.
        headers: {
            Authorization: `Token ${token}`
        }
    });

    const axiosWithoutHeader = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });

    return { axiosWithToken, axiosWithoutHeader }
}

export default useAxios