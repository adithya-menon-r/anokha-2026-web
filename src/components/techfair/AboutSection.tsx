export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px]" />
          <div className="relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-16 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
                About
              </h2>
            </div>
            <div className="space-y-6 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
              <p>
                Anokha TechFair & Exhibitions 2026 serves as a{' '}
                <span className="text-orange-300 font-semibold">
                  collaborative platform
                </span>{' '}
                that brings together students from colleges and schools across
                the country to showcase innovation, creativity, and applied
                technology.
              </p>
              <p>
                It offers participants the opportunity to present their work to{' '}
                <span className="text-amber-300 font-semibold">
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
