import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getFilms } from '../redux/slices/filmsTopSlice';
import { useAppDispatch } from '../redux/store';

const Films: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFilms());
  }, []);

  return <div>asd</div>;
};

export default Films;
