import Head from "next/head";
import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import { Params } from "next/dist/server/router";
import { FilmTheMovieDBProps, dataDBprops} from "utils/interfaceProps";

export const getStaticPaths = async () => {
  const filmsData: dataDBprops = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res: any) => res.json());
  const paths = filmsData?.results.map((path: FilmTheMovieDBProps) => ({
    params: {
      id: `${path.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const dataFilm = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res: any) => res.json());
  return {
    props: {
      dataFilm,
    },
  };
};

const Article: NextPage<{
  dataFilm: FilmTheMovieDBProps;
}> = ({ dataFilm }) => {
  //console.log("dataFilm", dataFilm);
  return (
    <>
      <Head><title>{dataFilm?.title}</title></Head>
      <div className="m-auto w-large">
        <div className="flex">
          <div className="z-10 grid h-80 w-[50vw] sm:h-[50vh] md:px-0">
            <div className="grid-area-1-1 relative h-full w-full overflow-hidden rounded-t-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${dataFilm.poster_path}`}
                alt=""
                layout="fill"
                objectFit="contain"
                objectPosition="center center"
                loading="eager"
                className=""
              />
            </div>
          </div>
          <div className="my-2">
            <h3 className="my-2 text-xl font-bold leading-tight tracking-tight text-black md:text-4xl">
              {dataFilm.title}
            </h3>
            <time className="italic text-black">
              Date de sortie : {dataFilm.release_date}
            </time>
            <div>
              <p>Note du public : {dataFilm.vote_average.toFixed(1)}/10</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
