import { all, takeEvery, put, call } from "redux-saga/effects";
import * as firebase from "services/firebase";
import actions from "./nifty500Actions";

const dataProviders = {
  getNifty500Data: firebase.getNifty500Data,
};

export function* LOAD_DATA() {
  yield put({
    type: "nifty500/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const response = yield call(dataProviders.getNifty500Data);
  if (response) {
    console.log(response);
    yield put({
      type: "nifty500/SET_STATE",
      payload: {
        data: response,
        loading: false,
      },
    });
  } else {
    console.log("Error Occured");
  }
}
export default function* rootSaga() {
  yield all([takeEvery(actions.LOAD_DATA, LOAD_DATA)]);
}
