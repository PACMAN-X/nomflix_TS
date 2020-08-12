import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from "../api";
import Tabs from "../Components/Tabs";
import Loader from "../Components/Loader";
import styled from "styled-components";
import Helmet from "react-helmet";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.div`
  font-size: 12px;

  line-height: 1.5;
  width: 50%;
`;

const URLLik = styled.a`
  background-color: yellow;
  padding: 1px;
  border: none;
  margin-left: 10px;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 700;
  color: black;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  object-fit: contain;
`;

export default function Detail(props) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIsMovie, setCurrentIsMovie] = useState();

  const getResult = async (parsedId, isMovie) => {
    try {
      if (isMovie) {
        setCurrentIsMovie(true);
        const { data } = await movieApi.movieDetail(parsedId);
        setResult(data);
      } else {
        setCurrentIsMovie(false);
        const { data } = await tvApi.showDetail(parsedId);
        setResult(data);
      }
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = props;
    const isMovie = props.location.pathname.includes("/movie/");
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    getResult(parsedId, isMovie);
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {currentIsMovie ? (
              <Item>
                <URLLik
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  IMDB
                </URLLik>
              </Item>
            ) : (
              <></>
            )}
          </ItemContainer>
          <Tabs>
            <div label="Overview">
              <Overview>{result.overview}</Overview>
            </div>
            <div label="Youtube">
              <Overview>
                {result.videos.results[0].key !== undefined ? (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <></>
                )}
              </Overview>
            </div>
            <div label="Production Company">
              <Overview>
                {result.production_companies.map((company) => (
                  <Logo key={company.id}>
                    {company.logo_path ? (
                      <LogoImage
                        src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
                        width="100px"
                      ></LogoImage>
                    ) : (
                      <span>{company.name}</span>
                    )}
                  </Logo>
                ))}
              </Overview>
            </div>
            <div label="Country">
              <Overview>{result.production_countries[0].name}</Overview>
            </div>
          </Tabs>
        </Data>
      </Content>
    </Container>
  );
}
