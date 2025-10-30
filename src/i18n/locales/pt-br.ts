import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  metadata: {
    title: "Gabriel®",
    description:
      "New person, same old mistakes.",
  },
  layout: {
    brandName: "Gabriel",
  },
  header: {
    contactCta: "Contato",
  },
  hero: {
    paragraphs: [
      "Sou movido por ideias, pela natureza e o brilho humano nos encontros autênticos. Trago comigo valores de honestidade e respeito, e um desejo constante de inspirar outros – não aceito mediocridade, nem minha nem de ninguém, apenas a busca pela melhor versão.",
      "É na cooperação genuína, criando projetos que importam, e nos momentos reais com aqueles que amo que encontro meu sentido de estar vivo."
      ],
    signatureAlt: "Assinatura",
    avatarLabel: "Ícone de perfil",
  },
  experience: {
    sectionTitle: "Experiência",
    entries: [
      {
        company: "ACCENTURE",
        period: "06/2025",
        role: "Trainee",
        description:
          "Atuo em uma das maiores consultorias globais, com mais de 600 mil funcionários em 120+ países, onde desenvolvo soluções tecnológicas inovadoras em um ambiente verdadeiramente multicultural. Possuo sólida experiência em metodologias de desenvolvimento para industria e colaboração direta com clientes internacionais, entregando resultados que impulsionam a transformação digital dos negócios.",
        companyHref: "https://www.accenture.com/",
        logo: {
          src: "/logos/accenture.svg",
          alt: "Logo da Accenture",
        },
        country: {
          src: "/flags/european-union.svg",
          alt: "Bandeira da União Europeia",
        },
      },
      {
        company: "SYSTEMA",
        period: "06/2024 - 06/2025",
        role: "Trainee",
        description:
          "Participei de projetos para grandes empresas, aprendi diretamente com profissionais muito experientes e pude colocar a mão na massa em tudo, desde sistemas mais antigos até aplicações modernas criando uma base de desenvolvimento de software para Automação e Manufatura na Indústria com SAP",
        companyHref: "https://www.systema.com/",
        logo: {
          src: "/logos/systema.svg",
          alt: "Logo da Systema",
        },
        country: {
          src: "/flags/germany.svg",
          alt: "Bandeira da Alemanha",
        },
      },
      {
        company: "WG",
        period: "2021 - 2024",
        role: "Freelancer",
        description:
          "Na WG, uma representante de calçados com mais de 30 anos de mercado, tive a oportunidade de trabalhar em projetos como criação e manutenção de um site, desenvolvi minhas habilidades em cloud na construção de um back-end estrutural da empresa para gerenciamento de dados e notas fiscais.",
        companyHref: "https://www.wg.com.br/",
        logo: {
          src: "/logos/wg.svg",
          alt: "Logo da WG",
        },
        country: {
          src: "/flags/brazil.svg",
          alt: "Bandeira do Brasil",
        },
      },
    ],
  },
  education: {
    sectionTitle: "Formação",
    entries: [
      {
        institution: "UCSAL",
        period: "2021 - 2026/6",
        degree: "Curso Engenharia de Software",
        description:
          "Curso Engenharia de Software na UCSal, instituição reconhecida pela excelência acadêmica e formação de profissionais qualificados em tecnologia. O curso proporciona base sólida em programação, design de interfaces, engenharia de requisitos, testes, desenvolvimento ágil e segurança cibernética.",
      },
      {
        institution: "HarvardX CS50x",
        period: "2022 - 2023",
        degree: "Introdução à Ciência da Computação",
        description:
          "Concluí o curso CS50x da Universidade de Harvard, uma introdução intensiva e renomada à ciência da computação. Este curso aprimorou minha capacidade de resolver problemas complexos por meio do pensamento computacional, uma habilidade essencial para o desenvolvimento eficaz de software.",
      },
      {
        institution: "Cultura Inglesa",
        period: "2012 -",
        degree: "Inglês Fluente",
        description:
          "Comecei a aprender inglês aos 6 anos no colégio, completei o nível Avançado na Cultura Inglesa e aprimorei o idioma em viagens internacionais, mantendo contato contínuo com o inglês.",
      },
      {
        institution: "One Bit Code Pro",
        period: "2021 - 2023",
        degree: "Programa Completo de Desenvolvimento",
        description:
          "Participei do One Bit Code Pro, um programa completo que cobriu Front-End, Back-End, Mobile, Python, Ruby, Ruby on Rails e No Code.",
      },
    ],
  },
  projects: {
    sectionTitle: "Projetos",
    entries: [
      {
        name: "ICE",
        image: { src: '/projects/ICE-B-2.png', alt: 'Homepage da ICE' },
        description:
          "Startup de deep tech com a missão de implementar IA de forma estratégica e escalável. Oferecemos soluções personalizadas para +3 empresas B2B e B2C em 2 países.",
        badges: ["B2B", "B2C"],
        primaryActionLabel: "Ver",
        primaryActionHref: "https://iceoficial.com/",
      },
      {
        name: "Omni",
        image: { src: '/projects/Omni-B-2.png', alt: 'Homepage da ICE' },
        description:
          "Ecossistema de agentes de IA que democratiza o acesso à inteligência artificial. Combinamos diversos modelos e ferramentas especializadas em uma interface intuitiva, atendendo +1000 usuários com soluções práticas.",
        badges: ["IA", "Agentes"],
        primaryActionLabel: "Testar",
        primaryActionHref: "https://omni-xi.vercel.app/",
      },
    ],
  },
  contact: {
    title: "Contato",
    emailLabel: "Email",
    emailValue: "gabrielrm.email@gmail.com",
    linkedinLabel: "LinkedIn",
    linkedinValue: "https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/",
    linkedinText: "Visitar LinkedIn",
    githubLabel: "GitHub",
    githubValue: "github.com/gabriel",
    githubText: "Abrir GitHub",
  },
  footer: {
    quote: {
      text: "Pressure is a privilege.",
    },
    copyright: "© {year} Gabriel®. Todos os direitos reservados.",
  },
};
