import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const API_KEY = "f9004e9fef05c8b3974f694457a7c1fa";
  const router = useRouter();

  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  // const [movies, setMovies] = useState();

  //   IIFE (즉시 실행 함수 표현, Immediately Invoked Function Expression)
  //   첫번째 괄호는 익명함수를 감싸 실행 될 함수가 전역 스코프에 불필요한 변수를 추가하거나, IIFE 내부안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법
  //   두번째 괄호는 즉시 실행 함수를 생상하는 괄호이고, 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행

  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch("/api/movies")).json();
  //     setMovies(results);
  //     console.log(movies);
  //   })();
  // }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      {/* 중괄호 / 소괄호 까먹지마라.*/}
      {results?.map((movie) => (
        <div
          className="movie"
          key={movie.id}
          onClick={() => onClick(movie.id, movie.original_title)}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link
              legacyBehavior
              href={`/movies/${movie.original_title}/${movie.id}`}
            >
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie {
          cursor: pointer;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();
  return {
    props: {
      results,
    },
  };
}
