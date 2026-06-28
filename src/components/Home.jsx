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

  const category = decodeURIComponent(search.split("=")[1]);

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
    // ✅ products load hone ka wait karo
    if (!products) return;

    setfilteredProduct(null);

    if (category === "undefined") {
      setfilteredProduct(products);
    } else {
      getproductscategory();
    }
  }, [category, products]);
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
