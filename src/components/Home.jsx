import { useEffect, useRef, useState } from "react";

const Home = ({ children }) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const characters = "01";
    const fontSize = isMobile ? 12 : window.innerWidth < 1024 ? 14 : 16;
    let columns = Math.floor(window.innerWidth / fontSize);
    dropsRef.current = Array(columns).fill(1);

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", () => {
      setCanvasSize();
      columns = Math.floor(window.innerWidth / fontSize);
      dropsRef.current = Array(columns).fill(1);
    });

    const draw = () => {
      ctx.fillStyle = isMobile ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      dropsRef.current.forEach((drop, i) => {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > window.innerHeight && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }
        dropsRef.current[i]++;
      });
    };

    const interval = setInterval(draw, isMobile ? 50 : 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isMobile]);

  return (
    <div className="relative flex-1 min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full pt-20">
        {children}
      </div>
    </div>
  );
};

export default Home;

