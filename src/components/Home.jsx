import { useEffect, useRef, useState } from "react";

const Home = ({ children }) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(pixelRatio, pixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const characters = "01";
    // Responsive font size based on screen width
    const fontSize = isMobile ? 12 : window.innerWidth < 1024 ? 14 : 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Reduced opacity on mobile for better performance
      ctx.fillStyle = isMobile ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((drop, i) => {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    };

    // Slower animation on mobile for better performance
    const animationSpeed = isMobile ? 50 : 33;
    const interval = setInterval(draw, animationSpeed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isMobile]);

  return (
    <div className="relative flex-1 min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default Home;
