import { IconBrandDiscord } from "@tabler/icons-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold text-white">CreoYT</h2>
            <p className="mt-4 text-gray-400">
              Your ultimate YouTube content assistant. Boost your channel’s growth with AI-powered tools, analytics, and management solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <p className="mt-4 text-gray-400">Stay connected on our social platforms:</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://discord.gg/tV6UKHspsZ" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <IconBrandDiscord />
              </a>
              <a href="https://github.com/SH20RAJ/creoyt" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.18c-3.34.73-4.04-1.44-4.04-1.44-.54-1.37-1.32-1.73-1.32-1.73-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.77-1.6-2.66-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.28-1.56 3.3-1.24 3.3-1.24.66 1.69.24 2.94.12 3.25.77.84 1.24 1.92 1.24 3.24 0 4.63-2.82 5.66-5.5 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sh20raj/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.45 20.45h-3.76v-5.43c0-1.3-.02-2.96-1.81-2.96-1.81 0-2.09 1.42-2.09 2.89v5.5h-3.76V8.74h3.61v1.6h.05c.5-.94 1.72-1.93 3.54-1.93 3.79 0 4.49 2.5 4.49 5.75v6.29zM5.34 7.14a2.17 2.17 0 1 1-.02-4.33 2.17 2.17 0 0 1 .02 4.33zM7.22 20.45H3.45V8.74h3.77v11.71zM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44C23.2 24 24 23.2 24 22.22V1.78C24 .8 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CreoYT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
