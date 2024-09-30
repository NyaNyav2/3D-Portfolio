import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {Navbar} from "./components";
import {Contacts, Home, About, Projects} from './pages';
import styles from "./style";
function App() {
  return (
    <div className="w-full overflow-hidden ">
      <Router>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contacts/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
