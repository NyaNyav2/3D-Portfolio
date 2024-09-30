import { NavLink } from "react-router-dom";
import { close, menu } from "../assets/images";
import { navLinks } from "../data/index.js";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <h1 className="relative w-[max-content] font-mono font-bold text-2xl before:absolute before:inset-0 before:animate-typewriter before:bg-white after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black"
      >Wellcome to my 3D Portfolio</h1>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1 space-x-6">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className="font-mono font-bold cursor-pointer text-[20px] hover:text-blue-400 "
          >
            <NavLink
              to={nav.id}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-dimWhite")}
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? "hidden" : "flex"} p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col space-y-3">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="font-poppins font-medium cursor-pointer text-[16px] hover:text-blue-400"
              >
                <NavLink
                  to={nav.id}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-dimWhite")}
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;