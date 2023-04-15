export default function Header(props) {
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
