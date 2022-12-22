import { IPersonResponse } from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";

export interface IActorItemSlice {
  selectActors: null | IPersonResponse;
  loadingStatus: LoadingStatus;
  error: null | string;
}
