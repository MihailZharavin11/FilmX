import {
  TFilmSearchByFiltersResponse_items,
  TFilmSearchResponse_films,
} from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";

export interface ISearchState {
  quickSearchMovie: TFilmSearchResponse_films[];
  deepSearch: TFilmSearchByFiltersResponse_items[];
  total: number | null;
  error: string;
  loadingStatus: LoadingStatus;
}
