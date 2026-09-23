// Keep replaceable public assets centralized so components never hard-code paths.
export const PROFILE_IMAGE = "/images/rahulbhati.png";
export const CERTIFICATE_IMAGE = "/images/rahul-certificate.png";
export const LOGO_IMAGE = "/images/rahul-logo.png";

const EMAIL_SUBJECT = "Website Project Inquiry";
const EMAIL_BODY = `Hi Rahul,

I would like to discuss a website project with you.

Project I want to build:

Budget:

Reference website:

Thank you.`;

export const PROJECT_INQUIRY_MAILTO = `mailto:rahulbhatidevelopment@gmail.com?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`;

export const PROJECT_IMAGES = {
  granthLaptopHub: "/images/projects/granth-laptop-hub.png",
  architecturalRenovation: "/images/projects/architectural-renovation.png",
  jaiJinendraCollection: "/images/projects/jai-jinendra-collection.png",
} as const;

export const PROJECT_URLS = {
  granthLaptopHub: "https://granthlaptophubjaipur.vercel.app",
  architecturalRenovation: "https://canada-client-website.vercel.app",
  jaiJinendraCollection: "https://jay-jinendra-collectiondemo.vercel.app",
} as const;