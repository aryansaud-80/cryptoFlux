const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center px-6 py-4">
        <a
          href="/"
          className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent"
        >
          CryptoFlux
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
