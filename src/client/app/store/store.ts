import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/ToastSlice";
import { apiSlice } from "./slices/ApiSlice";
import { wishlistApi } from "./apis/WishlistApi";
import authReducer from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toasts: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware, wishlistApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
