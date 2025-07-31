import { useDispatch } from "react-redux";
import {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    registerSuccess,
    userUpdateSuccess,
} from "../features/chat/hooks/authSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from "../helper/firebase";

const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosWithToken, axiosWithoutHeader } = useAxios();

    const register = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const { data } = await axiosWithoutHeader.post(`auth/register`, userInfo);
            console.log('lıne 25',data);
            dispatch(registerSuccess(data));
            navigate("/home");
            toastSuccessNotify("Register is successful");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Register failed");
        }
    };


    const updateUser = async (userInfo, id) => {
        dispatch(fetchStart());
        console.log(userInfo);
        try {
            const { data } = await axiosWithToken.put(`users/${id}`, userInfo);
            dispatch(userUpdateSuccess(data));
            navigate("/home/profile")
            toastSuccessNotify("User updated succesfully");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("User update failed");
        }
    };

    const login = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const { data } = await axiosWithoutHeader.post(`auth/login`, userInfo);
            dispatch(loginSuccess(data));
            navigate("/home");
            toastSuccessNotify("Login is successful");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Login failed");
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

    // Google ile giriş fonksiyonu
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Kullanıcı bilgileri result.user içinde bulunur
            console.log(result);
            return result.user;
        } catch (error) {
            // Hata yönetimi
            if (error.code === 'auth/popup-closed-by-user') {
                console.warn("Google giriş penceresi kullanıcı tarafından kapatıldı.");
            } else {
                console.error("Google ile oturum açılırken bir hata oluştu:", error);
            }
            throw error; // Hatayı çağırana ilet
        }
    };

    const loginWithGoogle = (navigate) => {
        googleProvider.setCustomParameters({ prompt: "select_account" });
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                sessionStorage.setItem("userInfo", "true")
                navigate("/home")
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return {
        register,
        login,
        logout,
        signInWithGoogle,
        loginWithGoogle,
        updateUser
    };
};

export default useAuthCall;