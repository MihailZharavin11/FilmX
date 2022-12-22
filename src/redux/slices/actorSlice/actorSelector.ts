import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const descriptionActorSelector = createSelector(
  (state: RootState) => state.actor.selectActors,
  (selectActors) => {
    const descriptionValue = [
      {
        title: "Возраст",
        value: selectActors?.age || "",
      },
      {
        title: "Профессия",
        value: selectActors?.profession || "",
      },
      {
        title: "Дата рождения",
        value: selectActors?.birthday || "",
      },
      {
        title: "Дата смерти",
        value: selectActors?.death || "",
      },
      {
        title: "Рост",
        value: selectActors?.growth || "",
      },
      {
        title: "Количество фильмов",
        value: selectActors?.films.length || "",
      },
    ];
    return descriptionValue;
  }
);
