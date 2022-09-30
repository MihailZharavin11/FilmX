import { Avatar, List, Spin } from "antd";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  descriptionFilmSelector,
  getActors,
  getFilmInfo,
  getMoviePictures,
} from "../../../redux/slices/filmItemSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import CardInner from "../../Shared/CardInner/CardInner";
import CardInnerDescription from "../../Shared/CardInnerDescription/CardInnerDescription";
import CardInnerImage from "../../Shared/CardInnerImage/CardInnerImage";
import CardInnerHeader from "../../Shared/CardInnerHeader/CardInnerHeader";
import CardInnerList from "../../Shared/CardInnerList/CardInnerList";
import CardInnerScreens from "../../Shared/CardInnerScreens/CardInnerScreens";

const FilmContent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectFilm, loadingStatus, actors } = useAppSelector(
    (state) => state.filmItem
  );
  const descriptionValue = useAppSelector((state) =>
    descriptionFilmSelector(state)
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getFilmInfo(id));
    dispatch(getActors(id));
    dispatch(getMoviePictures(id));
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
          subTitle={selectFilm?.year.toString() + " год"}
          text={selectFilm?.slogan}
        />
      }
      description={
        <CardInnerDescription
          title="О фильме"
          contentArray={descriptionValue}
        />
      }
      list={
        <CardInnerList
          title="Главные актеры"
          children={
            <List
              itemLayout="horizontal"
              dataSource={actors ? actors : []}
              renderItem={(item) => (
                <Link to={`/actor/${item.staffId}`}>
                  <List.Item key={item.staffId}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.posterUrl} />}
                      title={item.nameRu}
                      description={item.professionText}
                    />
                  </List.Item>
                </Link>
              )}
            />
          }
        />
      }
      movieImages={<CardInnerScreens />}
    />
  );
};

export default FilmContent;
