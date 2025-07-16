import React from "react";
import {
    fetchFail,
    fetchStart,
    eventSuccess,
    getEventCategoryGroupSuccess,
    getMessageSuccess,
} from "../features/eventSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
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
    const getEventData = async (url) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get(`${url}`);
            dispatch(eventSuccess({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
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
            getEventData(url);
            toastSuccessNotify(`${url} is saved successfully!`);
        } catch (error) {
            dispatch(fetchFail());
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
            toastSuccessNotify(`${url} is updated successfully!`);
        } catch (error) {
            dispatch(fetchFail());
        }
    };
    const getMessage = async (url) => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get(`${url}`);
            dispatch(getMessageSuccess({ data, url }));
        } catch (error) {
            dispatch(fetchFail());
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
        getEventCategoryGroup
    };
};
export default useEventCall;