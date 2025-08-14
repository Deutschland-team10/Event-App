import React from "react";
import {
    fetchFail,
    fetchStart,
    setEvent,
    eventSuccess,
    getEventCategoryGroupSuccess,
    getChatsSuccess,
    addMessage,
    getMessagesSuccess,
} from "../features/chat/hooks/eventSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useEventCall = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { axiosWithToken } = useAxios();

    /* -------------------------------------------------------------------------- */
    /*                               GET EVENT DATA                               */
    /* -------------------------------------------------------------------------- */

    const getEventData = async (url, creater) => {
        let finallUrl;
        if (creater) {
            finallUrl = `${url}?filter[creater]=${creater}`;
        } else {
            finallUrl = `${url}`;
        }
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get(finallUrl);
            // console.log(data);
            dispatch(eventSuccess({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toastErrorNotify(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    };
    /* -------------------------------------------------------------------------- */
    /*                                 DELETE DATA                                */
    /* -------------------------------------------------------------------------- */
    const getDeleteData = async (url, id) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.delete(`${url}/${id}`);
            getEventData(url);
            toastSuccessNotify(`${url} is deleted successfully!`);
        } catch (error) {
            dispatch(fetchFail());
        }
    };
    /* -------------------------------------------------------------------------- */
    /*                                ADD NEW                                     */
    /* -------------------------------------------------------------------------- */
    const postEventData = async (url, info) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.post(`${url}`, info);
            console.log(data);
            setEvent(url);
            toastSuccessNotify(`${url} is saved successfully!`);
        } catch (error) {
            dispatch(fetchFail());
        }
    };

    const postEventFormData = async (url, info) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.post(`${url}`, info, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            getEventData(url);
            toastSuccessNotify(`${url} is saved successfully!`);
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toastErrorNotify(
                error?.response?.data?.message || "Something went wrong!"
            );
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                                 UPDATE DATA                                */
    /* -------------------------------------------------------------------------- */
    const updateEventData = async (url, info) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.put(`${url}/${info._id}`, info);
            getEventData(url);
            console.log('line 100', data);
            toastSuccessNotify(`${url} is updated successfully!`);
        } catch (error) {
            dispatch(fetchFail());
        }
    };

    const joinEvent = async (eventId) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.put(`events/join/${eventId}`);
            // dispatch(joinEventSuccess(data)); // gelen kullanıcı bilgisi
            console.log('line 112', data);
            dispatch(setEvent(data.result))
            toastSuccessNotify("Sie haben Aktivität an der teilgenommen!");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Fehler.");
        }
    };


    const updateEventFormData = async (url, info) => {
        dispatch(fetchStart());
        const _id = info.get("_id");
        try {
            const { data } = await axiosWithToken.put(`${url}/${_id}`, info, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            getEventData(url);
            toastSuccessNotify(`${url} is updated successfully!`);
        } catch (error) {
            dispatch(fetchFail());
        }
    };

    const getUserChats = async (url) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get(url);
            // console.log("User chats:", data);
            dispatch(getChatsSuccess(data)); // direkt data gönder
        } catch (error) {
            dispatch(fetchFail());
            console.error(error);
        }
    };
    const getMessage = async (chatId) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get('/chats/messages/' + chatId);
            dispatch(getMessagesSuccess(data)); // direkt data gönder
        } catch (error) {
            dispatch(fetchFail());
            console.error(error);
        }
    };

    const postMessage = async (info) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.post('/chats/messages/', info);
            dispatch(addMessage(data.result));
        } catch (error) {
            dispatch(fetchFail());
            console.error(error);
        }
    };

    const getEventCategoryGroup = async () => {
        dispatch(fetchStart());
        try {
            const [events, categories, groups] = await Promise.all([
                axiosWithToken("events"),
                axiosWithToken("categories"),
                axiosWithToken("groups"),
            ]);
            dispatch(
                getEventCategoryGroupSuccess([
                    events?.data?.result,
                    categories?.data?.result,
                    groups?.data?.result,
                ])
            );
        } catch (error) {
            dispatch(fetchFail());
        }
    };
    return {
        getEventData,
        getDeleteData,
        postEventData,
        updateEventData,
        getMessage,
        getEventCategoryGroup,
        updateEventFormData,
        postEventFormData,
        joinEvent,
        postMessage,
        getUserChats,

    };
};
export default useEventCall;

