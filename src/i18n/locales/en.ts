import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  metadata: {
    title: "Gabriel®",
    description: "New person, same old mistakes.",
  },
  layout: {
    brandName: "Gabriel",
  },
  header: {
    contactCta: "Contact",
  },
  hero: {
    paragraphs: [
      "I am moved by ideas, by nature, and by the human spark that emerges in authentic encounters. I carry with me values of honesty and respect, along with a constant desire to inspire others – I do not accept mediocrity, neither mine nor anyone’s.",
      "It is in genuine cooperation, in building projects that matter, and in real moments with those I love that I find my sense of being alive."
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
        period: "06/2025",
        role: "Trainee",
        description:
          "I work in one of the largest global consulting firms, with more than 600 thousand employees in 120+ countries, where I develop innovative technological solutions in a truly multicultural environment. I have solid experience in development methodologies for the industry and direct collaboration with international clients, delivering results that drive the digital transformation of businesses.",
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
        period: "06/2024 - 06/2025",
        role: "Trainee",
        description:
          "I participated in projects for large companies, learning directly from highly experienced professionals. I worked across a wide range of systems, from legacy applications to modern solutions, building a strong foundation in software development for Automation and Manufacturing in the industry with SAP.",
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
          "At WG, a footwear representative company with over 30 years in the market, I had the opportunity to work on projects such as creating and maintaining a website, as well as developing cloud-based internal systems, building a backend structure for data and invoice management.",
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
        institution: "UCSAL",
        period: "2021 - 2026/6",
        degree: "Software Engineering",
        description:
          "Software Engineering at UCSal, an institution recognized for academic excellence and the preparation of highly qualified technology professionals. The course provides a solid foundation in programming, interface design, requirements engineering, testing, agile development, and cybersecurity.",
      },
      {
        institution: "HarvardX CS50x",
        period: "2022 - 2023",
        degree: "Introduction to Computer Science",
        description:
          "I completed the CS50x course from Harvard University, an intensive and globally recognized introduction to Computer Science. The course strengthened my ability to solve complex problems through computational thinking, an essential skill for effective software development.",
      },
      {
        institution: "Cultura Inglesa",
        period: "2012 -",
        degree: "Fluent English",
        description:
          "I began learning English at age 6 during school, completed the Advanced level at Cultura Inglesa, and improved my language skills through international travel, maintaining continuous contact with English.",
      },
      {
        institution: "One Bit Code Pro",
        period: "2021 - 2023",
        degree: "Complete Development Program",
        description:
          "I participated in the One Bit Code Pro program, a complete track covering Front-End, Back-End, Mobile, Python, Ruby, Ruby on Rails, and No Code.",
      },
    ],
  },
  projects: {
    sectionTitle: "Projects",
    entries: [
      {
        name: "ICE",
        image: { src: '/projects/ICE-B-2.png', alt: 'ICE Homepage' },
        description:
          "Deep tech startup with the mission of implementing AI strategically and at scale. We deliver customized solutions for 3+ B2B and B2C companies across 2 countries.",
        badges: ["B2B", "B2C"],
        primaryActionLabel: "View",
        primaryActionHref: "https://iceoficial.com/",
      },
      {
        name: "Omni",
        image: { src: '/projects/Omni-B-2.png', alt: 'Omni Homepage' },
        description:
          "AI agent ecosystem that democratizes access to artificial intelligence. We combine multiple models and specialized tools in a single intuitive interface, serving 1000+ users with practical solutions.",
        badges: ["AI", "Agents"],
        primaryActionLabel: "Try",
        primaryActionHref: "https://omni-xi.vercel.app/",
      },
    ],
  },
  contact: {
    title: "Contact",
    emailLabel: "Email",
    emailValue: "gabrielrm.email@gmail.com",
    linkedinLabel: "LinkedIn",
    linkedinValue: "https://www.linkedin.com/in/gabriel-ribeiro-mendon%C3%A7a-910692269/",
    linkedinText: "Visit LinkedIn",
    githubLabel: "GitHub",
    githubValue: "github.com/gabriel",
    githubText: "Open GitHub",
  },
  footer: {
    quote: {
      text: "Imagination is the fuel that drives every line of code.",
      author: "Gabriel Ribeiro Mendonça",
    },
    copyright: "© {year} Gabriel®. All rights reserved.",
  },
};
