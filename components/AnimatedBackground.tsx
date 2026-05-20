'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: Node[] = [];

    const NUM_NODES = isMobile ? 15 : 45;
    const CONNECT_DIST = isMobile ? 100 : 150;
    const MOBILE_SPEED_FACTOR = isMobile ? 0.1 : 0.4;
    const MOBILE_OPACITY = isMobile ? 0.08 : (isDark ? 0.35 : 0.1); // reduced light mode opacity

    const initNodes = () => {
      const newNodes: Node[] = [];
      for (let i = 0; i < NUM_NODES; i++) {
        newNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MOBILE_SPEED_FACTOR,
          vy: (Math.random() - 0.5) * MOBILE_SPEED_FACTOR,
          radius: isMobile ? 1 + Math.random() * 2 : 2 + Math.random() * 3,
          connections: [],
        });
      }
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const dx = newNodes[i].x - newNodes[j].x;
          const dy = newNodes[i].y - newNodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            newNodes[i].connections.push(j);
            newNodes[j].connections.push(i);
          }
        }
      }
      return newNodes;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      nodes = initNodes();
    };

    let time = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear with transparent background in light mode, slight trail in dark mode
      ctx.fillStyle = isMobile 
        ? 'rgba(255, 255, 255, 0)' 
        : isDark ? 'rgba(11, 17, 32, 0.15)' : 'rgba(255, 255, 255, 0)';
      ctx.fillRect(0, 0, width, height);
      
      for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      }
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let connIdx of node.connections) {
          const other = nodes[connIdx];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * MOBILE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isDark ? `rgba(0, 150, 255, ${opacity})` : `rgba(0, 100, 200, ${opacity})`;
            ctx.lineWidth = isMobile ? 0.5 : 1;
            ctx.stroke();
          }
        }
      }
      
      for (let node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(0, 180, 255, ${isMobile ? 0.5 : 0.8})` 
          : `rgba(0, 100, 200, ${isMobile ? 0.3 : 0.4})`;
        ctx.fill();
        if (!isMobile && isDark) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00aaff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        if (!isMobile && isDark) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }
      
      if (!isMobile && isDark) {
        time += 0.02;
        const pulsePos = (time % 1) * CONNECT_DIST;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          for (let connIdx of node.connections) {
            const other = nodes[connIdx];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < CONNECT_DIST) {
              const t = pulsePos / dist;
              if (t < 1) {
                const px = node.x + dx * t;
                const py = node.y + dy * t;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#00ffff';
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.shadowBlur = 0;
              }
            }
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    window.addEventListener('resize', resize);
    resize();
    draw();
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDark, isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500"
      style={{ 
        background: isDark ? '#0B1120' : '#FFFFFF',
        opacity: isMobile ? 0.4 : 1,
      }}
    />
  );
}