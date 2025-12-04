'use client';
const LoadingOrb = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/80 backdrop-blur-sm">
      <div className="relative w-64 h-64">
        <div
          className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-spin"
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className="absolute inset-8 rounded-full border-2 border-blue-500/30 animate-spin"
          style={{ animationDuration: '6s', animationDirection: 'reverse' }}
        ></div>
        <div
          className="absolute inset-16 rounded-full border-2 border-yellow-500/30 animate-spin"
          style={{ animationDuration: '4s' }}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <span className="text-foreground/80 font-tech text-sm tracking-widest">
            INITIALIZING...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOrb;
