import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
