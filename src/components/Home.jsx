import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const category = queryParams.get("category");
  const searchTerm = queryParams.get("search");

  const [filteredProducts, setfilteredProduct] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!products) return;

    setfilteredProduct(null);

    if (searchTerm) {
      // search term ke basis pe filter karo (title se match)
      const result = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setfilteredProduct(result);
    } else if (!category) {
      setfilteredProduct(products);
    } else {
      getproductscategory();
    }
  }, [category, searchTerm, products]);

  return products ? (
    <>
      <Nav />

      <div className=" w-[85%]  flex flex-wrap p-5 gap-5">
        {filteredProducts &&
          filteredProducts.map((p, index) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="card p-3 border shadow rounded w-[18%] h-[40vh] flex-col flex justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>

              <h1>{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
