import { createAction } from "@reduxjs/toolkit";

export const startRecording = createAction("startRecording");

export const stopRecording = createAction("stopRecording");

export const abortRecording = createAction("abortRecording");

export const deleteRecord = createAction("deleteRecord");

export const playRecord = createAction("playRecord");

export const stopRecord = createAction("stopRecord");

export const scrubRecord = createAction("scrubRecord");
