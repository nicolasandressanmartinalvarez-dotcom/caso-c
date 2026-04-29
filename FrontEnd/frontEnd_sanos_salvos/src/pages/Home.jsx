import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../components/Map";
import "../components/diseño/Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <Header />

      <main className="main-content">
        <div className="map-container">
          <Map />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;