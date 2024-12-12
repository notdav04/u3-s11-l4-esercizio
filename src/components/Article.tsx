import { Badge, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ArticleProps {
  obj: {
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
  };
}

interface Launch {
  launch_id: string;
  provider: string;
}

const Article = (props: ArticleProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Col sm={12} md={6} className="mb-4">
        <Card style={{ height: "35rem" }}>
          <Card.Img
            onClick={() => {
              navigate(`/details/${props.obj.id}`);
            }}
            variant="top"
            src={props.obj.image_url}
            style={{ height: "300px" }}
          />
          <Card.Body>
            <Card.Title>
              {props.obj.title} - {props.obj.news_site}
            </Card.Title>
            <Card.Text>{props.obj.summary}</Card.Text>
            <Badge className="text-light">
              <a
                className="text-light text-decoration-none"
                href={props.obj.url}
              >
                Vai alla fonte
              </a>
            </Badge>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Article;
