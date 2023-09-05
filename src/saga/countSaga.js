import {put, takeEvery} from "redux-saga/effects";
import { ASYNC_ADD_CASH, ASYNC_GET_CASH, addCashAction, getCashAction } from "../store/cashReducer";
// put - аналог диспатча для синхронных экшенов

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* incrementWorker() {
  yield delay(1000);
  yield put(addCashAction(500))
}

function* decrementWorker() {
  yield delay(1000);
  yield put(getCashAction(500))
}

export function* incrementWatcher() {
  // Первым параметром получает тип экшена, за которым надо следить, а вторым - воркер,
  // который надо вызвать, если этот тип задиспатчен;
  yield takeEvery(ASYNC_ADD_CASH, incrementWorker);
  yield takeEvery(ASYNC_GET_CASH, decrementWorker)
}
