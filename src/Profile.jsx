export default function Profile(props) {
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
