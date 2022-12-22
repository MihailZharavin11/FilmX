import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TDescriptionValue } from "./filmItemTypes";

export const descriptionFilmSelector = createSelector(
  (state: RootState) => state.filmItem.selectFilm,
  (selectFilm) => {
    const descriptionValue: TDescriptionValue[] = [
      {
        title: "Страна",
        value:
          selectFilm?.countries.map((element) => element.country).join() || "",
      },
      {
        title: "Длительность фильма",
        value: selectFilm?.filmLength || "",
      },
      {
        title: "3D",
        value: selectFilm?.has3D ? "Доступен" : "Недоступен",
      },
      {
        title: "IMax",
        value: selectFilm?.hasImax ? "Доступен" : "Недоступен",
      },
      {
        title: "Возраст",
        value: selectFilm?.ratingAgeLimits || "",
      },
      {
        title: "Описание",
        value: selectFilm?.description || "",
      },
    ];
    return descriptionValue;
  }
);
