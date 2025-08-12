import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../../assets/assets";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [popular, setPopular] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [deals, setDeals] = useState([]);
  const [dealsTitle, setDealsTitle] = useState("Deals");

  useEffect(() => {
    axios
      .get(`${url}/api/food/popular`)
      .then((res) => setPopular(res.data.data || []));
    axios
      .get(`${url}/api/food/featured`)
      .then((res) => setFeatured(res.data.data || []));
    axios
      .get(`${url}/api/food/deals`)
      .then((res) => setDeals(res.data.data || []));
    axios
      .get(`${url}/api/settings`)
      .then((res) => setDealsTitle(res?.data?.data?.dealsTitle || "Deals"));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-8"
    >
      <Header />
      {deals.length > 0 && (
        <>
          <h2 style={{ marginTop: 24 }}>{dealsTitle}</h2>
          <FoodDisplay customList={deals} category={undefined} />
        </>
      )}
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      {popular.length > 0 && (
        <>
          <h2 style={{ marginTop: 32 }}>Most Popular Items</h2>
          <FoodDisplay customList={popular} category={undefined} />
        </>
      )}
      {featured.length > 0 && (
        <>
          <h2 style={{ marginTop: 32 }}>Featured Items</h2>
          <FoodDisplay customList={featured} category={undefined} />
        </>
      )}
      <AppDownload />
    </motion.div>
  );
};

export default Home;
