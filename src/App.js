import './App.css';
import Layout from "components/UI/Layout";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "components/Home";
import About from "components/About";

export default function App(){
  return (
  <Router>
    <Layout>
      <Routes>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Layout>
  </Router>
  
  );
}