import { Avatar, List, Spin } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActors, getFilmInfo } from "../../../redux/slices/filmItemSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import CardInner from "../../Shared/CardInner/CardInner";
import FilmDescription from "../FilmDescription/FilmDescription";
import CardInnerImage from "../../Shared/CardInnerImage/CardInnerImage";
import FilmList from "../../Shared/CardInnerList/CardInnerList";
import CardInnerHeader from "../../Shared/CardInnerHeader/CardInnerHeader";
import CardInnerList from "../../Shared/CardInnerList/CardInnerList";

const FilmContent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectFilm, loadingStatus, actors } = useAppSelector(
    (state) => state.filmItem
  );
  const descriptionValue = [
    {
      title: "Страна",
      value: selectFilm?.countries,
    },
    {
      title: "Длительность фильма",
      value: selectFilm?.filmLength,
    },
    {
      title: "3D",
      value: selectFilm?.has3D,
    },
    {
      title: "IMax",
      value: selectFilm?.hasImax,
    },
    {
      title: "Возраст",
      value: selectFilm?.ratingAgeLimits,
    },
    {
      title: "Описание",
      value: selectFilm?.description,
    },
  ];

  useEffect(() => {
    if (!id) return;
    dispatch(getFilmInfo(id));
    dispatch(getActors(id));
  }, [dispatch, id]);

  if (loadingStatus === "loading") {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 70px)",
        }}
        size="large"
      />
    );
  }

  return (
    <CardInner
      image={
        <CardInnerImage
          img={selectFilm?.posterUrl}
          actions={true}
          ratingImdb={selectFilm?.ratingImdb}
          ratingKinopoisk={selectFilm?.ratingKinopoisk}
        />
      }
      header={
        <CardInnerHeader
          title={
            selectFilm?.nameRu ? selectFilm.nameRu : selectFilm?.nameEn || ""
          }
          titleOriginal={
            selectFilm?.nameOriginal ? ` (${selectFilm.nameOriginal})` : ""
          }
          subTitle={selectFilm?.year.toString()}
          text={selectFilm?.slogan}
        />
      }
      description={<FilmDescription />}
      list={
        <CardInnerList
          title="Главные актеры"
          children={
            <List
              itemLayout="horizontal"
              dataSource={actors ? actors : []}
              renderItem={(item) => (
                <List.Item key={item.staffId}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.posterUrl} />}
                    title={item.nameRu}
                    description={item.professionText}
                  />
                </List.Item>
              )}
            />
          }
        />
      }
    />
  );
};

export default FilmContent;
