import { IFilm } from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";

export interface IUserSlice {
  email: string | null;
  token: string | null;
  id: string | null;
  error: string | null;
  favoriteFilms: IFilm[];
  watchedFilms: IFilm[];
  loadingStatus: LoadingStatus;
}
