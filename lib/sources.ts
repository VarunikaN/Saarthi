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
  {
    id: "national-career-service",
    domain: "Benefits",
    effectiveDate: "2026-08-06",
    title: "National Career Service",
    url: "https://www.ncs.gov.in/",
    text: "National Career Service provides official employment-related information, including job-search, career guidance, and employer services. Users should review current service requirements and notices on the official portal.",
  },
  {
    id: "e-shram",
    domain: "Benefits",
    effectiveDate: "2026-08-06",
    title: "e-Shram",
    url: "https://eshram.gov.in/",
    text: "e-Shram provides official information for unorganised workers. Registration, worker records, and related services require verification through the current official e-Shram portal and authorised support channels.",
  },
  {
    id: "pm-kisan",
    domain: "Benefits",
    effectiveDate: "2026-08-06",
    title: "PM-KISAN",
    url: "https://pmkisan.gov.in/",
    text: "PM-KISAN publishes official programme information, beneficiary resources, and service notices for eligible farmer households. Current status and programme requirements must be verified through the official PM-KISAN portal.",
  },
  {
    id: "digilocker",
    domain: "Benefits",
    effectiveDate: "2026-08-06",
    title: "DigiLocker",
    url: "https://www.digilocker.gov.in/",
    text: "DigiLocker is an official digital document wallet and issuer platform. Users should access their documents and issuer records through the official service and confirm document requirements with the requesting organisation.",
  },
];
