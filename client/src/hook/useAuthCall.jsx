import { useDispatch } from "react-redux";
import {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosWithToken, axiosWithoutHeader } = useAxios();

    const register = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const { data } = await axiosWithoutHeader.post(`users`, userInfo);
            dispatch(registerSuccess(data));
            navigate("/stock");
            toastSuccessNotify("Register is successful");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Register failed")
        }
    };

    const login = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const { data } = await axiosWithoutHeader.post(`auth/login`, userInfo);
            dispatch(loginSuccess(data));
            navigate("/stock");
            toastSuccessNotify("Login is successful");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Login failed")
        }
    };

    const logout = async () => {
        dispatch(fetchStart());

        try {
            const { data } = await axiosWithToken.get(`auth/logout`);
            dispatch(logoutSuccess());
            toastSuccessNotify("Logout is successful");

            navigate("/");
        } catch (error) {
            dispatch(fetchFail());
        }
    };

    return { register, login, logout };
};

export default useAuthCall;
