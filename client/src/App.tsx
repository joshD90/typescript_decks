import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleDeck from "./components/SingleDeck";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/:id" element={<SingleDeck />} />
      </Routes>
    </Router>
  );
}

export default App;
