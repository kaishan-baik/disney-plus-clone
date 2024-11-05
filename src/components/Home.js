/* eslint-disable default-case */
import React, { useState } from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

const Home = (props) => {
  const db = getFirestore();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  // Use React state instead of regular arrays
  const [recommends, setRecommends] = useState([]);
  const [newDisneys, setNewDisneys] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'movies');

    // Listen to Firestore changes
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let recommendsArray = [];
      let newDisneysArray = [];
      let originalsArray = [];
      let trendingArray = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case 'recommend':
            recommendsArray.push({ id: doc.id, ...doc.data() });
            break;
          case 'new':
            newDisneysArray.push({ id: doc.id, ...doc.data() });
            break;
          case 'original':
            originalsArray.push({ id: doc.id, ...doc.data() });
            break;
          case 'trending':
            trendingArray.push({ id: doc.id, ...doc.data() });
            break;
        }
      });

      // Update React state
      console.log('recommendsArray >>', recommendsArray);
      console.log('newDisneysArray >>', newDisneysArray);
      console.log('originalsArray >>', originalsArray);
      console.log('trendingArray >>', trendingArray);
      setRecommends(recommendsArray);
      setNewDisneys(newDisneysArray);
      setOriginals(originalsArray);
      setTrending(trendingArray);

      // Dispatch action
      dispatch(
        setMovies({
          recommend: recommendsArray,
          newDisney: newDisneysArray,
          original: originalsArray,
          trending: trendingArray,
        })
      );

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    });
  }, [userName, db, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/home-background.png') center center / cover
      no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
