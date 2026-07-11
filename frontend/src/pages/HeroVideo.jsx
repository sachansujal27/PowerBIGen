import video from "../assets/hero-video.mp4";

export default function HeroVideo() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1
          className="
sm:text-5xl
md:text-6xl
lg:text-7xl font-extrabold text-white"
        >
          PowerBI<span className="text-yellow-400">Gen</span>
        </h1>
      </div>
    </div>
  );
}
