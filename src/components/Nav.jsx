import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const { search, pathname } = useLocation();
  console.log(search, pathname);

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
