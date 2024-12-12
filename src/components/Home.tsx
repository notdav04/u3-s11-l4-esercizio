import { useEffect, useState } from "react";
import Article from "./Article";

import { Row, Container } from "react-bootstrap";

interface HomeProps {
  name: string;
}

export interface singleArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: [];
}

export interface Launch {
  launch_id: string;
  provider: string;
}

const Home = (props: HomeProps) => {
  const [articles, setArticles] = useState<singleArticle[]>([]);
  const fetchArticle = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles"
      );
      if (response.ok) {
        const responseObj = await response.json();
        setArticles(responseObj.results);
      } else {
        throw new Error(`errore nella risposta api ${response.statusText}`);
      }
    } catch (error) {
      console.group(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <>
      <h1>Articoli {props.name}</h1>
      <Container>
        <Row>
          {articles.length > 0 &&
            articles.map((element) => {
              return <Article obj={element} />;
            })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
