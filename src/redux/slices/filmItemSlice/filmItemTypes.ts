import { IFilm, IStaffResponse, TMoviePictures } from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";

export interface IFilmItemSlice {
  selectFilm: IFilm | null;
  actors: IStaffResponse[];
  loadingStatus: LoadingStatus;
  error: null | string;
  moviePictures: TMoviePictures[];
}

export type TDescriptionValue = {
  title: string;
  value: string | number | boolean;
};
