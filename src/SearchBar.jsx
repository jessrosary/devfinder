export default function SearchBar(props) {
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
