import React, { useState } from "react";

function LeverArmCalculator() {
  const [beamLength, setBeamLength] = useState("350");
  const [effectiveCover, setEffectiveCover] = useState("50");
  const [beamDepth, setBeamDepth] = useState("650");
  const [bendingMoment, setBendingMoment] = useState("185000");
  const [sigmaCBC, setSigmaCBC] = useState("7");
  const [sigmaST, setSigmaST] = useState("230");
  const [noOfBars, setNoOfBars] = useState("20");
  const [k, setK] = useState("");
  const [m, setM] = useState("");
  const [j, setJ] = useState("");
  const [r, setR] = useState("");
  const [n, setN] = useState("");
  const [mOne, setMOne] = useState("");
  const [mTwo, setMTwo] = useState("");
  const [aSTOne, setASTOne] = useState("");
  const [aSTTwo, setASTTwo] = useState("");
  const [aST, setAST] = useState("");
  const [aPhi, setAPhi] = useState("");
  const [barsRequired, setBarsRequired] = useState("");
  const [aSC, setASC] = useState("");
  const [areaOfOneBar, setAreaOfOneBar] = useState("113");
  const [totalNoOfBars, setTotalNoOfBars] = useState("");

  // beamDepth = beamDepth - effectiveCover;

  const calculateM = () => {
    const mValue = 280 / (3 * parseFloat(sigmaCBC));
    setM(mValue.toFixed(2));
  };

  const calculateK = () => {
    const kValue =
      (parseFloat(m) * parseFloat(sigmaCBC)) /
      (parseFloat(m) * parseFloat(sigmaCBC) + 230);
    setK(kValue.toFixed(2));
  };

  const calculateJ = () => {
    const jValue = 1 - parseFloat(k) / 3;
    setJ(jValue.toFixed(2));
  };

  const calculateR = () => {
    const rValue = 0.5 * parseFloat(sigmaCBC) * parseFloat(k) * parseFloat(j);
    setR(rValue.toFixed(2));
  };

  const calculateN = () => {
    const nValue = parseFloat(k) * parseFloat(beamDepth);
    setN(nValue.toFixed(2));
  };

  const calculateMOne = () => {
    const mOneValue =
      parseFloat(r) *
      parseFloat(beamLength) *
      (parseFloat(beamDepth) * parseFloat(beamDepth));
    setMOne(mOneValue.toFixed(0));
  };

  const calculateMTwo = () => {
    const mTwoValue = parseInt(bendingMoment) * 1000 - parseInt(mOne);
    setMTwo(mTwoValue);
  };

  const calculateASTOne = () => {
    const aSTOneValue =
      parseInt(mOne) /
      (parseFloat(sigmaST) * parseFloat(j) * parseFloat(beamDepth));
    setASTOne(aSTOneValue.toFixed(2));
  };

  const calculateASTTwo = () => {
    const aSTTwoValue =
      parseInt(mTwo) /
      (parseFloat(sigmaST) * (parseInt(beamDepth) - parseInt(effectiveCover)));
    setASTTwo(aSTTwoValue.toFixed(1));
  };

  const calculateAST = () => {
    const setASTValue = parseFloat(aSTOne) + parseFloat(aSTTwo);
    setAST(setASTValue.toFixed(2));
  };

  const calculateAPhi = () => {
    const aPhiValue = 0.785 * (parseInt(noOfBars) * parseInt(noOfBars));
    setAPhi(aPhiValue.toFixed(0));
  };

  const calculateBarsRequired = () => {
    const barsRequiredValue = parseFloat(aST) / aPhi;
    const roundedValue = Math.ceil(barsRequiredValue);
    setBarsRequired(roundedValue);
  };

  const calculateASC = () => {
    const aSCValue =
      (parseFloat(m) *
        parseFloat(aSTTwo) *
        (parseFloat(beamDepth) - parseFloat(n))) /
      ((1.5 * parseFloat(m) - 1) *
        (parseFloat(beamDepth) - parseFloat(effectiveCover)));
    setASC(aSCValue.toFixed(1));
  };

  const calculateTotalNoOfBars = () => {
    const totalNoOfBarsValue = parseFloat(aSC) / areaOfOneBar;
    const roundedTotalBars = Math.ceil(totalNoOfBarsValue);
    setTotalNoOfBars(roundedTotalBars);
  };

  const handleKeyPress = (e, calculationFunction) => {
    if (e.key === "Enter") {
      calculationFunction();
    }
  };

  return (
    <div>
      <h2> Calculator</h2>
      <div>
        <label htmlFor="beamLength"> Length:</label>
        <input
          type="number"
          id="beamLength"
          value={beamLength}
          onChange={(e) => setBeamLength(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateM)}
        />
        <span>mm</span>
      </div>
      <div>
        <label htmlFor="beamDepth"> Depth:</label>
        <input
          type="number"
          id="beamDepth"
          value={beamDepth}
          onChange={(e) => setBeamDepth(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateM)}
        />
        <span>mm</span>
      </div>
      <div>
        <label htmlFor="bendingMoment">B:</label>
        <input
          type="number"
          id="bendingMoment"
          value={bendingMoment}
          onChange={(e) => setBendingMoment(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateM)}
        />
        <span>Nm</span>
      </div>
      <div>
        <label htmlFor="sigmaCBC">σcbc:</label>
        <input
          type="number"
          id="sigmaCBC"
          value={sigmaCBC}
          onChange={(e) => setSigmaCBC(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateM)}
        />
        <span>N/mm²</span>
      </div>
      <div>
        <label htmlFor="sigmaST">σst:</label>
        <input
          type="number"
          id="sigmaST"
          value={sigmaST}
          onChange={(e) => setSigmaST(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateM)}
        />
        <span>N/mm²</span>
      </div>
      <div>
        <label htmlFor="noOfBars">No of bars:</label>
        <input
          type="number"
          id="noOfBars"
          value={noOfBars}
          onChange={(e) => setNoOfBars(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, calculateAPhi)}
        />
        <span></span>
      </div>
      <button onClick={calculateM}>Calculate M</button>
      <button onClick={calculateK}>Calculate K</button>
      <button onClick={calculateJ}>Calculate J</button>
      <button onClick={calculateR}>Calculate R</button>
      <button onClick={calculateN}>Calculate N</button>
      <button onClick={calculateMOne}>Calculate M1</button>
      <button onClick={calculateMTwo}>Calculate M2</button>
      <button onClick={calculateASTOne}>Calculate Ast1</button>
      <button onClick={calculateASTTwo}>Calculate Ast2</button>
      <button onClick={calculateAST}>Calculate Ast</button>
      <button onClick={calculateAPhi}>Calculate AΦ</button>
      <button onClick={calculateBarsRequired}>Calculate Bars required</button>
      <button onClick={calculateASC}>Calculate Asc</button>
      <button onClick={calculateTotalNoOfBars}>
        Calculate Total No of bars
      </button>
      <p>m: {m}</p>
      <p>k: {k}</p>
      <p>j: {j}</p>
      <p>r: {r} N/mm²</p>
      <p>n: {n} mm</p>
      <p>m1: {mOne} Nmm</p>
      <p>m2: {mTwo} Nmm</p>
      <p>Ast1: {aSTOne} mm²</p>
      <p>Ast2: {aSTTwo} mm²</p>
      <p>Ast: {aST} mm²</p>
      <p>AΦ: {aPhi} mm²</p>
      <p>No of bars: {barsRequired}</p>
      <p>Asc: {aSC} mm²</p>
      <p>Bars required: {totalNoOfBars}</p>
    </div>
  );
}

export default LeverArmCalculator;
