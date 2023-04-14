export default function SearchBar(props) {
  return (
    <div className='searchbar'>
      <form onSubmit={props.handleSearch}>
        <input
          type='text'
          name='search'
          onChange={props.handleChange}
          placeholder='Search GitHub username...'
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}
