import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";


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
          
          <li>
            <Dropdown color="blue" className="" label="Menu" dismissOnClick={false}>
              <Dropdown.Item>Troubleshoot</Dropdown.Item>
              <Dropdown.Item>Lines</Dropdown.Item>
              <Dropdown.Item>Tips</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>

              <Dropdown.Item><Link to="signin">
            <li className="headerItems">Sign In</li>
          </Link></Dropdown.Item>
              <Dropdown.Item><Link to="signup">
              
          </Link></Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
