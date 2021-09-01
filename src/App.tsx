import "./App.css";
import Crousel from "./crousel/Crousel";
import NoteList from "./notes/noteList";
import "./notes/note.css";
import ArticleList from "./articles/articleList";
import "./articles/article.css";
import EventList from "./events/eventList";
import Slidecrousel from "./crousel/Slidecrousel";

function App(props) {

	let notification = [{id:"1",text:"here are one important notice",},{id:"2",text:"here are second  notification",},{id:"3",text:"important notice for midsem decalaration",},{id:"4", text:"some text with notification and links and information",},];

  return (
    <>
      <div className="App">
        <Crousel></Crousel>
		{/* <Slidecrousel/> */}
	<div className="head margin-full">
		<h2>Important Notices</h2>
	</div>
	<div className="item-tray margin-full">
		{notification.map((item) => (
			<div className="notify-md">
				<div className="icon"><h2 className="number">{item.id}</h2></div>
				<div className="tex">{item.text}</div>
			</div>
		))}
	</div>
        <ArticleList></ArticleList>
        <EventList></EventList>
      </div>
    </>
  );
}

export default App;
