import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

const brand_icons = {
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Facebook"
      className="lucide lucide-facebook-icon lucide-facebook"
    >
      <title>Facebook</title>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Twitter"
      className="lucide lucide-twitter-icon lucide-twitter"
    >
      <title>Twitter</title>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Instagram"
      className="lucide lucide-instagram-icon lucide-instagram"
    >
      <title>Instagram</title>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="LinkedIn"
      className="lucide lucide-linkedin-icon lucide-linkedin"
    >
      <title>LinkedIn</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Youtube"
      className="lucide lucide-youtube-icon lucide-youtube"
    >
      <title>Youtube</title>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
};

const SOCIAL_LINKS = [
  { icon: brand_icons.facebook, href: 'https://www.facebook.com/anokha.amrita/' },
  { icon: brand_icons.twitter, href: 'https://twitter.com/anokha_avvp_cbe' },
  { icon: brand_icons.instagram, href: 'https://www.instagram.com/anokhatechfest/' },
  { icon: brand_icons.linkedin, href: 'https://www.linkedin.com/school/anokha-amrita/' },
  { icon: brand_icons.youtube, href: 'https://www.youtube.com/@AnokhaTechfest' },
];

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'TEAM', href: '' }, // REQUIRES ROUTE
  { label: 'PRIVACY POLICY', href: '' }, // REQUIRES ROUTE
];

const Footer = () => {
  return (
    <footer className="relative h-1/2 footer-font bg-black w-full">
      <div className="flex flex-wrap p-8 space-x-4 lg:justify-center md:justify-center ">
        <div className="p-6 md:justify-center ">
          <Image src="/images/footer-image.webp" alt="footerImage" width={600} height={600} />
        </div>

        <div className="pl-4 pr-4 pb-4 block ">
          <h1 className="text-white text-5xl">REACH OUT TO US!</h1>
          <h6 className="text-gray-600">Feel free to reach out to us if you have any queries</h6>

          <div className="mt-7">
            <Link
              href="mailto:anokhapr@cb.amrita.edu"
              className="text-white text-xl flex items-center gap-2 hover:gap-4 transition-all duration-500 lg:text-2xl"
            >
              anokhapr@cb.amrita.edu
              <ArrowRight size={20} className="mt-1.5" />
            </Link>
          </div>

          <div className="mt-5 flex flex-col md:flex-row lg:flex-row flex-wrap justify-right gap-2 lg:justify-between md:justify-between">
            {/* Address */}
            <div className="mt-3">
              <h2 className="text-white font-bold">OUR ADDRESS</h2>
              <Link
                href="https://maps.app.goo.gl/MyE1VW4u4jWdxhco9"
                target="_blank"
                className="text-gray-400 hover:text-white flex items-center"
              >
                Amrita Vishwa Vidyapeetham
                <MapPin size={16} className="ml-2" />
              </Link>
              <p className="text-gray-500 text-sm">Coimbatore Campus</p>
              <p className="text-gray-500 text-sm">Amritanagar</p>
              <p className="text-gray-500 text-sm">Coimbatore - 641 112</p>
              <p className="text-gray-500 text-sm">Tamilnadu, India</p>
            </div>

            {/* Social & Extra */}
            <div className="mt-3 md:pl-10">
              <h2 className="text-white font-bold">FOLLOW US</h2>
              <div className="flex flex-wrap justify-between mt-1 w-28">
                {SOCIAL_LINKS.map(({ icon, href }) => (
                  <Link key={href} href={href} target="_blank">
                    <div className="text-gray-600 hover:text-white">{icon}</div>
                  </Link>
                ))}
              </div>

              <div className="block mt-5 space-y-2">
                <div className="flex items-center hover:font-normal hover:text-white">
                  <Link
                    href="https://www.amrita.edu"
                    target="_blank"
                    className="text-gray-400 font-normal hover:font-normal hover:text-white"
                  >
                    AMRITA.EDU
                  </Link>
                  <ArrowUpRight size={16} className="ml-1 text-gray-500 hover:scale-120" />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-3 text-white block space-y-1 md:pl-12">
              {NAV_LINKS.map(({ label, href }) => {
                return (
                  <div key={label} className="flex items-center text-gray-400 hover:text-white">
                    <Link href={href}>{label}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="md:justify-center sm:justify-center">
          <Image src="/images/Amrita-Logo.webp" alt="footerImage" width={300} height={300} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
