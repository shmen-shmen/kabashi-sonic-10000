import { configureStore } from "@reduxjs/toolkit";

import slidersReducer from "../features/sliders/slidersSlice";

export const store = configureStore({
	reducer: {
		sliders: slidersReducer,
	},
});
