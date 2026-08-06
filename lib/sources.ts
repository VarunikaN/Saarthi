export type Source = {
  id: string;
  domain: "Scholarships" | "Benefits" | "Health insurance";
  effectiveDate: string;
  text: string;
  title: string;
  url: string;
};

export const sources: Source[] = [
  {
    id: "national-scholarship-portal",
    domain: "Scholarships",
    effectiveDate: "2026-08-06",
    title: "National Scholarship Portal",
    url: "https://scholarships.gov.in/",
    text: "The National Scholarship Portal is the Government of India portal for scholarship application services. Applicants should use the current portal notices, scheme information, eligibility conditions, timelines, and required-document guidance before applying.",
  },
  {
    id: "myscheme",
    domain: "Benefits",
    effectiveDate: "2026-08-06",
    title: "myScheme",
    url: "https://www.myscheme.gov.in/",
    text: "myScheme is a Government of India platform that helps people discover schemes and directs them to official application information. Scheme requirements, application availability, and eligibility can change, so users should verify details on the linked official page.",
  },
  {
    id: "pmjay",
    domain: "Health insurance",
    effectiveDate: "2026-08-06",
    title: "Ayushman Bharat PM-JAY",
    url: "https://pmjay.gov.in/",
    text: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana provides official information about the scheme, beneficiary services, and help channels. Coverage and beneficiary status must be verified through official PM-JAY tools or authorised support, not inferred from a chat response.",
  },
  {
    id: "nha-beneficiary",
    domain: "Health insurance",
    effectiveDate: "2026-08-06",
    title: "National Health Authority beneficiary resources",
    url: "https://nha.gov.in/",
    text: "The National Health Authority publishes official PM-JAY resources and programme information. Users seeking hospitalisation coverage or beneficiary support should rely on current National Health Authority and PM-JAY channels for confirmation.",
  },
];
