'use client';
const TitleHeader = () => {
  return (
    <div className="text-center mb-20 relative z-10">
      <h1 className="text-6xl tracking-[0.2em] text-foreground max-md:text-4xl font-bold font-tech uppercase mb-2 relative inline-block">
        <span className="relative z-10 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
          GALLERY
        </span>
        <span className="absolute inset-0 text-orange-500/30 blur-xl">
          GALLERY
        </span>
      </h1>
    </div>
  );
};

export default TitleHeader;
