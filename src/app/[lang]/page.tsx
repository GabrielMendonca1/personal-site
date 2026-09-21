import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { copy, isLocale } from "@/lib/i18n";
import { getWritingPosts } from "@/lib/writing";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="basic-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = copy[lang];
  const posts = (await getWritingPosts(lang)).map((post) => ({
    ...post,
    year: post.date.slice(0, 4),
    day: post.date.length === 4 ? null : `${post.date.slice(8, 10)}/${post.date.slice(5, 7)}`,
  }));
  const years = [...new Set(posts.map((post) => post.year))];

  return (
    <SiteShell locale={lang}>
      <article className="article">
        <header>
          <h1>Gabriel Mendonça</h1>
          <time dateTime="2026-09-10">{lang === "pt" ? "Atualizado em 10 set. 2026" : "Updated Sep 10, 2026"}</time>
        </header>
        {lang === "pt" ? <>
          <p>Sou Engenheiro de Software e IA de Salvador, Brasil.</p>
          <p>Fundei a <ExternalLink href="https://arcatech.com.br/">ARCA</ExternalLink>, uma startup deep tech que desenvolve soluções de IA sustentáveis e escaláveis para empresas em dois países. Também trabalho na <ExternalLink href="https://www.accenture.com/">Accenture</ExternalLink> como Arquiteto de Software SAP para sistemas de manufatura.</p>
          <p>Antes, trabalhei na <ExternalLink href="https://www.systema.com/">SYSTEMA</ExternalLink>, desenvolvendo aplicações no ecossistema SAP, de backends e infraestrutura em nuvem a interfaces para manufatura. Estudei Engenharia de Software na <ExternalLink href="https://www.ucsal.br/">UCSAL</ExternalLink> e concluí o <ExternalLink href="https://cs50.harvard.edu/x/">CS50x de Harvard</ExternalLink>.</p>
          <p>Estou construindo sistemas de IA aplicada para o mundo real.</p>
          <p>Você pode me encontrar no <ExternalLink href="https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/">LinkedIn</ExternalLink> e no <ExternalLink href="https://www.instagram.com/gabrielrmend/">Instagram</ExternalLink>, ou falar comigo por <a className="basic-link" href="mailto:gabriel@arc-corporation.com">email</a>.</p>
        </> : <>
          <p>I&apos;m a Software and AI Engineer from Salvador, Brazil.</p>
          <p>I founded <ExternalLink href="https://arcatech.com.br/">ARCA</ExternalLink>, a deep tech startup building sustainable, scalable AI solutions for companies across two countries. I also work at <ExternalLink href="https://www.accenture.com/">Accenture</ExternalLink> as a SAP Software Architect for manufacturing systems.</p>
          <p>Previously, I worked at <ExternalLink href="https://www.systema.com/">SYSTEMA</ExternalLink>, building applications in the SAP ecosystem, from backends and cloud infrastructure to manufacturing interfaces. I studied Software Engineering at <ExternalLink href="https://www.ucsal.br/">UCSAL</ExternalLink> and completed <ExternalLink href="https://cs50.harvard.edu/x/">Harvard&apos;s CS50x</ExternalLink>.</p>
          <p>I&apos;m building applied AI systems for the real world.</p>
          <p>You can find me on <ExternalLink href="https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/">LinkedIn</ExternalLink> and <ExternalLink href="https://www.instagram.com/gabrielrmend/">Instagram</ExternalLink>, or reach me via <a className="basic-link" href="mailto:gabriel@arc-corporation.com">email</a>.</p>
        </>}
      </article>

      <section className="writing" aria-labelledby="writing-title">
        <h2 id="writing-title">{t.writing}</h2>
        <ul className="year-list">
          {years.map((year) => (
            <li key={year}>
              <ul>
                {posts.filter((post) => post.year === year).map((post) => (
                  <li key={post.slug}>
                    <Link href={`/writing/${post.slug}`}>
                      <h3>{post.title}{post.status === "draft" && <span className="draft-badge">{t.draft}</span>}</h3>
                      <time dateTime={post.date}>
                        {post.day && <><span>{post.day}</span><span className="date-slash">/</span></>}
                        <span className="date-year">{post.year}</span>
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
