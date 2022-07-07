import React, {useState, useEffect} from 'react'
import './repositoryinfo.css';
import {Link} from 'react-router-dom';

function RepositoryPage({repository}) {

    console.log(repository.full_name)

    const [contribs, setContribs] = useState([]);
    const [languages, setLanguages] = useState("");

    // Fetching contributors and languages, since the props only provided us the links to each.
    const fetchContributors = x => {
        fetch(x)
        .then(res => res.json())
        .then(data => {
          let finalData = data;
          setContribs(finalData);
          console.log(contribs);
        });
      }

      const fetchLanguages = x => {
        fetch(x)
        .then(res => res.json())
        .then(data => {
          let finalData = data;
          setLanguages(finalData);
        });
      }

    // Fetching data on each first render.
    useEffect(() => {
        fetchContributors(repository.contributors);   
        fetchLanguages(repository.languages);
    }, []);

    // Extracting keys from the languages object
    let convert = languages;
    console.log(typeof convert)

    let languageList = Object.keys(convert);
    console.log(languageList);

  return (
    <div className='repository-page'>
        
        <section className='repo-details'>
            <img src={repository.avatar} alt='avatar' />
            <h4>{repository.login}</h4>
            <h1>{repository.name}</h1>
            <div className='repo-data'>
                <div className='contributors'>
                    <h3>Top contibutors:</h3>
                    <ol>
                        {contribs.slice(0,10).map(x => <li><a href={x.url}>{x.login}</a></li>)}
                    </ol>
                </div>
            <div className='numbers'>
                <h4>Forks: {repository.forks}</h4>

                <h4>Stars: {repository.stars}</h4>

                <h4>Open Issues: {repository.issues}</h4>
            </div>

            <div className='languages'>
                <h3>Languages Used:</h3>
                <ol>
                    {languageList?.map(x => <li>{x}</li>)}
                </ol>
            </div>
            </div>

            <Link to='/'>
                <button>Back to Repository List</button>
            </Link>
        </section>
        
    </div>
  )
}

export default RepositoryPage