//Modules
import Navbar from "../modules/Navbar/Navbar";
import InspirationalFrame from "@/modules/InspirationalFrame/InspirationalFrame";
import Footer from "@/modules/Footer/Footer";
import ArticleLine from "@/components/ArticleLine/ArticleLine";
import DepoimentLine from "@/components/DepoimentLine/DepoimentLine";



export default function Home() {
  return (
    <div>
      <div className="bg-bgcream">
        <header className="max-w-[85%] m-auto">
          <Navbar />
          <ArticleLine />
        </header>
      </div>
      <div className="bg-dark">
        <article className="ml-[7.5%] max-[790px]:ml-none max-[790px]:max-w-[85%] max-[790px]:m-auto">
          <InspirationalFrame />
        </article>
      </div>
      <div className="bg-bgcream">
        <div className="max-w-[85%] m-auto">
          <DepoimentLine />
        </div>
      </div>
      <div className="bg-[#c4c4c4]">
        <footer className="max-w-[85%] m-auto">
          <Footer />
        </footer>
      </div>

    </div>
  );
};