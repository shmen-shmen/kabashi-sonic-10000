import { createAction } from "@reduxjs/toolkit";

export const startRecording = createAction("startRecording");

export const stopRecording = createAction("stopRecording");

export const deleteRecord = createAction("deleteRecord");
