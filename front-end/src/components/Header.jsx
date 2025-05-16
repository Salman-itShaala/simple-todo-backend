import { Link } from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn}) {
  return (
    <header className="flex justify-between px-20 left-0 right-0 w-full fixed backdrop-blur-2xl h-16 items-center">
      <Link to="/" className="text-2xl font-bold">
        TodosApp
      </Link>
      {isLoggedIn ?
      <button>Logout</button>
       :
        <div className="">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="ml-8">Signup</Link>
      </div>}
      
    </header>
  );
}

export default Header;
