export default function Logout(props) {

  return (

    // props coming from Navbar - component is directly rendered there
    <div className="NavbarItem" onClick={props.onClick}>
      <h4>{props.children}</h4>
    </div>

  );
}