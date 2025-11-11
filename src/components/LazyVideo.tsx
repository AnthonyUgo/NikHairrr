import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  style?: React.CSSProperties;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function LazyVideo({
  src,
  poster,
  style,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  // Load and play video when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || isLoaded) return;

    video.src = src;
    video.load();
    setIsLoaded(true);

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay failed, user interaction needed
        console.log('Autoplay prevented');
      });
    }
  }, [isInView, src, autoPlay, isLoaded]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      style={style}
      className={className}
      autoPlay={false} // Control autoplay via useEffect
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none"
    />
  );
}
