import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Philosophy } from "@/components/Philosophy";
import { Preloader } from "@/components/Preloader";
import { Principles } from "@/components/Principles";
import { Process } from "@/components/Process";
import { ScrollRefresh } from "@/components/ScrollRefresh";
import { Services } from "@/components/Services";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Works } from "@/components/Works";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <noscript>
        <style>{`[data-preloader]{display:none}`}</style>
      </noscript>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Philosophy />
        <Principles />
        <Process />
        <Works />
        <Services />
        <Contact />
      </main>
      <ScrollRefresh />
    </>
  );
}
