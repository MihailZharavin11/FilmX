import { Avatar, List, Spin } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActors, getFilmInfo } from "../../../redux/slices/filmItemSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import FilmDescription from "../FilmDescription/FilmDescription";
import FilmHeader from "../FilmHeader/FilmHeader";
import FilmImage from "../FilmImage/FilmImage";
import FilmList from "../FilmList/FilmList";
import styles from "./filmContent.module.scss";

const FilmContent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectFilm, loadingStatus, actors } = useAppSelector(
    (state) => state.filmItem
  );

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
    <div className={styles.wrapper}>
      <div className={styles.presentationFilm}>
        <FilmImage
          img={selectFilm?.posterUrl}
          actions={true}
          ratingImdb={selectFilm?.ratingImdb}
          ratingKinopoisk={selectFilm?.ratingKinopoisk}
        />
      </div>
      <div className={styles.description}>
        <FilmHeader
          title={
            selectFilm?.nameRu ? selectFilm.nameRu : selectFilm?.nameEn || ""
          }
          titleOriginal={
            selectFilm?.nameOriginal ? ` (${selectFilm.nameOriginal})` : ""
          }
          subTitle={selectFilm?.year.toString()}
          text={selectFilm?.slogan}
        />
        <div className={styles.description__content}>
          <FilmDescription />
          <FilmList
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
        </div>
      </div>
    </div>
  );
};

export default FilmContent;
