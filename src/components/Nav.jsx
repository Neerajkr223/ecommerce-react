import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const { search, pathname } = useLocation();

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
        {pathname != "/" ||
          (search.length > 0 && (
            <Link to="/" className="text-red-400">
              Home
            </Link>
          ))}
        <a
          className="py-2 px-5 border rounded border-blue-200 text-blue-300"
          href="/create"
        >
          Add New Product
        </a>

        <hr className="my-3 w-[80%]" />

        {/* Search Box */}
        <div className="w-[80%] flex mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="border rounded-l p-2 w-[80%] outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-400 text-white px-3 rounded-r"
          >
            Go
          </button>
        </div>

        <hr className="my-3 w-[80%]" />

        <h1 className="text-xl mb-3 w-[80%] bg-blue-500 p-2 rounded">
          Category Filter
        </h1>

        {distinct_category.map((c, i) => (
          <div key={i} className="w-[80%]">
            <Link to={`/?category=${c}`} className="flex items-center mb-3">
              <span className="rounded-full mr-2 w-3.75 h-3.75 bg-blue-400"></span>
              {c}
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
};

export default Nav;
