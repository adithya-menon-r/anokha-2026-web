'use client';

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Decorative Glows */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px]" />

          <div className="relative bg-gradient-to-br from-gray-900/50 via-orange-950/10 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-1.5 h-20 bg-gradient-to-b from-orange-500 via-amber-500 to-transparent rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-widest uppercase bg-gradient-to-r from-orange-200 via-amber-300 to-orange-100 bg-clip-text text-transparent"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                About
              </h2>
            </div>

            <div
              className="space-y-8 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p>
                Anokha TechFair & Exhibitions 2026 serves as a{' '}
                <span className="text-orange-400 font-semibold border-orange-400/30 pb-0.5">
                  collaborative platform
                </span>{' '}
                that brings together students from colleges and schools across
                the country to showcase innovation, creativity, and applied
                technology.
              </p>

              <p>
                It offers participants the opportunity to present their work to{' '}
                <span className="text-amber-400 font-semibold italic">
                  industry professionals, academicians, and visitors
                </span>{' '}
                from different backgrounds, fostering knowledge exchange,
                exposure, and professional growth through meaningful
                interaction.
              </p>

              <p>
                TechFair and Exhibitions segment stands as one of the core
                highlights of the Anokha ecosystem at{' '}
                <span className="text-orange-300 font-semibold">
                  Amrita Vishwa Vidyapeetham, Coimbatore
                </span>
                . Over the years, it has evolved into a vibrant space where
                ideas move beyond concepts and take shape as working models,
                prototypes, and software solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
