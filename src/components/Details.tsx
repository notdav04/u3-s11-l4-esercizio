import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { singleArticle } from "./Home";
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<singleArticle | null>(null);
  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/${id}`
      );
      if (response.ok) {
        const responseObj = await response.json();
        console.log("response", responseObj);
        setArticle(responseObj);
      } else {
        throw new Error(`errore nella risposta api ${response.statusText}`);
      }
    } catch (error) {
      console.group(error);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, [id]);

  return (
    <>
      <Button
        className="m-5"
        onClick={() => {
          navigate("/");
        }}
      >
        Torna alla Home
      </Button>
      <div className="ms-5">
        <h1>Articolo #{id}</h1>
        {article && (
          <div>
            <img src={article.image_url} alt="immagine articolo" />
            <h2>
              {article.title} - {article.news_site}
            </h2>
            <p>{article.summary}</p>
            <p>
              pubblicato il {article.published_at.slice(0, 10)} - aggiornato il{" "}
              {article.updated_at.slice(0, 10)}
            </p>
            {article.launches.length > 0 &&
              article.launches.map((launch) => {
                return (
                  <p>
                    id del lancio: {launch.launch_id} - provider:{" "}
                    {launch.provider}
                  </p>
                );
              })}
            <a href={article.url}>{article.url}</a>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
