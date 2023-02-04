import Head from "next/head";
import { useState } from "react";
import { NextPage }from "next";
import { GetStaticProps } from "next";
import { FilmTheMovieDBProps, dataDBprops, CategoriesProps } from "utils/interfaceProps";
import MovieCard from "components/MovieCard";

export const getStaticProps: GetStaticProps = async () => {
  const dataFilms: dataDBprops = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res: any) => res.json());
  const dataCategories: dataDBprops = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`).then((res: any) => res.json());
  return {
    props: {
      dataFilms,
      dataCategories,
    },
  };
};

const Home: NextPage<{
  dataFilms: dataDBprops;
  dataCategories: { genres : CategoriesProps[] };
}> = ({ dataFilms, dataCategories }) => {
  const [films, setFilms] = useState(dataFilms.results)

  const sortByReleaseDate = (dataFilms: dataDBprops, typeOfSort: string) => {
    return [...dataFilms.results].sort((filmA, filmB) => {
      const dateA: any = new Date(filmA.release_date);
      const dateB: any = new Date(filmB.release_date);
      {
        if (typeOfSort == "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
    });
  };

  const handleSort = (sort: string) => {
    setFilms(sortByReleaseDate(dataFilms, sort));
  };

  // console.log(dataFilms.results);
  return (
    <>
      <Head>
        <title>Test pitchboy</title>
      </Head>
      <div className="mx-auto w-large">
        <h1 className="my-8 text-center font-monoton text-2xl font-bold tracking-wide underline ">
          La liste de tous les films populaires
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("desc")}
            className="my-2 rounded-full border px-5 py-1"
          >
            {" "}
            Trier les films du plus récent au plus ancien{" "}
          </button>
          <button
            onClick={() => handleSort("asc")}
            className="my-2 rounded-full border px-5 py-1"
          >
            {" "}
            Trier les films du plus ancien au plus récent{" "}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {films.map((movie: FilmTheMovieDBProps) => {
            const categorie = dataCategories?.genres.filter((dataCategorie: CategoriesProps) => {
              return dataCategorie.id === movie.genre_ids[0];
            });
            return (
              <div key={movie.id} className="">
                <MovieCard
                  picture={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  categorie={categorie}
                  title={movie.title}
                  date={movie.release_date}
                  id={movie.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
