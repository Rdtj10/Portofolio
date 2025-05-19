const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="mb-4 text-sm">© {new Date().getFullYear()} Ridho Dimas Tri Prasetyo Jayadi. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;