import React, { useState } from 'react';

const BeamAnalyzer = () => {
  const [span, setSpan] = useState(6000);
  const [loads, setLoads] = useState([10, 20]);
  const [beamDepth, setBeamDepth] = useState(230);
  const [beamWidth, setBeamWidth] = useState(230);
  const [result, setResult] = useState(null);

  const calculateBeam = () => {
    const loadsPerMeter = loads.map(load => load / span);

    const effectiveDepth = span / beamDepth;
    const totalDepth = effectiveDepth + 16 / 2 + 25;
    let width = totalDepth / 1.5;
    if (width < 200) width = 200; // Minimum width constraint

    const widthToDepthRatio = width / totalDepth;
    const depthConstraint = span / 4;

    const isSafe = widthToDepthRatio > 0.3 && totalDepth <= depthConstraint;

    setResult({
      reinforcement: 'Calculated reinforcement', // Replace with actual calculation
      isSafe: isSafe,
      depth: totalDepth,
      width: width
    });
  };

  const drawBeam = () => {
    if (!result) return;
  
    const beamWidth = result.width;
    const svgWidth = span + 100; // Adjusted width
  
    const beamSVG = (
      <svg width={`${svgWidth}px`} height="200">
        <rect x="50" y="50" width={span} height={beamWidth} fill="gray" />
        <line x1="50" y1="100" x2={span + 50} y2="100" stroke="black" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="150" stroke="black" strokeWidth="2" />
        <line x1={span + 50} y1="50" x2={span + 50} y2="150" stroke="black" strokeWidth="2" />
      </svg>
    );
  
    return beamSVG;
  };
  

  return (
    <div>
      <label>
        Span (mm):
        <input type="number" value={span} onChange={(e) => setSpan(e.target.value)} />
      </label>
      <br />
      <label>
        Loads (kN):
        <input type="text" value={loads.join(', ')} onChange={(e) => setLoads(e.target.value.split(',').map(load => parseFloat(load.trim())))} />
      </label>
      <br />
      <label>
        Beam Depth (mm):
        <input type="number" value={beamDepth} onChange={(e) => setBeamDepth(e.target.value)} />
      </label>
      <br />
      <label>
        Beam Width (mm):
        <input type="number" value={beamWidth} onChange={(e) => setBeamWidth(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateBeam}>Calculate Beam</button>
      <br />
      {result && (
        <div>
          <p>Reinforcement: {result.reinforcement}</p>
          <p>Is beam size safe: {result.isSafe ? 'Yes' : 'No'}</p>
          <p>Depth: {result.depth}</p>
          <p>Width: {result.width}</p>
          <div>
            <h3>Beam Diagram</h3>
            {drawBeam()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BeamAnalyzer;
