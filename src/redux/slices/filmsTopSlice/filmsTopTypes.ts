import {
  TFilmSearchByFiltersResponse_items,
  TTopFilm,
} from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";

export interface IFilmsState {
  filmsByTop: TTopFilm[];
  filmsByGenre: TFilmSearchByFiltersResponse_items[];
  error: string;
  loadingStatus: LoadingStatus;
  totalPage: number;
}
