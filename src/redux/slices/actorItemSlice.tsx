import { LoadingStatus } from "./filmItemSlice";

export interface IActorItemSlice {
  selectActors: null;
  loadingStatus: LoadingStatus;
  error: null | string;
}

type Actor = {};

const initialState: IActorItemSlice = {
  selectActors: null,
  loadingStatus: LoadingStatus.IDLE,
  error: null,
};
