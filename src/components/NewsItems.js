import React from "react";

const NewsItems = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description ? description : ""}</p>
            <p className="card-text">
              <small className="card-title" style={{ color: "red" }}>
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItems;
