export type ExperienceEntry = {
  company: string;
  period: string;
  role: string;
  description: string;
  companyHref?: string;
  logo?: {
    src: string;
    alt: string;
  };
  country?: {
    src: string;
    alt: string;
  };
};

export type EducationEntry = {
  institution: string;
  period: string;
  degree: string;
  description: string;
};

export type ProjectEntry = {
  name: string;
  image: { src: string; alt: string };
  description: string;
  badges: string[];
  primaryActionLabel: string;
  primaryActionHref?: string;
};

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  layout: {
    brandName: string;
  };
  header: {
    contactCta: string;
  };
  hero: {
    paragraphs: string[];
    signatureAlt: string;
    avatarLabel: string;
    avatarImage?: {
      src: string;
      alt: string;
    };
  };
  experience: {
    sectionTitle: string;
    entries: ExperienceEntry[];
  };
  education: {
    sectionTitle: string;
    entries: EducationEntry[];
  };
  projects: {
    sectionTitle: string;
    entries: ProjectEntry[];
  };
  contact: {
    title: string;
    emailLabel: string;
    emailValue: string;
    linkedinLabel: string;
    linkedinValue: string;
    linkedinText?: string;
    githubLabel: string;
    githubValue: string;
    githubText?: string;
  };
  footer: {
    quote: {
      text: string;
      author?: string;
    };
    copyright: string;
  };
};
