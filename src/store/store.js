// copied from  ---> https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store

import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
