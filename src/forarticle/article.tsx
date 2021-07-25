import "./Article.css";
function Article() {
  return (
    <>
      <div className="head">
        <div className="section-title">
          <h2>Newly Uploaded Article</h2>
          <h1>Fresh upload</h1>
        </div>
        <button className="explore">Explore &#62;</button>
      </div>
      <div className="tray">
        <div className="note-cards">
          <div>
            <h3>Post</h3>
            <span>
              Some text
              <br />
            </span>
          </div>
        </div>
        <div className="note-cards">
          <div>
            <h3>Post</h3>
            <span>
              Some text
              <br />
            </span>
          </div>
        </div>
        <div className="note-cards">
          <div>
            <h3>Post</h3>
            <span>
              Some text
              <br />
            </span>
          </div>
        </div>
        <div className="note-cards">
          <div>
            <h3>Post</h3>
            <span>
              Some text
              <br />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Article;
