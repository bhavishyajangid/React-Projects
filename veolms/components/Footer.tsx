export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">VeoLMS</h3>
            <p className="text-gray-400">
              Empowering learners worldwide with affordable, high-quality education.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-2">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-2">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Student Success Stories</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0a4 4 0 00-4 4c0 2.61 1.75 4.74 4 5.47V13.5h-2.5V10H9V6.75C9 5.56 9.91 5 11 5h1.5v5H11v2h2.5l.61-3.5H11V8.58c0-.65.04-1.15.11-1.65H14V5h-2c-1.1 0-2 .67-2 1.5V8h-1.5l-.39-2H12V2c0-.83.32-1.5 1-1.5z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.004 9.055a8.965 8.965 0 00-1.532 1.898L5.005 8.824c-.396-.09-.76-.203-1.089-.35a8.96 8.96 0 00-1.258.99l-.097.22a8.96 8.96 0 00-1.283 1.59l.371.51c-.34.49-.53 1.11-.53 1.76v1.21a8.93 8.93 0 001.53 2.92l2.158-.806c.38-.14.85-.22 1.309-.22 1.042 0 2.04-.31 2.912-.83a4.49 4.49 0 001.27-1.81l-.386-1.06a4.48 4.48 0 00-.38-1.25h1.96l.36-1.01c.21-.59.31-1.23.31-1.89V9.1a4.49 4.49 0 00-1.33-1.77l-.386-1.06a4.48 4.48 0 00-.44-1.3h-2.08l-.37 1.02c-.15.42-.25.89-.25 1.39v.52a4.49 4.49 0 00-.57 1.26l-.98.35c-.49-.18-1.03-.28-1.58-.28z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 2a4 4 0 00-4 4v1c0 2.61 1.75 4.74 4 5.45V16a2 2 0 002 2h6a2 2 0 002-2v-2.55c2.24-.71 4-2.84 4-5.45V6a4 4 0 00-4-4zm0 9a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l1.242.812a1 1 0 00-.34 1.63l-1.22 1.84a4 4 0 00-3.54 2.06l-1.38-1.04a1 1 0 00-1.28-.02l-.9 1.52a1 1 0 101.48-.45l.8 1.17 0 01-.57-1.75L2.75 8H2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} VeoLMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}