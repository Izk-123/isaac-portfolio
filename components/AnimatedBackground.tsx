'use client';

import { useEffect, useRef } from 'react';
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
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: Node[] = [];

    const NUM_NODES = 45;
    const CONNECT_DIST = 150;

    const initNodes = () => {
      const newNodes: Node[] = [];
      for (let i = 0; i < NUM_NODES; i++) {
        newNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 2 + Math.random() * 3,
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
      
      // Clear with theme-appropriate background
      ctx.fillStyle = isDark ? 'rgba(11, 17, 32, 0.15)' : 'rgba(248, 250, 252, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      // Update positions
      for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      }
      
      // Draw connections – color based on theme
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let connIdx of node.connections) {
          const other = nodes[connIdx];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * (isDark ? 0.35 : 0.15);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isDark ? `rgba(0, 150, 255, ${opacity})` : `rgba(0, 100, 200, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      for (let node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(0, 180, 255, 0.8)' : 'rgba(0, 100, 200, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDark ? '#00aaff' : '#0055aa';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#ffffff' : '#333333';
        ctx.fill();
      }
      
      // Pulse wave
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
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? '#00ffff' : '#0066cc';
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
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
  }, [isDark]); // re-run when theme changes
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: isDark ? '#0B1120' : '#F8FAFC' }}
    />
  );
}