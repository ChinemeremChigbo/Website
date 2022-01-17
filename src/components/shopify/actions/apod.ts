import { Dispatch, AnyAction } from "redux";
import { typedAction } from "../types";
import * as types from "../actionTypes";
import apodService from "../services/apod";

export type ApodAction = ReturnType<typeof typedAction>;

export const getPictureOfTheDay = (date: string) => async (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch(typedAction(types.GET_PICTURE_OF_THE_DAY));
  try {
    const res = await apodService.getPictureOfTheDay(date);
    localStorage.setItem("pictureOfTheDay", JSON.stringify(res.data));
    dispatch(typedAction(types.GET_PICTURE_OF_THE_DAY_SUCCESS, res.data));
  } catch (error: any) {
    dispatch(
      typedAction(types.GET_PICTURE_OF_THE_DAY_FAILURE, error.response.data)
    );
  }
};

export const getPreviousOrNextPicture = (date: string) => async (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch(typedAction(types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE));
  try {
    const res = await apodService.getPictureOfTheDay(date);
    dispatch(
      typedAction(types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE_SUCCESS, res.data)
    );
  } catch (error: any) {
    dispatch(
      typedAction(
        types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE_FAILURE,
        error.response.data
      )
    );
  }
};
