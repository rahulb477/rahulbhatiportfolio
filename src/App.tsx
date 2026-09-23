import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Certificate from "./components/Certificate";
import HelloWorldGame from "./components/HelloWorldGame";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      <main
        className="animate-site-in"
        aria-hidden={loading || undefined}
        inert={loading || undefined}
      >
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Certificate />
        <HelloWorldGame />
        <Contact />
      </main>
      <div aria-hidden="true" className="ambient-vignette" />
      <div aria-hidden="true" className="ambient-grain" />
      {loading && <LoadingScreen onComplete={finishLoading} />}
    </>
  );
}
