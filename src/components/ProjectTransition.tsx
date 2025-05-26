"use client"
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const transitionDuration = 1.2; // seconds

interface ProjectTransitionProps {
  children: React.ReactNode;
}

const ProjectTransition: React.FC<ProjectTransitionProps> = ({ children }) => {
  const [showTransition, setShowTransition] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowTransition(true);

    if (overlayRef.current && textRef.current) {
      gsap.set(overlayRef.current, { x: "-100%", opacity: 1 });
      gsap.set(textRef.current, { scale: 1, opacity: 1 });
      gsap.timeline()
        .to(overlayRef.current, {
          x: "0%",
          duration: 0.3,
          ease: "power2.out",
        })
        // Animate text
        .to(textRef.current, {
          scale: 1.15,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        }, "-=0.3")
        // Fade out overlay
        .to(overlayRef.current, {
          opacity: 0,
          duration: transitionDuration,
          ease: "power2.inOut",
          onComplete: () => setShowTransition(false),
        }, "+=0.2");
    }
  }, []);

  return (
    <>
      {children}
      {showTransition && (
        <div
          ref={overlayRef}
          className="gsap-project-transition-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "linear-gradient(120deg, #1e293b 0%, #0ea5e9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <div
            ref={textRef}
            style={{
              color: "#fff",
              fontSize: "2rem",
              letterSpacing: "0.1em",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Loading Project...
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectTransition;