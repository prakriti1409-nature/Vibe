import { Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import LiveVibes from "./components/LiveVibes"; // adjust path as needed


function App() {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="/live" element={<LiveVibes />} />
    </Routes>
  );
}

export default App;
