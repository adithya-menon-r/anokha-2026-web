export default function TechFairFooter() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-orange-400/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent mb-2">
              Anokha TechFair 2026
            </h3>
            <p className="text-gray-400 text-sm">
              Amrita Vishwa Vidyapeetham, Coimbatore
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">Contact Us</p>
            <a
              href="mailto:anokhatechfair@cb.amrita.edu"
              className="text-orange-300 text-sm hover:text-orange-400 transition-colors duration-200"
            >
              anokhatechfair@cb.amrita.edu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
