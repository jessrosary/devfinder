import './App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Profile from './Profile';
import { useState } from 'react';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState('');

  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchValue}`
      );
      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
      setUserData('User not found');
    }
  };

  return (
    <div className='App'>
      <Header />
      <SearchBar
        handleChange={(e) => setSearchValue(e.target.value)}
        handleSearch={searchUser}
      />
      {userData && <Profile user={userData} />}
    </div>
  );
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
