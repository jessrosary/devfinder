import './App.css';
import { useEffect, useState } from 'react';

const Profile = (props) => {
  const { user, error } = props;

  return (
    <div className='profile'>
      {error && (
        <p className='error'>
          <strong>Error:</strong> {error}
        </p>
      )}
      {user && (
        <ul>
          <li>{user.name}</li>
          <li>{user.login}</li>
          <li>{user.created_at}</li>
          <li>{user.bio}</li>
          <li>
            <em>Last updated: ${user.lastFetched}</em>
          </li>
        </ul>
      )}
    </div>
  );
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState();
  const [userCache, setUserCache] = useState({});
  const [fetchError, setFetchError] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchUser = () => {
    setUserData();
    setFetchError();

    if (!searchValue) {
      setFetchError('Empty username');
      return;
    }

    const username = searchValue.toLowerCase();
    const cachedUserData = userCache[username];

    if (cachedUserData) {
      console.log(`fetching ${username} from cache`);
      setUserData(cachedUserData);
      return;
    }

    fetch(`https://api.github.com/users/${searchValue}`)
      .then((response) =>
        response.ok ? response.json() : setFetchError(`API ${response.status}`)
      )
      .then((data) => {
        if (data) {
          setUserData(data);
          setUserCache((prevUserCache) => ({
            ...prevUserCache,
            [username]: { ...data, lastFetched: Date.now() },
          }));
        } else {
          setFetchError(`User '${searchValue}' not found`);
        }
      });
  };

  useEffect(() => {
    console.log(userCache);
  }, [userCache]);

  // TODO: implement dark mode
  const handleMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div className='App'>
      <header>
        <div id='logo'>devfinder</div>
        <div id='switch'>
          <input
            type='checkbox'
            id='isDarkMode'
            name='isDarkMode'
            onClick={handleMode}
          />
        </div>
      </header>
      <div className='searchbar'>
        <input
          type='text'
          name='search'
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUser(searchValue)}
          placeholder='Search GitHub username ...'
        />
        <button onClick={fetchUser}>Search</button>
      </div>
      <Profile user={userData} error={fetchError} />
    </div>
  );
}
