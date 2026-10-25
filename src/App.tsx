import { Hero } from "./components/Hero";
import { Thesis } from "./components/Thesis";
import { TestBand } from "./components/TestBand";
import { Join } from "./components/Join";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero />
      <main id="main">
        <Thesis />
        <TestBand />
        <Join />
      </main>
      <Footer />
    </>
  );
}
