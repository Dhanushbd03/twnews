// import React from 'react'
import Layout from "@/components/layout/Layout";
import Title from "@/components/title/Title";
import Category from "@/components/category/Category";
import React, { ReactElement } from "react";
import Footer from "./components/footer/Footer";
import { Toaster } from "./components/ui/sonner";
const App = ({ page }: { page: ReactElement }) => {

  return (
    <Layout >
      <Title />
      <Category />
      {page}
      <Footer />
      <Toaster richColors />
    </Layout>
  );
};

export default App;
