import Head from "next/head";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import { client } from "../lib/client";
import Vault from "../components/Vault";
import { useEffect, useRef, useState } from "react";

type Props = {
  projectData: any;
};

export default function Home({ projectData }: Props) {
  const [exhibitionScroll, setExhibitionScroll] = useState(0);

  useEffect(() => {
    console.log(exhibitionScroll);
  }, [exhibitionScroll]);

  return (
    <div
      className="relative text-gray-800 overflow-x-hidden z-0 flex flex-col gap-32 lg:gap-0
      svgBackground
    "
    >
      <Head>
        <meta
          name="keywords"
          content="portfolio, exhibition, seancfong, software developer, computer science"
        />
        <meta
          name="description"
          content="Minimal software developer portfolio site, constructed by Sean Collan Fong."
        />
        <meta name="author" content="Sean Collan Fong" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exhibition | seancfong</title>
      </Head>

      {/* Header */}
      <Header exhibitionScroll={exhibitionScroll} />

      {/* Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* About */}
      <section id="about">
        <About />
      </section>

      {/* Skills */}
      <section id="skills">
        <Skills />
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={(exhibitionRef) => {
          if (!exhibitionRef) return;

          setExhibitionScroll(exhibitionRef.offsetTop);
        }}
      >
        <Projects projectData={projectData} />
      </section>

      {/* Vault */}
      {/* <section id="vault">
        <Vault />
      </section> */}

      {/* Contact */}
      <section id="contact"></section>

      {/* Footer */}
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const projectQuery = `*[_type == 'showcase' && category == 'Showcase'] {
    content[]->
  }[0].content
  `;

  const projectData = await client.fetch(projectQuery);

  return {
    props: {
      projectData,
    },
  };
};
