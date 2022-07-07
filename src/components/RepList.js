import React, { useState, useEffect } from 'react';
import RepCard from './RepCard';
import './replist.css';
import { Link } from 'react-router-dom';

function RepList({framework,repos, setRepos, parentCallback, handleRepoPage}) {
  const [reps, setReps] = useState(repos);
  const [pageNum, setPageNum] = useState(1);

  // Fetching the data and storing it into the copy of the repos object (I just found it easier to work with it when sorting by forks and stars, since it doesn't exactly ruin the previous repo object).
  const fetchData = x => {
    fetch(x)
    .then(res => res.json())
    .then(data => {
      let finalData = data.items;
      setReps(finalData);
      parentCallback(finalData);
      //console.log(repos)
    });
  }

  // Fetching data on every framework tab change.
  useEffect(() => {
    fetchData(`https://api.github.com/search/repositories?q=${framework}&page=1`);
  }, [framework]);

  useEffect(() => {
    fetchData(`https://api.github.com/search/repositories?q=${framework}&page=${pageNum}`);
  }, [pageNum])


  // Sending out an additional query to the API that will return results that are sorted based on forks and stars.
  
  // May not be the most efficient solution, as GitHub has its own limitations to API requests, 
  // but I found it to be quicker and more creative to implement.

  const handleForks = () => {
    fetchData(`https://api.github.com/search/repositories?q=${framework}&sort=forks&order=desc`);
  }

  const handleStars = () => {
    fetchData(`https://api.github.com/search/repositories?q=${framework}&sort=stars&order=desc`);
  }

  return (
    <div className='rep-list'>
        <div className='section-header'>
            <h2 className="framework-selection">Repositories for {framework}</h2>
            <div className='sorting'>
                <h3>Sort by:</h3>
                <p onClick={handleForks}>Forks</p>
                <p onClick={handleStars}>Stars</p>
            </div>
        </div>

        <div className='repositories'>
          <div>
            
            {reps.map(({full_name, stargazers_count, forks, owner, open_issues, contributors_url, languages_url}) =>  
              <Link to="/repository-info">
                <div onClick={() => handleRepoPage({name: full_name, stars: stargazers_count, forks: forks, login: owner.login, avatar: owner.avatar_url, issues: open_issues, contributors: contributors_url, languages: languages_url})}>
                  <RepCard name={full_name} forks={forks} stars={stargazers_count} login={owner.login} avatar={owner.avatar_url} issues={open_issues} contributors={contributors_url} languages={languages_url} />
                </div> 
              </Link> )}

          </div>

          <div className='page-nums'>
            <ul>
              <li onClick={() => setPageNum(1)}>1</li>
              <li onClick={() => setPageNum(2)}>2</li>
              <li onClick={() => setPageNum(3)}>3</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default RepList