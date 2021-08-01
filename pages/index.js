import Head from "next/head";
import Header from "../components/Header";
import { Nav } from "../components/Nav";
import requests from "../utils/requests";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}

function Results({ results }) {
  return (
    <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:flex flex-wrap justify-center">
      {results.map((res) => (
        <Thumbnail key={res.id} result={res} />
      ))}
    </div>
  );
}

function Thumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="group cursor-pointer p-2 transition-all duration-200 ease-in transform sm:hover:scale-105">
      <Image
        layout="responsive"
        src={`${BASE_URL}${result.backdrop_path || result.poster_path}`}
        width={1920}
        height={1080}
      />
      <div className="p-2">
        <p className="truncate max-w-md">{result.overview}</p>
        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title || result.original_name}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          <ThumbUpIcon className="h-5 mx-2" /> {result.vote_count}
        </p>
      </div>
    </div>
  );
}
