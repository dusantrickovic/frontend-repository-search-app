import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';
import Tabs from './components/Tabs';
import RepList from './components/RepList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RepositoryPage from './components/RepositoryPage';

function App() {
  const [framework, setFramework] = useState("React");
  const [repos, setRepos] = useState([]);
  const [repository, setRepository] = useState({});


  // Callback functions used to get information from child components and
  // set them as values of different states displayed above.

  const handleFramework = childData => {
    setFramework(childData);
  }

  const handleRepos = childData => {
    setRepos(childData);
  }

  const handleRepoPage = childData => {
    setRepository(childData);
  }

  //console.log(repos);

  // I used React Router in order to make this app multi-page.
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <div>
              <Tabs framework={framework} parentCallback = {handleFramework} />
              <RepList framework={framework} repos={repos} setRepos={setRepos} handleRepoPage={handleRepoPage} parentCallback = {handleRepos} /></div>} /> 
          <Route path="/repository-info" element={<RepositoryPage repository={repository} />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
