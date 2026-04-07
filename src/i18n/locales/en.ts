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
    contactCta: "Contact",
  },
  hero: {
    paragraphs: [
      "Passionate about technology, nature, and genuine connections. I work with artificial intelligence, software architecture, and cloud.",
      "I believe the best work is born when technical quality meets real purpose.",
    ],
    signatureAlt: "Signature",
    avatarLabel: "Profile icon",
    avatarImage: {
      src: "/IMG_0174.jpg",
      alt: "Photo",
    },
  },
  experience: {
    sectionTitle: "Experience",
    entries: [
      {
        company: "Accenture",
        period: "04/2026",
        role: "SAP Software Architect | Manufacturing Systems",
        description:
          "Cloud architecture and development of scalable solutions on SAP BTP, using the CAP model and SAPUI5/Fiori interfaces. Growing alongside Accenture with a strong focus on AI-driven innovation in the manufacturing space.",
        companyHref: "https://www.accenture.com/",
        logo: {
          src: "/logos/accenture.svg",
          alt: "Accenture Logo",
        },
        country: {
          src: "/flags/brazil.svg",
          alt: "Brazil Flag",
        },
      },
      {
        company: "SYSTEMA",
        period: "01/2026 - 03/2026",
        role: "Full-Stack Developer",
        description:
          "Development of full-stack applications in the SAP ecosystem, focused on backend services (CAP/CDS), UI5/Fiori interfaces with OData integration, data management in PostgreSQL/HANA, and experience with SAP BTP and Digital Manufacturing.",
        companyHref: "https://www.systema.com/",
        logo: {
          src: "/logos/systema.svg",
          alt: "Systema Logo",
        },
        country: {
          src: "/flags/germany.svg",
          alt: "Germany Flag",
        },
      },
      {
        company: "SYSTEMA",
        period: "2024 - 2025",
        role: "Trainee",
        description:
          "I participated in projects for major companies, learning directly from highly experienced professionals, ranging from legacy systems to modern applications, creating a software development foundation for Automation and Manufacturing in the Industry.",
        companyHref: "https://www.systema.com/",
        logo: {
          src: "/logos/systema.svg",
          alt: "Systema Logo",
        },
        country: {
          src: "/flags/germany.svg",
          alt: "Germany Flag",
        },
      },
      {
        company: "WG",
        period: "2021 - 2024",
        role: "Freelancer",
        description:
          "At WG, a footwear representative with over 30 years in the market, I had the opportunity to work on diverse projects with more freedom. I developed my cloud skills by building a company back-end for data and invoice management.",
        companyHref: "https://www.wg.com.br/",
        logo: {
          src: "/logos/wg.svg",
          alt: "WG Logo",
        },
        country: {
          src: "/flags/brazil.svg",
          alt: "Brazil Flag",
        },
      },
    ],
  },
  education: {
    sectionTitle: "Education",
    entries: [
      {
        institution: "HarvardX CS50x",
        period: "2021 - 2023",
        degree: "Computer Science",
        description:
          "I completed the CS50x course at Harvard University, a renowned intensive introduction to computer science. This course honed my ability to solve complex problems through logical thinking.",
      },
      {
        institution: "UCSAL",
        period: "2021 - 2026/6",
        degree: "Software Engineering",
        description:
          "I study Software Engineering at UCSal, an institution recognized for academic excellence and training qualified professionals in technology.",
      },
      {
        institution: "Cultura Inglesa",
        period: "2012",
        degree: "Fluent English",
        description:
          "I started learning English at age 6, completed the Advanced level at Cultura Inglesa, and improved the language during international trips, maintaining continuous contact with English.",
      },
      {
        institution: "One Bit Code Pro",
        period: "2021 - 2023",
        degree: "Complete Development Program",
        description:
          "I participated in One Bit Code Pro, a complete program that covered Front-End, Back-End, Mobile, Python, Ruby, Ruby on Rails, and No Code.",
      },
    ],
  },
  projects: {
    sectionTitle: "Projects",
    entries: [
      {
        name: "ARC",
        image: { src: "/projects/ICE-B-2.png", alt: "ICE" },
        description:
          "Deep tech startup with a mission to implement AI sustainably and scalably. We offer customized solutions for 3+ B2B and B2C companies in 2 countries.",
        badges: ["B2B", "B2C"],
        primaryActionLabel: "Visit",
        primaryActionHref: "https://arc-corporation.com/",
      },
    ],
  },
  contact: {
    title: "Contact",
    emailLabel: "Email",
    emailValue: "gabrielrm.email@gmail.com",
    businessEmailLabel: "Business Email",
    businessEmailValue: "gabriel@arc-corporation.com",
    linkedinLabel: "LinkedIn",
    linkedinValue:
      "https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/",
    linkedinText: "Visit LinkedIn",
    githubLabel: "GitHub",
    githubValue: "https://github.com/GabrielMendonca1",
    githubText: "Open GitHub",
  },
  footer: {
    quote: {
      text: "Pressure is a privilege.",
    },
    copyright: "© {year} Gabriel®.",
  },
};
