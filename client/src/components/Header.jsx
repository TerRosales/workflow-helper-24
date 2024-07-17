import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="text-4xl font-bold ">
            Workflow <span className="text-blue-600">Helper</span>
          </h1>
        </Link>
        <ul className="flex gap-4 font-semibold text-sm">
          <Link to="signin">
            <li className="headerItems">Sign In</li>
          </Link>
          <Link to="/lines">
            <li className="headerItems">Troubleshoot</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
