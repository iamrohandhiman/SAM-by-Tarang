import React, { useEffect, useRef, useState } from 'react';

export const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [points, setPoints] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  let count = 0
  function convertToNumbers(selectedPoints) {
    return selectedPoints
      .map(point => point.split(',').map(Number))
      .flat();
  }

  useEffect(() => {
    // Load Fabric.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.async = true;
    
    script.onload = () => {
      setIsInitialized(true);
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  // Separate useEffect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/get');
        const data = await response.json();
        const coordinates = convertToNumbers(data.selectedPoints);
        setPoints(coordinates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isInitialized) {
      fetchData();
    }
  }, [isInitialized]);

  // Separate useEffect for canvas initialization
  useEffect(() => {
    if (isInitialized && points.length > 0) {
      initCanvas();
    }
  }, [isInitialized, points]);

  const initCanvas = () => {
    fabricRef.current = new fabric.Canvas('fabric-holder');
    const canvas = fabricRef.current;

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

    // Add measurements between points
    for (let i = 0; i < normalizedPoints.length; i++) {
      const current = normalizedPoints[i];
      const next = normalizedPoints[(i + 1) % normalizedPoints.length];
      
      // Calculate distance and midpoint
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      const distance = Math.sqrt(dx * dx + dy * dy).toFixed(2);
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      
      // Add measurement text
      const text = new fabric.Text(`${distance}`, {
        left: midX,
        top: midY,
        fontSize: 12,
        fill: 'black',
        backgroundColor: 'white'
      });
      canvas.add(text);
    }

    drawBoxes(canvas, normalizedPoints);
  };

  const drawBoxes = (canvas, normalizedPoints) => {
    // Clear existing boxes
    const objects = canvas.getObjects();
    objects.forEach(obj => {
      if (obj.type === 'rect') {
        canvas.remove(obj);
      }
    });

    // Box properties
    const boxWidth = isHorizontal ? pw : ph;
    const boxHeight = isHorizontal ? ph : pw;
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
          count++;
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
    canvas.renderAll();
  
  };

  const addBox = () => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const boxWidth = isHorizontal ? 40 : 20;
    const boxHeight = isHorizontal ? 20 : 40;
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

  const toggleDirection = () => {
    setIsHorizontal(!isHorizontal);
    if (fabricRef.current) {
      const normalizedPoints = fabricRef.current.getObjects('polygon')[0]?.points;
      if (normalizedPoints) {
        drawBoxes(fabricRef.current, normalizedPoints);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <button 
          onClick={addBox}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Box
        </button>
        <button 
          onClick={toggleDirection}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {isHorizontal ? 'Switch to Vertical' : 'Switch to Horizontal'}
        </button>
      </div>
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
