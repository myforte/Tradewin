import { all } from "redux-saga/effects";
import user from "./user/sagas";
import menu from "./menu/sagas";
import settings from "./settings/sagas";
import nifty500 from "./data/nifty500Sagas";

export default function* rootSaga() {
  yield all([user(), menu(), settings(), nifty500()]);
}
