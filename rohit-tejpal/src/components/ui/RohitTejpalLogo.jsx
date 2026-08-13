import React from 'react';

export default function RohitTejpalLogo({ className = "", variant = "horizontal" }) {
  // A beautiful highly stylized bodhi tree path 
  const treeTrunk = "M 245,110 L 255,110 L 253,60 C 260,50 270,40 280,30 C 270,30 255,40 252,50 L 250,15 L 248,50 C 245,40 230,30 220,30 C 230,40 240,50 247,60 Z";
  
  // Generating a beautiful array of leaves for the tree
  const generateLeaves = () => {
    const leaves = [];
    const positions = [
      [250, 5], [240, 15], [260, 15], [230, 25], [250, 25], [270, 25],
      [220, 35], [240, 35], [260, 35], [280, 35],
      [210, 45], [230, 45], [250, 45], [270, 45], [290, 45],
      [215, 55], [235, 55], [265, 55], [285, 55],
      [225, 65], [245, 65], [255, 65], [275, 65]
    ];
    
    positions.forEach((pos, i) => {
      // stylized peepal leaf shape
      leaves.push(
        <path key={i} d={`M ${pos[0]},${pos[1]} C ${pos[0]-6},${pos[1]-8} ${pos[0]+6},${pos[1]-8} ${pos[0]},${pos[1]+4} Z`} fill="currentColor" />
      );
    });
    return leaves;
  };

  // Simplified elegant deer path facing center
  const deerLeft = "M 200,105 Q 205,85 200,75 L 195,65 Q 205,70 205,75 Q 215,70 220,85 L 225,105 L 220,110 L 215,110 L 218,100 L 210,100 L 205,110 L 200,110 Z";
  const deerRight = "M 300,105 Q 295,85 300,75 L 305,65 Q 295,70 295,75 Q 285,70 280,85 L 275,105 L 280,110 L 285,110 L 282,100 L 290,100 L 295,110 L 300,110 Z";

  // If the variant is horizontal (Navbar)
  if (variant === 'horizontal') {
    return (
      <svg
        className={className}
        viewBox="30 0 540 90"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Rohit Tejpal"
        role="img"
      >
        <g transform="translate(-160, -25)">
          <path d={treeTrunk} fill="currentColor" />
          {generateLeaves()}
          <path d={deerLeft} fill="currentColor" />
          <path d={deerRight} fill="currentColor" />
          {/* Base */}
          <rect x="220" y="110" width="60" height="4" fill="currentColor" />
        </g>
        
        <text
          x="160"
          y="48"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="38"
          fontWeight="600"
          letterSpacing="0.15em"
          fill="currentColor"
        >
          ROHIT TEJPAL
        </text>

        <text
          x="160"
          y="76"
          fontFamily="'Noto Serif Devanagari', serif"
          fontSize="16"
          fontWeight="500"
          letterSpacing="0.08em"
          fill="currentColor"
        >
          यत् भावो - तत् भवति
        </text>
      </svg>
    );
  }

  // Full variant (Mobile menu or footer)
  return (
    <svg
      className={className}
      viewBox="0 0 500 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rohit Tejpal"
      role="img"
    >
      <g transform="translate(0, -10)">
        <path d={treeTrunk} fill="currentColor" />
        {generateLeaves()}
        <path d={deerLeft} fill="currentColor" />
        <path d={deerRight} fill="currentColor" />
        {/* Base */}
        <rect x="230" y="110" width="40" height="4" fill="currentColor" />
      </g>
      
      <text
        x="250"
        y="150"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="40"
        fontWeight="600"
        letterSpacing="0.15em"
        fill="currentColor"
      >
        ROHIT TEJPAL
      </text>

      <text
        x="250"
        y="185"
        textAnchor="middle"
        fontFamily="'Noto Serif Devanagari', serif"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0.1em"
        fill="currentColor"
      >
        यत् भावो - तत् भवति
      </text>
    </svg>
  );
}
