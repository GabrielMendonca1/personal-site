import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  metadata: {
    title: "Gabriel®",
    description: "New person, same old mistakes.",
  },
  layout: {
    brandName: "G",
  },
  header: {
    contactCta: "Contato",
  },
  hero: {
    paragraphs: [
      "Sou movido por ideias, pela natureza e o brilho humano nos encontros autênticos. Trago comigo valores de honestidade e respeito, e um desejo constante de inspirar outros – não aceito mediocridade.",
      "É na cooperação genuína, criando projetos que importam, e nos momentos reais com aqueles que amo que encontro meu sentido de estar vivo.",
    ],
    signatureAlt: "Assinatura",
    avatarLabel: "Ícone de perfil",
    avatarImage: {
      src: "/profile2.jpeg",
      alt: "Foto",
    },
  },
  experience: {
    sectionTitle: "Experiência",
    entries: [
      {
        company: "Accenture",
        period: "04/2026",
        role: "SAP Software Architect | Manufacturing Systems",
        description:
          "Arquitetura e desenvolvimento cloud de soluções escaláveis em SAP BTP, utilizando o modelo CAP e interfaces SAPUI5/Fiori. Crescendo junto com a Accenture com forte foco em inovação com IA no setor industrial.",
        companyHref: "https://www.accenture.com/",
        logo: {
          src: "/logos/accenture.svg",
          alt: "Logo da Accenture",
        },
      },
      {
        company: "SYSTEMA",
        period: "01/2026 - 03/2026",
        role: "Desenvolvedor full stack",
        description:
          "Desenvolvimento de aplicações full-stack no ecossistema SAP, com foco em serviços backend (CAP/CDS), interfaces UI5/Fiori com integração OData, gestão de dados em PostgreSQL/HANA e experiência em SAP BTP e Digital Manufacturing.",
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
        company: "SYSTEMA",
        period: "2024 - 2025",
        role: "Trainee",
        description:
          "Participei de projetos para grandes empresas, aprendi diretamente com profissionais muito experientes, desde sistemas mais antigos até aplicações modernas criando uma base de desenvolvimento de software para Automação e Manufatura na Indústria.",
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
          "Na WG, uma representante de calçados com mais de 30 anos de mercado, tive a oportunidade de trabalhar em projetos diversos e com mais liberdade, desenvolvi minhas habilidades em cloud na construção de um back-end da empresa para gerenciamento de dados e notas fiscais.",
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
        institution: "HarvardX CS50x",
        period: "2021 - 2023",
        degree: "Ciência da Computação",
        description:
          "Concluí o curso CS50x da Universidade de Harvard, uma introdução intensiva e renomada à ciência da computação. Este curso aprimorou minha capacidade de resolver problemas complexos por meio do pensamento logico.",
      },
      {
        institution: "UCSAL",
        period: "2021 - 2026/6",
        degree: "Engenharia de Software",
        description:
          "Curso Engenharia de Software na UCSal, instituição reconhecida pela excelência acadêmica e formação de profissionais qualificados em tecnologia.",
      },
      {
        institution: "Cultura Inglesa",
        period: "2012",
        degree: "Inglês Fluente",
        description:
          "Comecei a aprender inglês aos 6 anos, completei o nível Avançado na Cultura Inglesa e aprimorei o idioma em viagens internacionais, mantendo contato contínuo com o inglês.",
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
        name: "ARC",
        image: { src: "/projects/ICE-B-2.png", alt: "ICE" },
        description:
          "Startup de deep tech com a missão de implementar IA de forma sustentável e escalável. Oferecemos soluções personalizadas para +3 empresas B2B e B2C em 2 países.",
        badges: ["B2B", "B2C"],
        primaryActionLabel: "Visitar",
        primaryActionHref: "https://arc-corporation.com/",
      },
    ],
  },
  contact: {
    title: "Contato",
    emailLabel: "Email",
    emailValue: "gabrielrm.email@gmail.com",
    businessEmailLabel: "Email Corporativo",
    businessEmailValue: "gabriel@arc-corporation.com",
    linkedinLabel: "LinkedIn",
    linkedinValue:
      "https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/",
    linkedinText: "Visitar LinkedIn",
    githubLabel: "GitHub",
    githubValue: "https://github.com/GabrielMendonca1",
    githubText: "Abrir GitHub",
  },
  footer: {
    quote: {
      text: "Pressure is a privilege.",
    },
    copyright: "© {year} Gabriel®.",
  },
};
