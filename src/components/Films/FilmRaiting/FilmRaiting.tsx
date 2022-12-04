import React from "react";
import { setClassForRaiting } from "../../../lib/raitingFunc";
import { StarTwoTone } from "@ant-design/icons";

type TFilmRaitingProps = {
  raiting: string | number;
};

export const FilmRaiting: React.FC<TFilmRaitingProps> = ({ raiting }) => {
  return (
    <>
      <span className={setClassForRaiting(Number(raiting))}>{raiting}</span>{" "}
      <StarTwoTone twoToneColor="#ffd900" />
    </>
  );
};
