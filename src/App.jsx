import './App.css';
// import Header from './Header';
// import SearchBar from './SearchBar';
// import Profile from './Profile';
import { useEffect, useState } from 'react';

const Profile = (props) => {
  const user = props.user;

  return (
    <div className='profile'>
      {!props.isUserFound && (
        <div className='error'>
          <h1>Error: User not Found</h1>
        </div>
      )}
      <ul>
        <li>{user.name}</li>
        <li>{user.login}</li>
        <li>{user.created_at}</li>
        <li>{user.bio}</li>
      </ul>
    </div>
  );
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [userCache, setUserCache] = useState({});
  const [isUserFound, setisUserFound] = useState(true);

  const searchUser = () => {
    setisUserFound(true);
    setUserData('');

    if (!searchValue) {
      console.log('no value');
      return;
    }

    if (!userCache[searchValue] == undefined) {
      setUserData(searchValue);
      return;
    }
    fetch(`https://api.github.com/users/${searchValue}`)
      .then((response) => {
        if (!response.ok) {
          console.log('error loading');
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          setisUserFound(false);
          return;
        }
        setUserData(data);
        setUserCache((prevUserCache) => ({
          ...prevUserCache,
          [data.login]: { ...data, lastFetched: Date.now() },
        }));
      });
  };

  useEffect(() => {
    console.log(userCache);
  }, [userCache]);

  const handleMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <div className='App'>
      <header>
        <div id='logo'>devfinder</div>
        <div id='switch'>
          <input
            type='checkbox'
            id='darkmode'
            name='darkmode'
            onClick={handleMode}
          />
        </div>
      </header>
      <div className='searchbar'>
        <input
          type='text'
          name='search'
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchUser(searchValue);
            }
          }}
          placeholder='Search GitHub username...'
        />
        <button onClick={searchUser}>Search</button>
      </div>
      <Profile user={userData} isUserFound={isUserFound} />
    </div>
  );
}

// useEffect(() => {
//   console.log(`fetching ${selectedUser} ...`);
//   fetch(`https://api.github.com/users/${selectedUser}`)
//     .then((response) => response.json()
//     .then((data) => setUserData(data));
// }, [selectedUser]);

// const searchUser = () => {
//   if (!searchValue) return;

//   console.log(`fetching ${searchValue} ...`);

//   fetch(`https://api.github.com/users/${user}`)
//     .then((response) => response.json())
//     .then((data) => {
//       setUserData((prevUserData) => ({
//         ...prevUserData,
//         [user]: { ...data, lastFetched: Date.now() },
//       }));
//       // setSelectedUser(searchValue);
//     });
// };

// const selectUser = (user) => {

//   if (user !== selectedUser) {
//     setSelectedUser(user);
//   }

//   if (userData[user] && !isExpired(userData[user])) {
//     console.log(`user ${user} already in state, skipping ...`);
//     return;
//   }

//   doSelectUser(user);
// };

// const selectUserData = userData[selectedUser];

// const SearchResult = (props) => {
//   const data = props.data;
//   if (props.data) {
//     return (
//       <ul>
//         <li>Name: {data.name}</li>
//         <li>Username: {data.login}</li>
//         <li>Location: {data.location}</li>
//       </ul>
//     );
//   } else {
//     return <pre>No data.</pre>;
//   }
// };

// const isExpired = (user) => {
//   return false;

//   // console.log(`isExpired`, user);
//   // if (user.lastFetched <= 1681254591483) {
//   //   console.log(`user ${user.login} is expired`);
//   //   return true;
//   // } else {
//   //   return false;
//   // }
// };
