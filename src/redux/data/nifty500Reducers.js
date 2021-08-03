import actions from "./nifty500Actions";

const initialState = {
  data: [],
  loading: false,
};

export default function nifty500Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
