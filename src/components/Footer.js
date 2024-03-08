import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a
            href="https://github.com/rachakondadharmendra"
            target="Github"
            className="text-gray-700 mr-3 opacity-80 hover:opacity-100"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/rachakonda-dharmendra/"
            target="Linkedin"
            className="text-gray-700 mr-3 opacity-80 hover:opacity-100"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:rachakondadharmendrainfo@gmail.com"
            className="text-gray-700 mr-3 opacity-80 hover:opacity-100"
          >
            <FaEnvelope />
          </a>
        </div>
        <p className="text-sm text-gray-700 opacity-80 hover:opacity-100">
          &copy; 2024 rachakondadharmendra.info. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;