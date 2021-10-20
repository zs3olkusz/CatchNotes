import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font bottom-0">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <img className="w-30 h-16 " src={logo} alt="CatchNOTE logo" />
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} CatchNOTE
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500" title="CatchNOTE Facebook">
            <Facebook />
          </a>
          <a className="ml-3 text-gray-500" title="CatchNOTE Twitter">
            <Twitter />
          </a>
          <a className="ml-3 text-gray-500" title="CatchNOTE Instagram">
            <Instagram />
          </a>
          <a className="ml-3 text-gray-500" title="CatchNOTE LinkedIn">
            <Linkedin />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
