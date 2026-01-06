export default function TechFairContact() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-full px-6 py-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-400/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-6 flex-col sm:flex-row">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div
                className="hidden lg:block text-amber-50 mt-3 font-extrabold text-2xl lg:text-3xl"
                style={{ fontFamily: 'SPINC' }}
              >
                aNOkHa 2026
              </div>

              <div className="font-outerspaceMilitia text-2xl md:text-3xl mb-1 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)] font-[900] tracking-tight text-center sm:text-left">
                Techfair
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <a
                href="mailto:anokhatechfair@cb.amrita.edu"
                className="mt-3 sm:mt-0 inline-block w-full sm:w-auto text-center bg-orange-600/10 text-orange-300 font-semibold text-lg sm:text-xl px-4 py-2 rounded-lg hover:bg-orange-600/20 transition-colors duration-200"
              >
                anokhatechfair@cb.amrita.edu
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
