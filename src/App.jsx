import './App.css';
// import Header from './Header';
// import SearchBar from './SearchBar';
// import Profile from './Profile';
import { useState } from 'react';

function Header(props) {
  return (
    <header>
      <div id='logo'>devfinder</div>
      <div id='switch'>
        <input
          type='checkbox'
          id='darkmode'
          name='darkmode'
          onClick={props.toggle}
        />
      </div>
    </header>
  );
}

function SearchBar(props) {
  return (
    <div className='searchbar'>
      <input
        type='text'
        name='search'
        onChange={props.handleChange}
        onKeyDown={props.handleKeyDown}
        placeholder='Search GitHub username...'
      />
      <button onClick={props.handleSearch}>Search</button>
    </div>
  );
}

function Profile(props) {
  const user = props.user;

  return (
    <div className='profile'>
      <ul>
        <li>{user.name}</li>
        <li>{user.login}</li>
        <li>{user.created_at}</li>
        <li>{user.bio}</li>
      </ul>
    </div>
  );
}

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // TODO: add searchValue validation(s), e.g. do not search for empty value
  // TODO: add error states for
  // 1. error, e.g. API error or JSON parsing error
  // 2. user not found
  const searchUser = () => {
    fetch(`https://api.github.com/users/${searchValue}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  };

  const handleMode = () => {
    setDarkMode((prevState) => !prevState);

    return (
      <div className='App'>
        <Header toggle={handleMode} />
        <SearchBar
          handleChange={(e) => setSearchValue(e.target.value)}
          handleSearch={searchUser}
          handleKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchUser(searchValue);
            }
          }}
        />
        {userData && <Profile user={userData} />}
      </div>
    );
  };
};

export default App;

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
