import React from "react";
import { Col, Row } from "../Grid";

export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function BookListItem({
  bookId,
  title,
  authors,
  description,
  image,
  link,
  clickEvent,
  saved,
  screenWidth,
}) {
  console.log(saved);
  return (
    <li className="list-group-item m-2">
      {screenWidth >= 768 && (
        <div className="float-right">
          {!saved ? (
            <button
              className="btn btn-success"
              onClick={(event) =>
                clickEvent(
                  event,
                  bookId,
                  title,
                  authors,
                  description,
                  link,
                  image
                )
              }
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={(event) => clickEvent(event, bookId)}
            >
              Unsave
            </button>
          )}
          <a
            className="btn btn-primary ml-2 mr-2"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </div>
      )}

      <h4 className="font-weight-bold">{title}</h4>
      <h5>
        by{" "}
        {authors.length > 1
          ? authors.reduce((prev, curr) => [prev, ", ", curr])
          : authors[0]}
      </h5>
      <Row>
        <div className="col-sm-12 col-md-auto text-center">
          <img src={image} alt={title} className="mt-1 mb-2" />
        </div>
        <Col>
          <p className={screenWidth < 768 ? "text-justify" : ""}>
            {description}
          </p>
        </Col>
      </Row>

      {screenWidth < 768 && (
        <div className="row">
          <Col>
            {!saved ? (
              <button
                className="btn btn-success btn-block"
                onClick={(event) =>
                  clickEvent(
                    event,
                    bookId,
                    title,
                    authors,
                    description,
                    link,
                    image
                  )
                }
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-danger btn-block"
                onClick={(event) => clickEvent(event, bookId)}
              >
                Unsave
              </button>
            )}
          </Col>
          <Col>
            <a
              className="btn btn-primary btn-block"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </Col>
        </div>
      )}
    </li>
  );
}
