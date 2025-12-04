'use client';
const TitleHeader = () => {
  return (
    <div className="text-center mb-16 relative z-10">
      <h1 className="text-6xl tracking-[0.2em] text-foreground max-md:text-4xl font-bold font-tech uppercase mb-2 relative inline-block">
        <span className="relative z-10 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
          GALLERY
        </span>
        <span className="absolute inset-0 text-orange-500/30 blur-xl">
          GALLERY
        </span>
      </h1>
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <p className="text-foreground/70 text-md font-sans tracking-wide">
          Cosmic Memories Archive
        </p>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default TitleHeader;
