import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faWhatsapp,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center text-sm text-gray-700 dark:text-gray-200 py-6 mt-12 relative z-10">
      <p className="mb-3 font-medium drop-shadow-sm">
        © {new Date().getFullYear()} Developer FullStack -||- Rifki-Alaziz.
      </p>

      <div className="flex justify-center space-x-6 text-xl">
        <a
          href="https://instagram.com/rifki_alaziz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition"
          title="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://wa.me/62859269692"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600 transition"
          title="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a
          href="https://x.com/rifki_alaziz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
          title="X (Twitter)"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a
          href="https://youtube.com/rumahanime"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-600 transition"
          title="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
