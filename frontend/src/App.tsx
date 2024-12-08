// import React from 'react'
import Layout from "@/components/layout/Layout";
import Title from "@/components/title/Title";
import Category from "@/components/category/Category";
import { ReactElement } from "react";
import Footer from "./components/footer/Footer";
const App = ({ page }: { page: ReactElement }) => {
  return (
    <Layout>
      <Title />
      <Category />
      {page}
      <Footer />
    </Layout>
  );
};

export default App;
