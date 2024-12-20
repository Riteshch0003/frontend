import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNotes/SingleNotes";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
function App() {
  const [search, setSeatch] = useState();

  return (
    <BrowserRouter>
      <Header setSeatch={setSeatch} />
      <main>
        <Routes>
          <Route path="/" Component={LandingPage} exact />
          <Route path="/login" Component={LoginScreen} exact />
          <Route path="/profile" Component={ProfileScreen} />
          <Route path="/register" Component={RegisterScreen} exact />
          <Route path="/mynotes" Component={MyNotes} />
          <Route path="/createnote" Component={CreateNote} />
          <Route path="/note/:id" Component={SingleNote} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
