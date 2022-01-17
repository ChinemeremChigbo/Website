import { ApodAction } from '../../actions/apod';
import * as types from '../../actionTypes';

type Picture = {
  picture?: any;
  loading: boolean;
};

type apodState = {
  pictureOfTheDay: Picture;
  queryPicture: Picture;
};

const initialState: apodState = {
  pictureOfTheDay: {
    picture: {},
    loading: false
  },
  queryPicture: {
    picture: {},
    loading: false
  }
};

export function apodReducer(state = initialState, action: ApodAction): apodState {
  switch (action.type) {
    case types.GET_PICTURE_OF_THE_DAY:
      return {
        ...state,
        pictureOfTheDay: {
          loading: true
        }
      };
    case types.GET_PICTURE_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        pictureOfTheDay: {
          picture: action.payload,
          loading: false
        }
      };
    case types.GET_PICTURE_OF_THE_DAY_FAILURE:
      return {
        ...state,
        pictureOfTheDay: {
          picture: action.payload,
          loading: false
        }
      };
    case types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE:
      return {
        ...state,
        queryPicture: {
          loading: true
        }
      };
    case types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE_SUCCESS:
      return {
        ...state,
        queryPicture: {
          picture: action.payload,
          loading: false
        }
      };
    case types.GET_PREVIOUS_OR_NEXT_DAY_PICTURE_FAILURE:
      return {
        ...state,
        queryPicture: {
          picture: action.payload,
          loading: false
        }
      };
    default:
      return state;
  }
}
