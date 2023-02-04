import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoriesProps } from "utils/interfaceProps";
export interface MovieCardProps {
  title: string;
  picture: string;
  date: string;
  id: number;
  categorie?: any;
}

const MovieCard: React.VFC<MovieCardProps> = ({
  title,
  picture,
  date,
  id,
  categorie,
}) => {
 //console.log("categorie", categorie)
  return (
    <Link href={`/film/${id}`}>
      <a className="mt-5">
        <div className={`flex flex-col rounded-2xl border p-2`}>
          <div className="z-10 grid h-80 w-full sm:h-[500px] md:px-0">
            <div className="grid-area-1-1 relative h-full w-full overflow-hidden rounded-t-lg">
              <Image
                src={picture}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
                loading="eager"
                className=""
              />
            </div>
          </div>
          <div className="my-2">
            <h3 className="my-2 text-xl font-bold leading-tight tracking-tight text-black md:text-[100%]">
              {title}
            </h3>
            <div className="my-2">
              {categorie.map((cat: CategoriesProps) => (
                cat.name
              ))}
            </div>
            <time className="uppercase italic text-black">{date}</time>
            <div className="font-bold text-black">
              En savoir plus{" "}
              <span className="text-orange font-bold">&#62;</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MovieCard;
