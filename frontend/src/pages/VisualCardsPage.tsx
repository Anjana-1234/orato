import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisualCards from "../components/VisualCards";

const VisualCardsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-gray-900">
      <Navbar />
      <main className="flex-1 p-6 lg:p-8">
        <VisualCards />
      </main>
      <Footer />
    </div>
  );
};

export default VisualCardsPage;
