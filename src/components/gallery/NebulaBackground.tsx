'use client';
const NebulaBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1.5s' }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
};

export default NebulaBackground;
