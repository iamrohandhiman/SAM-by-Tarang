import React, { useEffect, useRef } from 'react';

export const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    // Load Fabric.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.async = true;
    
    script.onload = () => {
      initCanvas();
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  const initCanvas = () => {
    // Create a Fabric.js canvas
    fabricRef.current = new fabric.Canvas('fabric-holder');
    const canvas = fabricRef.current;

    // Define the points for the polygon
    const points = [
      19.206210184668198, 72.87420292877489,
      19.205979688860328, 72.87419219993883,
      19.20597462301477, 72.87458112024599,
      19.20596195840019, 72.87497272276217
    ];

    // Find the min and max values
    const minLat = Math.min(...points.filter((_, i) => i % 2 === 0));
    const maxLat = Math.max(...points.filter((_, i) => i % 2 === 0));
    const minLng = Math.min(...points.filter((_, i) => i % 2 !== 0));
    const maxLng = Math.max(...points.filter((_, i) => i % 2 !== 0));

    // Normalize the points
    const normalizedPoints = [];
    for (let i = 0; i < points.length; i += 2) {
      const lat = points[i];
      const lng = points[i + 1];
      const y = canvas.height - (((lat - minLat) / (maxLat - minLat)) * canvas.height);
      const x = ((lng - minLng) / (maxLng - minLng)) * canvas.width;
      normalizedPoints.push({ x, y });
    }

    // Draw the polygon
    const polygon = new fabric.Polygon(normalizedPoints, {
      fill: 'rgba(0, 0, 255, 0.2)',
      stroke: 'blue',
      strokeWidth: 2
    });
    canvas.add(polygon);

    // Box properties
    const boxWidth = 20;
    const boxHeight = 40;
    const spacing = 10;

    // Helper function to check if point is in polygon
    const isPointInPolygon = (x, y, polyPoints) => {
      let inside = false;
      for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        const xi = polyPoints[i].x, yi = polyPoints[i].y;
        const xj = polyPoints[j].x, yj = polyPoints[j].y;
        const intersect = ((yi > y) !== (yj > y)) &&
                         (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Helper function to check if box is inside polygon
    const isBoxCompletelyInside = (x, y, width, height, polyPoints) => {
      return isPointInPolygon(x, y, polyPoints) &&
             isPointInPolygon(x + width, y, polyPoints) &&
             isPointInPolygon(x, y + height, polyPoints) &&
             isPointInPolygon(x + width, y + height, polyPoints);
    };

    // Place boxes in grid
    for (let x = 0; x < canvas.width; x += boxWidth + spacing) {
      for (let y = 0; y < canvas.height; y += boxHeight + spacing) {
        if (isBoxCompletelyInside(x, y, boxWidth, boxHeight, normalizedPoints)) {
          const box = new fabric.Rect({
            left: x,
            top: y,
            width: boxWidth,
            height: boxHeight,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 0.5,
            hasControls: true,
            hasBorders: true
          });
          canvas.add(box);
        }
      }
    }
  };

  const addBox = () => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const boxWidth = 20;
    const boxHeight = 40;
    const x = Math.random() * (canvas.width - boxWidth);
    const y = Math.random() * (canvas.height - boxHeight);
    
    const box = new fabric.Rect({
      left: x,
      top: y,
      width: boxWidth,
      height: boxHeight,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 1,
      opacity: 0.5,
      hasControls: true,
      hasBorders: true
    });

    canvas.add(box);
    canvas.renderAll();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <button 
        onClick={addBox}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add Box
      </button>
      <canvas 
        ref={canvasRef}
        id="fabric-holder" 
        width="500" 
        height="400" 
        className="border border-gray-300 rounded"
      />
    </div>
  );
};

