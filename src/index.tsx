import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Nav from "./nav/nav";
import App from "./App";
import Note from "./notes/notes";
import About from "./about/about";
import Event from "./events/event";
import Search from "./search/search";
import Login from "./login/login";
import Explore from "./articles/explore";
import ReadArticle from "./articles/readarticle";
import AddArticle from "./articles/addarticle";
import UserProfile from "./users/UserProfile";
import {User, UserContext } from "./users/UserAuthContext";
import {useContext, useEffect, useState} from "react";

const Index = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    user_id: "",
    name: "",
    email:"",
    login: false,
  } as User);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://127.0.0.1:5000/protected-endpoint', {
        method: 'GET',
        headers: { 'jwtToken': token }
      })
      .then(response => {
        if (response.ok) {
          setLogin(true);
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } else {
          setLogin(false);
        }
      });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{
        user,
        updatedUser: (u: User) => {
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
        },
        updatLogin: (l: boolean) => setLogin(l),
      }}>
        <Nav></Nav>
        <div className="px-3 lg:p-0 max-w-7xl mx-auto min-h-screen">
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/notes" component={Note} />
            <Route exact path="/about" component={About} />
            <Route exact path="/articles" component={Explore} />
            <Route exact path="/articles/addarticle" component={AddArticle} />
            <Route exact path="/articles/:article" component={ReadArticle} />
            <Route exact path="/events" component={Event} />
            <Route exact path="/users/:userid" component={UserProfile} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </div>
        <div className="bg-zinc-900 pt-3 pb-6 px-2 mt-10 text-white">
          Made by Students of SRIST, 2021
        </div>
      </UserContext.Provider>
    </>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Index></Index>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
