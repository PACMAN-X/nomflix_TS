import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import { movieApi } from "../api";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

export default function Home() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovieData = async () => {
    try {
      const {
        data: { results: nowPlayingMovies }
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcomingMovies }
      } = await movieApi.upcoming();
      const {
        data: { results: popularMovies }
      } = await movieApi.popular();
      setNowPlayingMovies(nowPlayingMovies);
      setUpcomingMovies(upcomingMovies);
      setPopularMovies(popularMovies);
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movie | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {nowPlayingMovies && nowPlayingMovies.length > 0 && (
            <Section title="Now Playing">
              {nowPlayingMovies.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {upcomingMovies && upcomingMovies.length > 0 && (
            <Section title="Upcoming Movies">
              {upcomingMovies.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {popularMovies && popularMovies.length > 0 && (
            <Section title="Popular Movies">
              {popularMovies.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
}
