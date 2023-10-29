import { useDispatch, useSelector } from "react-redux";
import { makeStore } from "./makeStore";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const AppStore = makeStore().getState();
export const RootState = AppStore;
export const AppDispatch = AppStore.dispatch;