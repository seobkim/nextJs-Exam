import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Seo from "../components/Seo";

export default function Home() {
  const API_KEY = "f9004e9fef05c8b3974f694457a7c1fa";

  const [movies, setMovies] = useState();

  //   IIFE (즉시 실행 함수 표현, Immediately Invoked Function Expression)
  //   첫번째 괄호는 익명함수를 감싸 실행 될 함수가 전역 스코프에 불필요한 변수를 추가하거나, IIFE 내부안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법
  //   두번째 괄호는 즉시 실행 함수를 생상하는 괄호이고, 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
      console.log(movies);
    })();
  }, []);

  return (
    <div>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {/* 중괄호 / 소괄호 까먹지마라.*/}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <h1 className="active">Hello</h1>
    </div>
  );
}
