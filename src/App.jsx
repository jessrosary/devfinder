import { useState } from 'react';
import dayjs from 'dayjs';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState();
  const [userCache, setUserCache] = useState({});
  const [fetchError, setFetchError] = useState();
  const [theme, setTheme] = useState('light');

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
          const userData = { ...data, lastFetched: Date.now() };

          setUserData(userData);

          setUserCache((prevUserCache) => ({
            ...prevUserCache,
            [username]: userData,
          }));
        } else {
          setFetchError(`User '${searchValue}' not found`);
        }
      });
  };

  // TODO: implement cache refresh
  // const refreshUser = (user) => {
  //   delete userCache.user;
  //   fetchUser(user);
  // };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    setTheme(newTheme);
  };

  return (
    <div className='App'>
      <header>
        <div id='logo'>devfinder</div>
        <div id='switch'>
          <div onClick={toggleTheme}>
            <ToggleThemeButton theme={theme} />
          </div>
        </div>
      </header>
      <div className='searchbar'>
        <img
          className='magnifying-glass'
          src='src/assets/magnifying-glass.svg'
        />
        <input
          type='text'
          spellCheck='false'
          name='search'
          autoComplete='off'
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUser(searchValue)}
          placeholder='Search GitHub username ...'
        />
        <button onClick={fetchUser}>Search</button>
      </div>
      <Profile
        theme={theme}
        user={userData}
        error={fetchError}
        // refreshUser={refreshUser}
      />
    </div>
  );
}

const ToggleThemeButton = (props) => {
  const [text, image] =
    props.theme === 'light' ? ['Dark', 'moon.svg'] : ['Light', 'sun.svg'];

  return (
    <span className='switch'>
      {text} <img src={`./src/assets/${image}`} />
    </span>
  );
};

const Profile = (props) => {
  const { user, error } = props;

  if (!error && !user) {
    return <></>;
  }

  return (
    <div className='profile'>
      {error && (
        <p className='error'>
          <strong>Error:</strong> {error}
        </p>
      )}
      {user && (
        <>
          <img src={user.avatar_url} className='avatar'></img>
          <div className='stats-container'>
            <div className='main'>
              <span className={user.name ? 'name' : 'name not-available'}>
                {user.name || 'No name'}
              </span>
              <br></br>
              <span className='login'>@{user.login}</span>
              <br></br>
              <span className='joined'>
                Joined&nbsp;
                {dayjs(user.created_at).format('DD MMM YYYY')}
              </span>
            </div>
            <p className={user.bio ? null : 'not-available'}>
              {user.bio || 'This profile has no bio'}
            </p>
            <div className='stats'>
              <div>
                Repos<br></br>
                <span className='stat'>{user.public_repos}</span>
              </div>
              <div>
                Followers<br></br>
                <span className='stat'>{user.followers}</span>
              </div>
              <div>
                Following<br></br>
                <span className='stat'>{user.following}</span>
              </div>
            </div>
            <div className='socials'>
              <div className={user.location ? null : 'not-available'}>
                <img
                  className='icon'
                  src={`./src/assets/location-${props.theme}.svg`}
                />
                {user.location || 'Not available'}
              </div>
              <div className={user.twitter_username ? null : 'not-available'}>
                <img
                  className='icon'
                  src={`./src/assets/twitter-${props.theme}.svg`}
                />
                {user.twitter_username || 'Not available'}
              </div>
              <div className={user.blog ? null : 'not-available'}>
                <img
                  className='icon'
                  src={`./src/assets/link-${props.theme}.svg`}
                />
                {user.blog || 'Not available'}
              </div>
              <div className={user.company ? null : 'not-available'}>
                <img
                  className='icon'
                  src={`./src/assets/building-${props.theme}.svg`}
                />
                {user.company || 'Not available'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
