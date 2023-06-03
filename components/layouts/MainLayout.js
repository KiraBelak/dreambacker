import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Seo from "@/components/common/Seo";

const MainLayout = ({ children, header = true }) => {
  return (
    <>
      <Seo />
      {header && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
