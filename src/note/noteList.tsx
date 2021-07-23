import "./note.css";
function List() {
    return(
        <>
        <div className="head">
          <div className="section-title">
            <h2>Newly Uploaded Notes</h2>
            <h1>Fresh upload</h1>
          </div>
          <button className="explore">Explore</button>
        </div>
        <div className="tray">
            <div className="note-card">
              <div>
                <h3>Card 1</h3>
                <span>Some text<br/></span>
              </div>
            </div>
            <div className="note-card">
              <div>
                <h3>Card 3</h3>
                <span>Some text<br/></span>
              </div>
            </div>
            <div className="note-card">
              <div>
                <h3>Card 3</h3>
                <span>Some text<br/></span>
             </div>
             </div>
             <div className="note-card">
               <div>
               <h3>Card 4</h3>
               <span>Some text<br/></span>
             </div>
          </div>
      </div>
        </>
    );
}
export default List;
