import { Avatar, List, Spin } from "antd";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { CardInnerLayout } from "../../CardInner/CardInnerLayout/CardInnerLayout";
import CardInnerDescription from "../../CardInner/CardInnerDescription/CardInnerDescription";
import { CardInnerImage } from "../../CardInner/CardInnerImage/CardInnerImage";
import CardInnerHeader from "../../CardInner/CardInnerHeader/CardInnerHeader";
import CardInnerList from "../../CardInner/CardInnerList/CardInnerList";
import CardInnerScreens from "../../CardInner/CardInnerScreens/CardInnerScreens";
import styles from "./filmContent.module.scss";
import EmptyContent from "../../EmptyContent/EmptyContent";
import { descriptionFilmSelector } from "../../../redux/slices/filmItemSlice/filmItemSelectors";
import { getFilmInfo } from "../../../redux/slices/filmItemSlice/filmItemThunk";

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
  }, [dispatch, id]);

  if (loadingStatus === "error") {
    return (
      <EmptyContent
        buttonTitle="Вернуться назад"
        description="Фильм не найден"
      />
    );
  }

  if (loadingStatus === "loading") {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
        size="large"
      />
    );
  }

  return (
    <CardInnerLayout
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
          subTitle={selectFilm?.year + " год"}
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
              className={styles.actorList}
              itemLayout="vertical"
              dataSource={actors ? actors : []}
              renderItem={(item) => (
                <Link to={`/actor/${item.staffId}`}>
                  <List.Item key={item.staffId}>
                    <List.Item.Meta
                      className={styles.actorItem}
                      avatar={<Avatar size={"large"} src={item.posterUrl} />}
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
