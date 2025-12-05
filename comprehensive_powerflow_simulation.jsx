import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, AlertTriangle, Power, ChevronRight, ChevronLeft, Flame, Info, ArrowRight } from 'lucide-react';

const ComprehensivePowerFlowSimulation = () => {
  const initialSystemData = {
    buses: [
      // 地域A
      { id: 1, name: 'G1A', type: 'gen', x: 150, y: 100, region: 'A', load: 0, genCapacity: 280, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 2, name: 'G2A', type: 'gen', x: 350, y: 80, region: 'A', load: 0, genCapacity: 250, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 3, name: 'G3A', type: 'gen', x: 250, y: 150, region: 'A', load: 0, genCapacity: 220, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 4, name: 'Sub1A', type: 'substation', x: 250, y: 200, region: 'A', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 5, name: 'Load1A', type: 'load', x: 150, y: 250, region: 'A', load: 100, loadQ: 30, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 6, name: 'Load2A', type: 'load', x: 350, y: 250, region: 'A', load: 90, loadQ: 27, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 7, name: 'Sub2A', type: 'substation', x: 250, y: 300, region: 'A', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      
      // 地域B
      { id: 8, name: 'G1B', type: 'gen', x: 550, y: 150, region: 'B', load: 0, genCapacity: 240, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 9, name: 'G2B', type: 'gen', x: 750, y: 150, region: 'B', load: 0, genCapacity: 220, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 10, name: 'Sub1B', type: 'substation', x: 550, y: 250, region: 'B', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 11, name: 'Sub2B', type: 'substation', x: 750, y: 250, region: 'B', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 12, name: 'Load1B', type: 'load', x: 550, y: 350, region: 'B', load: 180, loadQ: 54, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 13, name: 'Load2B', type: 'load', x: 750, y: 350, region: 'B', load: 170, loadQ: 51, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 14, name: 'Load3B', type: 'load', x: 650, y: 300, region: 'B', load: 150, loadQ: 45, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 15, name: 'Sub3B', type: 'substation', x: 650, y: 200, region: 'B', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      
      // 地域C
      { id: 16, name: 'G1C', type: 'gen', x: 950, y: 100, region: 'C', load: 0, genCapacity: 260, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 17, name: 'G2C', type: 'gen', x: 1150, y: 150, region: 'C', load: 0, genCapacity: 200, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 18, name: 'G3C', type: 'gen', x: 1050, y: 200, region: 'C', load: 0, genCapacity: 180, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 19, name: 'Sub1C', type: 'substation', x: 950, y: 250, region: 'C', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 20, name: 'Sub2C', type: 'substation', x: 1050, y: 300, region: 'C', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 21, name: 'Load1C', type: 'load', x: 950, y: 350, region: 'C', load: 140, loadQ: 42, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 22, name: 'Load2C', type: 'load', x: 1150, y: 300, region: 'C', load: 120, loadQ: 36, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 23, name: 'Load3C', type: 'load', x: 1050, y: 400, region: 'C', load: 110, loadQ: 33, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      
      // 追加ノード
      { id: 24, name: 'Sub4A', type: 'substation', x: 450, y: 200, region: 'A', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 25, name: 'Sub5B', type: 'substation', x: 650, y: 100, region: 'B', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 26, name: 'Sub6B', type: 'substation', x: 850, y: 250, region: 'B', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 27, name: 'Load4A', type: 'load', x: 450, y: 300, region: 'A', load: 80, loadQ: 24, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 28, name: 'Load5B', type: 'load', x: 850, y: 350, region: 'B', load: 130, loadQ: 39, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 29, name: 'Load6C', type: 'load', x: 850, y: 150, region: 'C', load: 100, loadQ: 30, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 },
      { id: 30, name: 'Sub7C', type: 'substation', x: 850, y: 200, region: 'C', load: 0, genCapacity: 0, genOutput: 0, voltage: 1.0, qGen: 0, status: 'on', overloadCount: 0 }
    ],
    lines: [
      // 地域A（r:抵抗, x:リアクタンス p.u.）
      { id: 1, from: 1, to: 4, r: 0.01, x: 0.04, capacity: 200, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 2, from: 2, to: 4, r: 0.012, x: 0.05, capacity: 180, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 3, from: 3, to: 4, r: 0.01, x: 0.04, capacity: 170, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 4, from: 4, to: 5, r: 0.008, x: 0.03, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 5, from: 4, to: 6, r: 0.008, x: 0.03, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 6, from: 4, to: 7, r: 0.008, x: 0.03, capacity: 160, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 7, from: 5, to: 7, r: 0.01, x: 0.04, capacity: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 8, from: 6, to: 7, r: 0.01, x: 0.04, capacity: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 9, from: 2, to: 24, r: 0.008, x: 0.03, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 10, from: 24, to: 4, r: 0.01, x: 0.04, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 11, from: 24, to: 7, r: 0.012, x: 0.05, capacity: 130, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 12, from: 7, to: 27, r: 0.01, x: 0.04, capacity: 110, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 地域B
      { id: 13, from: 8, to: 10, r: 0.01, x: 0.04, capacity: 180, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 14, from: 9, to: 11, r: 0.01, x: 0.04, capacity: 170, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 15, from: 10, to: 11, r: 0.008, x: 0.03, capacity: 160, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 16, from: 10, to: 12, r: 0.008, x: 0.03, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 17, from: 11, to: 13, r: 0.008, x: 0.03, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 18, from: 10, to: 15, r: 0.01, x: 0.04, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 19, from: 11, to: 15, r: 0.01, x: 0.04, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 20, from: 15, to: 14, r: 0.008, x: 0.03, capacity: 130, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 21, from: 8, to: 25, r: 0.01, x: 0.04, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 22, from: 9, to: 25, r: 0.012, x: 0.05, capacity: 130, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 23, from: 25, to: 15, r: 0.008, x: 0.03, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 24, from: 11, to: 26, r: 0.008, x: 0.03, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 25, from: 26, to: 28, r: 0.008, x: 0.03, capacity: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 地域C
      { id: 26, from: 16, to: 19, r: 0.01, x: 0.04, capacity: 190, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 27, from: 17, to: 19, r: 0.012, x: 0.05, capacity: 160, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 28, from: 18, to: 20, r: 0.01, x: 0.04, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 29, from: 19, to: 20, r: 0.008, x: 0.03, capacity: 170, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 30, from: 19, to: 21, r: 0.008, x: 0.03, capacity: 130, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 31, from: 20, to: 23, r: 0.008, x: 0.03, capacity: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 32, from: 17, to: 22, r: 0.01, x: 0.04, capacity: 110, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 33, from: 16, to: 30, r: 0.008, x: 0.03, capacity: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 34, from: 30, to: 29, r: 0.008, x: 0.03, capacity: 110, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 35, from: 30, to: 19, r: 0.01, x: 0.04, capacity: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 地域間連系線
      { id: 36, from: 7, to: 10, r: 0.025, x: 0.10, capacity: 200, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 37, from: 24, to: 15, r: 0.027, x: 0.11, capacity: 180, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 38, from: 26, to: 30, r: 0.025, x: 0.10, capacity: 190, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 39, from: 15, to: 19, r: 0.030, x: 0.12, capacity: 170, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 40, from: 11, to: 30, r: 0.027, x: 0.11, capacity: 160, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 }
    ]
  };

  const [buses, setBuses] = useState(initialSystemData.buses);
  const [lines, setLines] = useState(initialSystemData.lines);
  const [prevBuses, setPrevBuses] = useState(initialSystemData.buses);
  const [history, setHistory] = useState([]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [eventLog, setEventLog] = useState([]);
  const [powerFlowLog, setPowerFlowLog] = useState([]);
  const [relayThreshold, setRelayThreshold] = useState(1.08);
  const [overloadStepsRequired, setOverloadStepsRequired] = useState(5);
  const [selectedScenario, setSelectedScenario] = useState('extreme1');
  const [flowCalculationType, setFlowCalculationType] = useState('dc'); // 'dc' or 'ac'
  const [time, setTime] = useState(0);
  const [cascadeWarning, setCascadeWarning] = useState('');
  const [showLegend, setShowLegend] = useState(true);
  const [showFlowDirection, setShowFlowDirection] = useState(true);

  const scenarios = {
    'extreme1': { 
      name: '🔥 極限カスケード：主要発電機喪失', 
      bus: 1, 
      description: 'G1A (280MW) トリップ → 系統ギリギリ → 大規模カスケード',
      severity: 'extreme'
    },
    'extreme2': { 
      name: '🔥 ドミノ倒し：連系線破断', 
      line: 36, 
      description: 'A-B連系線トリップ → 地域孤立 → 連鎖崩壊',
      severity: 'extreme'
    },
    'extreme3': { 
      name: '🔥🔥 地獄のカスケード：二重故障', 
      buses: [1, 8], 
      description: 'G1AとG1B同時トリップ → 両地域崩壊',
      severity: 'catastrophic'
    },
    'progressive1': {
      name: '📚 段階的過負荷（教育用）',
      bus: 3,
      description: 'G3A (220MW) トリップ → ゆっくり波及',
      severity: 'moderate'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + 1), 100);
    return () => clearInterval(interval);
  }, []);

  // DC潮流計算
  const calculateDCPowerFlow = (busesData, linesData, logChanges = false) => {
    const activeBuses = busesData.filter(b => b.status === 'on');
    const activeLines = linesData.filter(l => l.status === 'on');
    
    if (activeBuses.length === 0 || activeLines.length === 0) {
      return { buses: busesData, lines: linesData, converged: false, flowDetails: [] };
    }

    const busIdToIndex = {};
    activeBuses.forEach((bus, idx) => {
      busIdToIndex[bus.id] = idx;
    });

    const B = Array(activeBuses.length).fill(0).map(() => Array(activeBuses.length).fill(0));
    
    activeLines.forEach(line => {
      const fromBus = busesData.find(b => b.id === line.from);
      const toBus = busesData.find(b => b.id === line.to);
      
      if (fromBus && toBus && fromBus.status === 'on' && toBus.status === 'on') {
        const i = busIdToIndex[line.from];
        const j = busIdToIndex[line.to];
        if (i !== undefined && j !== undefined) {
          const b = 1 / line.x;
          B[i][i] += b;
          B[j][j] += b;
          B[i][j] -= b;
          B[j][i] -= b;
        }
      }
    });

    const P = activeBuses.map(bus => {
      const gen = bus.genOutput || 0;
      const load = bus.load || 0;
      return gen - load;
    });

    const slackIdx = activeBuses.findIndex(b => b.type === 'gen' && b.status === 'on');
    if (slackIdx === -1) {
      return { buses: busesData, lines: linesData, converged: false, flowDetails: [] };
    }

    const B_reduced = [];
    const P_reduced = [];
    
    for (let i = 0; i < activeBuses.length; i++) {
      if (i !== slackIdx) {
        const row = [];
        for (let j = 0; j < activeBuses.length; j++) {
          if (j !== slackIdx) {
            row.push(B[i][j]);
          }
        }
        B_reduced.push(row);
        P_reduced.push(P[i]);
      }
    }

    const theta = Array(activeBuses.length).fill(0);
    const maxIter = 100;
    const tolerance = 1e-6;
    
    for (let iter = 0; iter < maxIter; iter++) {
      let maxDiff = 0;
      let idx_reduced = 0;
      
      for (let i = 0; i < activeBuses.length; i++) {
        if (i === slackIdx) continue;
        
        let sum = P_reduced[idx_reduced];
        let idx_col = 0;
        
        for (let j = 0; j < activeBuses.length; j++) {
          if (j === slackIdx) continue;
          if (i !== j) {
            sum -= B_reduced[idx_reduced][idx_col] * theta[j];
          }
          idx_col++;
        }
        
        const newTheta = sum / B_reduced[idx_reduced][idx_reduced];
        const diff = Math.abs(newTheta - theta[i]);
        maxDiff = Math.max(maxDiff, diff);
        theta[i] = newTheta;
        
        idx_reduced++;
      }
      
      if (maxDiff < tolerance) break;
    }

    const updatedBuses = busesData.map(bus => {
      if (bus.status === 'off') return bus;
      const idx = busIdToIndex[bus.id];
      return { ...bus, angle: idx !== undefined ? theta[idx] : 0, voltage: 1.0 };
    });

    const updatedLines = linesData.map(line => {
      if (line.status === 'off') return { ...line, flow: 0, qFlow: 0 };
      
      const fromBus = updatedBuses.find(b => b.id === line.from);
      const toBus = updatedBuses.find(b => b.id === line.to);
      
      if (!fromBus || !toBus || fromBus.status === 'off' || toBus.status === 'off') {
        return { ...line, flow: 0, qFlow: 0 };
      }
      
      const thetaFrom = fromBus.angle || 0;
      const thetaTo = toBus.angle || 0;
      const flow = (thetaFrom - thetaTo) / line.x;
      
      return { ...line, flow, qFlow: 0 };
    });

    const totalLoad = updatedBuses.reduce((sum, bus) => sum + (bus.status === 'on' ? bus.load : 0), 0);
    const totalLineLoss = updatedLines.reduce((sum, line) => {
      if (line.status === 'off') return sum;
      return sum + Math.abs(line.flow) * line.x * 0.01;
    }, 0);
    
    const generators = updatedBuses.filter(b => b.type === 'gen' && b.status === 'on');
    const requiredGen = totalLoad + totalLineLoss;
    
    let distributedGen = 0;
    const busesWithGen = updatedBuses.map(bus => {
      if (bus.type === 'gen' && bus.status === 'on') {
        if (bus.id === activeBuses[slackIdx].id) {
          const slackOutput = requiredGen - distributedGen;
          return { ...bus, genOutput: Math.min(slackOutput, bus.genCapacity), isSlack: true, qGen: 0 };
        } else {
          const output = Math.min(bus.genCapacity * 0.95, requiredGen / generators.length);
          distributedGen += output;
          return { ...bus, genOutput: output, isSlack: false, qGen: 0 };
        }
      }
      return bus;
    });

    let flowDetails = [];
    if (logChanges) {
      busesWithGen.forEach(bus => {
        if (bus.type === 'gen' && bus.status === 'on') {
          const prevBus = prevBuses.find(b => b.id === bus.id);
          const prevOutput = prevBus ? prevBus.genOutput : 0;
          const change = bus.genOutput - prevOutput;
          const loadingPercent = (bus.genOutput / bus.genCapacity * 100).toFixed(1);
          
          flowDetails.push({
            name: bus.name,
            output: bus.genOutput.toFixed(1),
            capacity: bus.genCapacity,
            percent: loadingPercent,
            change: change.toFixed(1),
            voltage: bus.voltage.toFixed(3),
            isSlack: bus.isSlack,
            overloadCount: bus.overloadCount
          });
        }
      });
    }

    return { buses: busesWithGen, lines: updatedLines, converged: true, flowDetails };
  };

  // AC潮流計算（簡易版Newton-Raphson）
  const calculateACPowerFlow = (busesData, linesData, logChanges = false) => {
    const activeBuses = busesData.filter(b => b.status === 'on');
    const activeLines = linesData.filter(l => l.status === 'on');
    
    if (activeBuses.length === 0 || activeLines.length === 0) {
      return { buses: busesData, lines: linesData, converged: false, flowDetails: [] };
    }

    // 簡易AC潮流：DC潮流ベース + 無効電力と電圧降下の概算
    const dcResult = calculateDCPowerFlow(busesData, linesData, false);
    
    // 電圧降下の計算（簡易）
    const updatedBuses = dcResult.buses.map(bus => {
      if (bus.status === 'off') return bus;
      
      // 負荷バスの電圧降下を計算
      if (bus.type === 'load') {
        const connectedLines = activeLines.filter(l => l.to === bus.id || l.from === bus.id);
        let voltageDrop = 0;
        connectedLines.forEach(line => {
          const flow = Math.abs(line.flow || 0);
          voltageDrop += flow * line.r * 0.001; // 簡易的な電圧降下
        });
        return { ...bus, voltage: Math.max(0.90, 1.0 - voltageDrop) };
      }
      
      return { ...bus, voltage: 1.0 };
    });
    
    // 無効電力の計算（簡易）
    const updatedLines = dcResult.lines.map(line => {
      if (line.status === 'off') return line;
      
      const fromBus = updatedBuses.find(b => b.id === line.from);
      const toBus = updatedBuses.find(b => b.id === line.to);
      
      if (!fromBus || !toBus) return line;
      
      // 無効電力は有効電力と線路インピーダンスから概算
      const pFlow = line.flow || 0;
      const qFlow = pFlow * (line.x / Math.sqrt(line.r * line.r + line.x * line.x)) * 0.3;
      
      return { ...line, qFlow };
    });
    
    // 発電機の無効電力
    const busesWithQ = updatedBuses.map(bus => {
      if (bus.type === 'gen' && bus.status === 'on') {
        const qGen = bus.genOutput * 0.3; // 力率0.95相当
        return { ...bus, qGen };
      }
      return bus;
    });

    let flowDetails = [];
    if (logChanges) {
      busesWithQ.forEach(bus => {
        if (bus.type === 'gen' && bus.status === 'on') {
          const prevBus = prevBuses.find(b => b.id === bus.id);
          const prevOutput = prevBus ? prevBus.genOutput : 0;
          const change = bus.genOutput - prevOutput;
          const loadingPercent = (bus.genOutput / bus.genCapacity * 100).toFixed(1);
          
          flowDetails.push({
            name: bus.name,
            output: bus.genOutput.toFixed(1),
            capacity: bus.genCapacity,
            percent: loadingPercent,
            change: change.toFixed(1),
            voltage: bus.voltage.toFixed(3),
            qGen: bus.qGen.toFixed(1),
            isSlack: bus.isSlack,
            overloadCount: bus.overloadCount
          });
        }
      });
    }

    return { buses: busesWithQ, lines: updatedLines, converged: true, flowDetails };
  };

  const calculatePowerFlow = (busesData, linesData, logChanges = false) => {
    if (flowCalculationType === 'ac') {
      return calculateACPowerFlow(busesData, linesData, logChanges);
    } else {
      return calculateDCPowerFlow(busesData, linesData, logChanges);
    }
  };

  const saveToHistory = () => {
    setHistory(prev => [...prev, {
      step: currentStep,
      buses: JSON.parse(JSON.stringify(buses)),
      lines: JSON.parse(JSON.stringify(lines)),
      eventLog: [...eventLog],
      powerFlowLog: [...powerFlowLog],
      warning: cascadeWarning
    }]);
  };

  const goToPreviousStep = () => {
    if (history.length > 0) {
      const prevState = history[history.length - 1];
      setBuses(prevState.buses);
      setLines(prevState.lines);
      setEventLog(prevState.eventLog);
      setPowerFlowLog(prevState.powerFlowLog);
      setCascadeWarning(prevState.warning);
      setCurrentStep(prevState.step);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const executeNextStep = () => {
    saveToHistory();
    
    if (currentStep === 0) {
      const result = calculatePowerFlow(buses, lines, true);
      setBuses(result.buses);
      setLines(result.lines);
      setPrevBuses(result.buses);
      
      const totalGen = result.buses.filter(b => b.type === 'gen' && b.status === 'on').reduce((sum, b) => sum + b.genCapacity, 0);
      const totalLoad = result.buses.filter(b => b.status === 'on').reduce((sum, b) => sum + b.load, 0);
      const margin = ((totalGen - totalLoad) / totalLoad * 100).toFixed(1);
      
      const calcType = flowCalculationType === 'ac' ? 'AC潮流（PQ）' : 'DC潮流（Pのみ）';
      setCascadeWarning(`⚠️ ギリギリ運用：余裕率${margin}% | ${calcType}`);
      setEventLog([`🟢 初期状態：容量${totalGen}MW / 負荷${totalLoad}MW（${calcType}）`]);
      setPowerFlowLog([{
        step: 0,
        title: '初期潮流計算',
        details: result.flowDetails
      }]);
      
      setCurrentStep(1);
    } else if (currentStep === 1) {
      const scenario = scenarios[selectedScenario];
      let updatedBuses = [...buses];
      let updatedLines = [...lines];
      
      if (scenario.bus) {
        updatedBuses = buses.map(bus => 
          bus.id === scenario.bus ? { ...bus, status: 'off', genOutput: 0 } : bus
        );
        const tripBus = buses.find(b => b.id === scenario.bus);
        setCascadeWarning(`🔥 初期故障発生！${tripBus.name} (${tripBus.genCapacity}MW) 喪失`);
        setEventLog(prev => [...prev, `⚠️ 初期故障：${scenario.description}`]);
      } else if (scenario.buses) {
        let lostCapacity = 0;
        scenario.buses.forEach(busId => {
          const bus = buses.find(b => b.id === busId);
          lostCapacity += bus.genCapacity;
          updatedBuses = updatedBuses.map(b => 
            b.id === busId ? { ...b, status: 'off', genOutput: 0 } : b
          );
        });
        setCascadeWarning(`🔥🔥 多重故障！合計${lostCapacity}MW喪失`);
        setEventLog(prev => [...prev, `⚠️⚠️ 初期故障：${scenario.description}`]);
      } else if (scenario.line) {
        updatedLines = lines.map(line =>
          line.id === scenario.line ? { ...line, status: 'off', flow: 0 } : line
        );
        const tripLine = lines.find(l => l.id === scenario.line);
        setCascadeWarning(`🔥 連系線切断！容量${tripLine.capacity}MW喪失`);
        setEventLog(prev => [...prev, `⚠️ 初期故障：${scenario.description}`]);
      }
      
      setPrevBuses(buses);
      const result = calculatePowerFlow(updatedBuses, updatedLines, true);
      setBuses(result.buses);
      setLines(result.lines);
      
      setPowerFlowLog(prev => [...prev, {
        step: 1,
        title: '故障後の再潮流配分',
        details: result.flowDetails
      }]);
      
      setCurrentStep(2);
    } else if (currentStep >= 2 && currentStep < 50) {
      let cascadeOccurred = false;
      let updatedBuses = [...buses];
      let updatedLines = [...lines];
      let cascadeInfo = [];
      
      updatedBuses = updatedBuses.map(bus => {
        if (bus.type === 'gen' && bus.status === 'on') {
          const loadFactor = bus.genOutput / bus.genCapacity;
          if (loadFactor > relayThreshold) {
            return { ...bus, overloadCount: bus.overloadCount + 1 };
          } else {
            return { ...bus, overloadCount: 0 };
          }
        }
        return bus;
      });
      
      updatedLines = updatedLines.map(line => {
        if (line.status === 'on') {
          const loadFactor = Math.abs(line.flow) / line.capacity;
          if (loadFactor > relayThreshold) {
            return { ...line, overloadCount: line.overloadCount + 1 };
          } else {
            return { ...line, overloadCount: 0 };
          }
        }
        return line;
      });
      
      updatedBuses.forEach(bus => {
        if (bus.type === 'gen' && bus.status === 'on' && bus.overloadCount >= overloadStepsRequired) {
          updatedBuses = updatedBuses.map(b => 
            b.id === bus.id ? { ...b, status: 'off', genOutput: 0, overloadCount: 0 } : b
          );
          cascadeInfo.push(`${bus.name}`);
          setEventLog(prev => [...prev, 
            `🔴 ${bus.name} トリップ`
          ]);
          cascadeOccurred = true;
        }
      });
      
      updatedLines.forEach(line => {
        if (line.status === 'on' && line.overloadCount >= overloadStepsRequired) {
          updatedLines = updatedLines.map(l => 
            l.id === line.id ? { ...l, status: 'off', flow: 0, overloadCount: 0 } : l
          );
          const fromBus = buses.find(b => b.id === line.from);
          const toBus = buses.find(b => b.id === line.to);
          cascadeInfo.push(`${fromBus.name}-${toBus.name}`);
          setEventLog(prev => [...prev, 
            `🔴 ${fromBus.name}-${toBus.name} トリップ`
          ]);
          cascadeOccurred = true;
        }
      });
      
      if (cascadeOccurred) {
        setCascadeWarning(`🔥 カスケード進行中：${cascadeInfo.join(', ')}`);
        
        setPrevBuses(buses);
        const result = calculatePowerFlow(updatedBuses, updatedLines, true);
        setBuses(result.buses);
        setLines(result.lines);
        
        setPowerFlowLog(prev => [...prev, {
          step: currentStep,
          title: `カスケード波及 ${currentStep - 1}`,
          details: result.flowDetails
        }]);
        
        setCurrentStep(prev => prev + 1);
      } else {
        const overloadBuses = updatedBuses.filter(b => 
          b.type === 'gen' && b.status === 'on' && b.overloadCount > 0
        );
        const overloadLines = updatedLines.filter(l => 
          l.status === 'on' && l.overloadCount > 0
        );
        
        if (overloadBuses.length > 0 || overloadLines.length > 0) {
          setCascadeWarning(`⏳ 過負荷継続中`);
          setEventLog(prev => [...prev, `⏳ 過負荷継続中`]);
          
          setBuses(updatedBuses);
          setLines(updatedLines);
          setCurrentStep(prev => prev + 1);
        } else {
          const activeGens = buses.filter(b => b.type === 'gen' && b.status === 'on');
          
          if (activeGens.length === 0) {
            setCascadeWarning('⚫ 完全停電（ブラックアウト）');
            setEventLog(prev => [...prev, `⚫ 完全停電：全${currentStep}ステップ`]);
          } else {
            setCascadeWarning(`✅ カスケード停止（全${currentStep}ステップ）`);
            setEventLog(prev => [...prev, `✅ 平衡状態到達`]);
          }
          setIsAutoMode(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isAutoMode && currentStep < 50) {
      const timer = setTimeout(executeNextStep, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAutoMode, currentStep]);

  const reset = () => {
    setBuses(initialSystemData.buses);
    setLines(initialSystemData.lines);
    setPrevBuses(initialSystemData.buses);
    setHistory([]);
    setCurrentStep(0);
    setEventLog([]);
    setPowerFlowLog([]);
    setIsAutoMode(false);
    setCascadeWarning('');
  };

  const canvasWidth = 1300;
  const canvasHeight = 500;

  const getLineColor = (line) => {
    if (line.status === 'off') return '#666';
    const loadFactor = Math.abs(line.flow) / line.capacity;
    if (line.overloadCount > 0) return '#ff3333';
    if (loadFactor > relayThreshold) return '#ef4444';
    if (loadFactor > 0.95) return '#f97316';
    if (loadFactor > 0.85) return '#fbbf24';
    return line.type === 'tie' ? '#06b6d4' : '#10b981';
  };

  const getBusColor = (bus) => {
    if (bus.status === 'off') return '#374151';
    if (bus.type === 'gen') {
      const loadFactor = bus.genOutput / bus.genCapacity;
      if (bus.overloadCount > 0) return '#ff3333';
      if (loadFactor > relayThreshold) return '#ef4444';
      if (loadFactor > 0.95) return '#f97316';
      return '#3b82f6';
    }
    if (bus.type === 'load') {
      if (flowCalculationType === 'ac' && bus.voltage < 0.95) return '#f59e0b';
      return '#8b5cf6';
    }
    return '#64748b';
  };

  const drawFlowArrow = (x1, y1, x2, y2, flow, color) => {
    if (!showFlowDirection || Math.abs(flow) < 1) return null;
    
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const reverseFlow = flow < 0;
    const effectiveAngle = reverseFlow ? angle + Math.PI : angle;
    
    const arrowLength = 15;
    const arrowWidth = 8;
    
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    return (
      <polygon
        points={`
          ${midX},${midY}
          ${midX - arrowLength * Math.cos(effectiveAngle) + arrowWidth * Math.sin(effectiveAngle)},${midY - arrowLength * Math.sin(effectiveAngle) - arrowWidth * Math.cos(effectiveAngle)}
          ${midX - arrowLength * Math.cos(effectiveAngle) - arrowWidth * Math.sin(effectiveAngle)},${midY - arrowLength * Math.sin(effectiveAngle) + arrowWidth * Math.cos(effectiveAngle)}
        `}
        fill={color}
        opacity={0.9}
      />
    );
  };

  const getSeverityColor = () => {
    const scenario = scenarios[selectedScenario];
    if (scenario.severity === 'catastrophic') return 'from-red-900 to-red-700';
    if (scenario.severity === 'extreme') return 'from-orange-900 to-red-800';
    return 'from-blue-900 to-blue-700';
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Flame className="text-red-500" size={32} />
            総合潮流解析シミュレーション
          </h1>
          <p className="text-sm text-red-400 font-semibold">
            DC/AC潮流計算 | 潮流方向表示 | ステップ移動機能 | 無効電力・電圧解析
          </p>
        </div>

        {cascadeWarning && (
          <div className={`bg-gradient-to-r ${getSeverityColor()} rounded-xl p-4 mb-4 shadow-2xl border-2 border-red-500`}>
            <div className="text-xl font-bold text-center animate-pulse">
              {cascadeWarning}
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">シナリオ選択</label>
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                disabled={currentStep > 0}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50 text-sm"
              >
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>{scenario.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">潮流計算タイプ</label>
              <select
                value={flowCalculationType}
                onChange={(e) => setFlowCalculationType(e.target.value)}
                disabled={currentStep > 0}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50 text-sm"
              >
                <option value="dc">DC潮流（Pのみ）</option>
                <option value="ac">AC潮流（PQ+V）</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                過負荷閾値: {(relayThreshold * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="105"
                max="115"
                value={relayThreshold * 100}
                onChange={(e) => setRelayThreshold(Number(e.target.value) / 100)}
                disabled={currentStep > 0}
                className="w-full h-2 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                保護動作: {overloadStepsRequired}
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={overloadStepsRequired}
                onChange={(e) => setOverloadStepsRequired(Number(e.target.value))}
                disabled={currentStep > 0}
                className="w-full h-2 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <button
              onClick={goToPreviousStep}
              disabled={history.length === 0}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2 font-bold"
            >
              <ChevronLeft size={20} />
              戻る
            </button>
            
            <button
              onClick={executeNextStep}
              disabled={currentStep >= 50 || isAutoMode}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg flex items-center justify-center gap-2 font-bold"
            >
              <ChevronRight size={20} />
              次へ
            </button>
            
            <button
              onClick={() => {
                if (currentStep === 0) executeNextStep();
                setIsAutoMode(!isAutoMode);
              }}
              disabled={currentStep >= 50}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg flex items-center justify-center gap-2 font-bold"
            >
              {isAutoMode ? <Pause size={20} /> : <Play size={20} />}
              自動
            </button>
            
            <button
              onClick={reset}
              className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 font-bold"
            >
              <RotateCcw size={20} />
              リセット
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-mono bg-red-900/50 px-6 py-3 rounded-lg border-2 border-red-500 font-bold">
              ステップ: {currentStep} / 50
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFlowDirection(!showFlowDirection)}
                className={`px-4 py-2 rounded-lg transition ${
                  showFlowDirection ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <ArrowRight size={18} className="inline mr-2" />
                潮流方向
              </button>
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <Info size={18} />
                凡例
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Power size={18} />
              系統図（矢印=潮流方向）
            </h2>
            <div className="overflow-x-auto">
              <svg width={canvasWidth} height={canvasHeight} className="bg-gray-900 rounded">
                <rect x="50" y="50" width="450" height="320" fill="#1e3a5f" opacity="0.2" rx="10" />
                <text x="275" y="35" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">地域A</text>
                
                <rect x="500" y="50" width="400" height="320" fill="#3a1e5f" opacity="0.2" rx="10" />
                <text x="700" y="35" fill="#a78bfa" fontSize="14" fontWeight="bold" textAnchor="middle">地域B</text>
                
                <rect x="900" y="50" width="350" height="370" fill="#1e5f3a" opacity="0.2" rx="10" />
                <text x="1075" y="35" fill="#4ade80" fontSize="14" fontWeight="bold" textAnchor="middle">地域C</text>

                {lines.map(line => {
                  const fromBus = buses.find(b => b.id === line.from);
                  const toBus = buses.find(b => b.id === line.to);
                  if (!fromBus || !toBus) return null;
                  
                  const shouldBlink = line.overloadCount > 0 && Math.floor(time / 4) % 2 === 0;
                  const lineColor = shouldBlink ? '#ff0000' : getLineColor(line);
                  
                  return (
                    <g key={line.id}>
                      <line
                        x1={fromBus.x}
                        y1={fromBus.y}
                        x2={toBus.x}
                        y2={toBus.y}
                        stroke={lineColor}
                        strokeWidth={line.overloadCount > 0 ? 8 : (line.status === 'off' ? 1 : 3)}
                        opacity={line.status === 'off' ? 0.2 : 0.9}
                        strokeDasharray={line.type === 'tie' ? '8,8' : '0'}
                      />
                      {drawFlowArrow(fromBus.x, fromBus.y, toBus.x, toBus.y, line.flow, lineColor)}
                    </g>
                  );
                })}

                {buses.map(bus => {
                  const shouldBlink = bus.overloadCount > 0 && Math.floor(time / 4) % 2 === 0;
                  
                  return (
                    <g key={bus.id}>
                      {bus.overloadCount > 0 && (
                        <circle
                          cx={bus.x}
                          cy={bus.y}
                          r={40}
                          fill="none"
                          stroke="#ff0000"
                          strokeWidth={4}
                          opacity={shouldBlink ? 1 : 0.3}
                        />
                      )}
                      
                      {bus.type === 'gen' ? (
                        <circle
                          cx={bus.x}
                          cy={bus.y}
                          r={22}
                          fill={shouldBlink ? '#ff0000' : getBusColor(bus)}
                          stroke="white"
                          strokeWidth={bus.status === 'off' ? 4 : 2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      ) : bus.type === 'load' ? (
                        <rect
                          x={bus.x - 16}
                          y={bus.y - 16}
                          width={32}
                          height={32}
                          fill={getBusColor(bus)}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      ) : (
                        <polygon
                          points={`${bus.x},${bus.y-12} ${bus.x+10},${bus.y+6} ${bus.x-10},${bus.y+6}`}
                          fill={getBusColor(bus)}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      )}
                      
                      {bus.status === 'off' && (
                        <>
                          <line x1={bus.x - 16} y1={bus.y - 16} x2={bus.x + 16} y2={bus.y + 16} stroke="#000" strokeWidth={4} />
                          <line x1={bus.x - 16} y1={bus.y + 16} x2={bus.x + 16} y2={bus.y - 16} stroke="#000" strokeWidth={4} />
                        </>
                      )}
                      
                      <text x={bus.x} y={bus.y - 30} fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">
                        {bus.name}
                      </text>
                      
                      {bus.type === 'gen' && bus.status === 'on' && (
                        <>
                          <text x={bus.x} y={bus.y + 40} fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {((bus.genOutput / bus.genCapacity) * 100).toFixed(0)}%
                          </text>
                          {flowCalculationType === 'ac' && (
                            <text x={bus.x} y={bus.y + 52} fill="#94a3b8" fontSize="9" textAnchor="middle">
                              V:{bus.voltage.toFixed(2)}
                            </text>
                          )}
                        </>
                      )}
                      
                      {bus.type === 'load' && bus.status === 'on' && (
                        <>
                          <text x={bus.x} y={bus.y + 30} fill="#c084fc" fontSize="10" textAnchor="middle">
                            {bus.load}MW
                          </text>
                          {flowCalculationType === 'ac' && (
                            <text x={bus.x} y={bus.y + 42} fill={bus.voltage < 0.95 ? '#f59e0b' : '#94a3b8'} fontSize="9" textAnchor="middle">
                              V:{bus.voltage.toFixed(2)}
                            </text>
                          )}
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {showLegend && (
              <div className="mt-4 bg-gray-900 rounded-lg p-4">
                <h3 className="font-bold mb-3 text-sm">凡例</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <svg width="30" height="30">
                      <circle cx="15" cy="15" r="10" fill="#3b82f6" stroke="white" strokeWidth="2" />
                    </svg>
                    <span>発電機</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="30" height="30">
                      <rect x="5" y="5" width="20" height="20" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                    </svg>
                    <span>負荷</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="30" height="30">
                      <polygon points="15,5 25,25 5,25" fill="#64748b" stroke="white" strokeWidth="2" />
                    </svg>
                    <span>変電所</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="40" height="20">
                      <line x1="0" y1="10" x2="40" y2="10" stroke="#10b981" strokeWidth="3" />
                    </svg>
                    <span>送電線</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="40" height="20">
                      <line x1="0" y1="10" x2="40" y2="10" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5,5" />
                    </svg>
                    <span>連系線</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="40" height="20">
                      <line x1="0" y1="10" x2="40" y2="10" stroke="#10b981" strokeWidth="3" />
                      <polygon points="20,10 15,6 15,14" fill="#10b981" />
                    </svg>
                    <span>潮流方向</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="40" height="20">
                      <line x1="0" y1="10" x2="40" y2="10" stroke="#ff3333" strokeWidth="6" />
                    </svg>
                    <span>過負荷</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">V:0.98</span>
                    <span>電圧(AC潮流)</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
                  <p><strong>DC潮流（Pのみ）:</strong> 有効電力のみ計算、高速</p>
                  <p><strong>AC潮流（PQ+V）:</strong> 有効・無効電力と電圧を計算、より正確</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3">発電機状態</h2>
            <div className="space-y-2 max-h-[550px] overflow-y-auto">
              {buses.filter(b => b.type === 'gen').map(bus => (
                <div key={bus.id} className={`p-2 rounded text-xs ${
                  bus.status === 'off' ? 'bg-gray-900 opacity-50' :
                  bus.overloadCount > 0 ? 'bg-red-900/40 border border-red-500' :
                  'bg-gray-900'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{bus.name}</span>
                    {bus.status === 'on' ? (
                      <span className={`font-mono font-bold ${
                        bus.overloadCount > 0 ? 'text-red-400' :
                        (bus.genOutput / bus.genCapacity) > 0.95 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {((bus.genOutput / bus.genCapacity) * 100).toFixed(0)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold">停止</span>
                    )}
                  </div>
                  {bus.status === 'on' && (
                    <>
                      <div className="text-gray-400 mt-1">
                        P: {bus.genOutput.toFixed(0)}MW
                      </div>
                      {flowCalculationType === 'ac' && (
                        <>
                          <div className="text-gray-400">
                            Q: {bus.qGen.toFixed(0)}Mvar
                          </div>
                          <div className="text-gray-400">
                            V: {bus.voltage.toFixed(3)}p.u.
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3">イベントログ</h2>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {eventLog.map((event, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-xs font-medium ${
                  event.includes('🔴')
                    ? 'bg-red-900/40 border-l-4 border-red-500'
                    : event.includes('⏳')
                    ? 'bg-yellow-900/30 border-l-4 border-yellow-500'
                    : event.includes('✅')
                    ? 'bg-green-900/30 border-l-4 border-green-500'
                    : 'bg-blue-900/30 border-l-4 border-blue-500'
                }`}
              >
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePowerFlowSimulation;