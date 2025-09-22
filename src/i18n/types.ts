export type ExperienceEntry = {
  company: string;
  period: string;
  role: string;
  description: string;
};

export type EducationEntry = {
  institution: string;
  period: string;
  degree: string;
  description: string;
};

export type ProjectEntry = {
  name: string;
  imageryLabel: string;
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
    sectionTitle: string;
    paragraphs: string[];
    signatureAlt: string;
    avatarLabel: string;
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
    githubLabel: string;
    githubValue: string;
  };
};
