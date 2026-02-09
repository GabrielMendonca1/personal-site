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
      "I am driven by ideas, nature, and the human spark in authentic encounters. I carry with me values of honesty and respect, and a constant desire to inspire others – I do not accept mediocrity.",
      "It is in genuine cooperation, creating projects that matter, and in real moments with those I love that I find my meaning of being alive.",
    ],
    signatureAlt: "Signature",
    avatarLabel: "Profile icon",
    avatarImage: {
      src: "/profile2.jpeg",
      alt: "Photo",
    },
  },
  experience: {
    sectionTitle: "Experience",
    entries: [
      {
        company: "ACCENTURE",
        period: "06/2025 - Present",
        role: "Systems Developer",
        description:
          "Today I work as a systems developer at Accenture, one of the largest global IT and digital transformation consultancies (over 600k employees in 120+ countries), where I create solutions using SAP and various other technologies.",
        companyHref: "https://www.accenture.com/",
        logo: {
          src: "/logos/accenture.svg",
          alt: "Accenture Logo",
        },
        country: {
          src: "/flags/european-union.svg",
          alt: "European Union Flag",
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
