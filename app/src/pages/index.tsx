//Modules
import Navbar from "../modules/Navbar/Navbar";
import InspirationalFrame from "@/modules/InspirationalFrame/InspirationalFrame";
import Footer from "@/modules/Footer/Footer"

export default function Home() {
  return (
    <div>
      <div className="bg-bgcream">
        <header className="max-w-[85%] m-auto">
          <Navbar />
        </header>
      </div>
      <div className="bg-dark">
        <article className="ml-[7.5%]">
          <InspirationalFrame />
        </article>
      </div>
      <div className="bg-bgcream">
        <footer className="max-w-[85%] m-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
};