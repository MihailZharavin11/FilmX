import { List, Spin } from "antd";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  descriptionActorSelector,
  getActorById,
} from "../../../redux/slices/actorSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import CardInner from "../../Shared/CardInner/CardInner";
import CardInnerDescription from "../../Shared/CardInnerDescription/CardInnerDescription";
import CardInnerHeader from "../../Shared/CardInnerHeader/CardInnerHeader";
import CardInnerImage from "../../Shared/CardInnerImage/CardInnerImage";
import CardInnerList from "../../Shared/CardInnerList/CardInnerList";

const ActorContent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loadingStatus, selectActors } = useAppSelector(
    (state) => state.actor
  );

  const descriptionActorValue = useAppSelector((state) =>
    descriptionActorSelector(state)
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getActorById(id));
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
    <div>
      <CardInner
        image={<CardInnerImage img={selectActors?.posterUrl} actions={false} />}
        header={
          <CardInnerHeader
            title={
              selectActors?.nameRu
                ? selectActors.nameRu
                : selectActors?.nameEn || ""
            }
            subTitle={selectActors?.birthday}
          />
        }
        description={
          <CardInnerDescription
            title="О персоне"
            contentArray={descriptionActorValue}
          />
        }
        list={
          <CardInnerList
            title="Фильмы"
            children={
              <List
                itemLayout="horizontal"
                dataSource={selectActors?.films}
                renderItem={(item) => (
                  <Link to={`/films/${item.filmId}`}>
                    <List.Item key={item.filmId}>
                      <List.Item.Meta title={item.nameRu} />
                    </List.Item>
                  </Link>
                )}
              />
            }
          />
        }
      />
    </div>
  );
};

export default ActorContent;