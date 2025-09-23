import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  metadata: {
    title: "Gabriel®",
    description:
      "Gabriel Mendonça - Developer passionate about the beauty of digital minimalism",
  },
  layout: {
    brandName: "Gabriel®",
  },
  header: {
    contactCta: "Contact",
  },
  hero: {
    sectionTitle: "About me",
    paragraphs: [
      "Developer passionate about the beauty of digital minimalism. I believe in the strength of simple solutions, clear visuals, and user experiences that inspire and deliver.",
      "With experience across UX/UI design, front-end, and back-end development, I aim to build products that balance efficiency, accessibility, and visual impact.",
    ],
    signatureAlt: "Gabriel's signature",
    avatarLabel: "Profile icon",
  },
  experience: {
    sectionTitle: "Experience",
    entries: [
      {
        company: "ACCENTURE",
        period: "06/2025",
        role: "Trainee",
        description:
          "As a freelancer at AFPA, I worked in the Social Media and IT divisions. Those experiences helped me strengthen my problem-solving and data-management skills.",
      },
      {
        company: "SYSTEMA",
        period: "06/2024 - 06/2025",
        role: "Trainee",
        description:
          "I have the opportunity to collaborate on large-scale projects and learn from top professionals, building both back-end and front-end solutions for legacy systems and modern applications.",
      },
      {
        company: "WG",
        period: "2021 - 2024",
        role: "Freelancer",
        description:
          "At WG, a footwear representative with over 30 years in the market, I led initiatives such as creating and maintaining a website and building the company's cloud-based backend for data and invoice management.",
      },
    ],
  },
  education: {
    sectionTitle: "Education",
    entries: [
      {
        institution: "UCSAL",
        period: "2021 - 2026/6",
        degree: "Software Engineering",
        description:
          "Software Engineering student at UCSal, an institution recognized for academic excellence and for preparing high-level technology professionals. The program offers a solid foundation in programming, interface design, requirements engineering, testing, agile development, and cybersecurity.",
      },
      {
        institution: "HarvardX CS50x",
        period: "2022 - 2023",
        degree: "Introduction to Computer Science",
        description:
          "I completed Harvard University's renowned CS50x, an intensive introduction to computer science. The course strengthened my ability to solve complex problems through computational thinking, an essential skill for effective software development.",
      },
      {
        institution: "Cultura Inglesa",
        period: "2012 -",
        degree: "Fluent English",
        description:
          "I started learning English at age six in school, completed the Advanced level at Cultura Inglesa, and have continued practicing through international travel and ongoing immersion in the language.",
      },
      {
        institution: "One Bit Code Pro",
        period: "2021 - 2023",
        degree: "Complete Development Program",
        description:
          "I joined the One Bit Code Pro program, a comprehensive track covering Front-End, Back-End, Mobile, Python, Ruby, Ruby on Rails, and No-Code development.",
      },
    ],
  },
  projects: {
    sectionTitle: "Projects",
    entries: [
      {
        name: "Alertpix",
        imageryLabel: "Alertpix interface",
        description:
          "With customizable widgets, straightforward setup, and the lowest fees on the market, Alertpix offers an efficient and affordable way for creators to receive financial support from their communities.",
        badges: ["UI/UX", "Desktop", "Real product"],
        primaryActionLabel: "View on Figma",
        primaryActionHref: "https://example.com/alertpix",
      },
    ],
  },
  contact: {
    title: "Contact",
    emailLabel: "Email",
    emailValue: "gabriel@exemplo.com",
    linkedinLabel: "LinkedIn",
    linkedinValue: "linkedin.com/in/gabriel",
    linkedinText: "View LinkedIn",
    githubLabel: "GitHub",
    githubValue: "github.com/gabriel",
    githubText: "Open GitHub",
  },
};
