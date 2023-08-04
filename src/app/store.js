import { configureStore } from "@reduxjs/toolkit";

import slidersReducer from "../features/sliders/slidersSlice";
import recorderReducer from "../features/sliders/recordReducer";

export const store = configureStore({
	reducer: {
		sliders: slidersReducer,
		recorder: recorderReducer,
	},
});
