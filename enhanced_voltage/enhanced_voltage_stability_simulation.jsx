import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, AlertTriangle, Power, ChevronRight, ChevronLeft, Flame, Info, ArrowRight, TrendingDown, Battery } from 'lucide-react';

const EnhancedVoltageStabilitySimulation = () => {
  const initialSystemData = {
    buses: [
      // 地域A - 工業地帯（重負荷、低力率）
      { id: 1, name: 'G1A', type: 'gen', x: 150, y: 100, region: 'A', pLoad: 0, qLoad: 0, genCapacity: 300, qGenMax: 150, qGenMin: -100, genOutput: 0, qGenOutput: 0, voltage: 1.05, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 2, name: 'G2A', type: 'gen', x: 350, y: 80, region: 'A', pLoad: 0, qLoad: 0, genCapacity: 280, qGenMax: 140, qGenMin: -90, genOutput: 0, qGenOutput: 0, voltage: 1.04, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 3, name: 'Sub1A', type: 'substation', x: 250, y: 150, region: 'A', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 4, name: 'Load1A', type: 'load', x: 150, y: 220, region: 'A', pLoad: 120, qLoad: 60, loadType: 'industrial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 5, name: 'Load2A', type: 'load', x: 350, y: 220, region: 'A', pLoad: 100, qLoad: 50, loadType: 'industrial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 6, name: 'Load3A', type: 'load', x: 250, y: 280, region: 'A', pLoad: 90, qLoad: 45, loadType: 'industrial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      
      // 地域B - 都市部（中負荷、中力率）
      { id: 7, name: 'G1B', type: 'gen', x: 550, y: 120, region: 'B', pLoad: 0, qLoad: 0, genCapacity: 250, qGenMax: 125, qGenMin: -80, genOutput: 0, qGenOutput: 0, voltage: 1.03, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 8, name: 'G2B', type: 'gen', x: 750, y: 120, region: 'B', pLoad: 0, qLoad: 0, genCapacity: 220, qGenMax: 110, qGenMin: -70, genOutput: 0, qGenOutput: 0, voltage: 1.03, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 9, name: 'Sub1B', type: 'substation', x: 650, y: 180, region: 'B', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 10, name: 'Load1B', type: 'load', x: 550, y: 240, region: 'B', pLoad: 80, qLoad: 30, loadType: 'commercial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 11, name: 'Load2B', type: 'load', x: 750, y: 240, region: 'B', pLoad: 75, qLoad: 28, loadType: 'commercial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 12, name: 'Load3B', type: 'load', x: 650, y: 300, region: 'B', pLoad: 85, qLoad: 32, loadType: 'commercial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      
      // 地域C - 農村部（軽負荷、高力率）+ 風力発電
      { id: 13, name: 'G1C', type: 'gen', x: 950, y: 100, region: 'C', pLoad: 0, qLoad: 0, genCapacity: 200, qGenMax: 100, qGenMin: -60, genOutput: 0, qGenOutput: 0, voltage: 1.02, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 14, name: 'Wind1C', type: 'renewable', x: 1100, y: 80, region: 'C', pLoad: 0, qLoad: 0, genCapacity: 150, qGenMax: 30, qGenMin: -30, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false, variability: 0.8 },
      { id: 15, name: 'Sub1C', type: 'substation', x: 1000, y: 160, region: 'C', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 16, name: 'Load1C', type: 'load', x: 950, y: 220, region: 'C', pLoad: 60, qLoad: 15, loadType: 'residential', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 17, name: 'Load2C', type: 'load', x: 1100, y: 220, region: 'C', pLoad: 50, qLoad: 12, loadType: 'residential', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      
      // 長距離送電末端（電圧不安定地域）
      { id: 18, name: 'SubRemote', type: 'substation', x: 1200, y: 300, region: 'D', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      { id: 19, name: 'LoadRemote', type: 'load', x: 1200, y: 360, region: 'D', pLoad: 200, qLoad: 100, loadType: 'industrial', genCapacity: 0, qGenMax: 0, qGenMin: 0, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: false },
      
      // 無効電力補償装置
      { id: 20, name: 'SVC1', type: 'svc', x: 450, y: 200, region: 'A', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 80, qGenMin: -80, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: true },
      { id: 21, name: 'SVC2', type: 'svc', x: 850, y: 200, region: 'B', pLoad: 0, qLoad: 0, genCapacity: 0, qGenMax: 60, qGenMin: -60, genOutput: 0, qGenOutput: 0, voltage: 1.0, angle: 0, status: 'on', overloadCount: 0, vControlled: true }
    ],
    lines: [
      // 地域A内線路
      { id: 1, from: 1, to: 3, r: 0.01, x: 0.08, b: 0.02, capacity: 220, thermalLimit: 220, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 2, from: 2, to: 3, r: 0.012, x: 0.09, b: 0.025, capacity: 200, thermalLimit: 200, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 3, from: 3, to: 4, r: 0.008, x: 0.06, b: 0.015, capacity: 150, thermalLimit: 150, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 4, from: 3, to: 5, r: 0.008, x: 0.06, b: 0.015, capacity: 140, thermalLimit: 140, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 5, from: 3, to: 6, r: 0.01, x: 0.07, b: 0.018, capacity: 130, thermalLimit: 130, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 6, from: 3, to: 20, r: 0.005, x: 0.04, b: 0.01, capacity: 100, thermalLimit: 100, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 地域B内線路
      { id: 7, from: 7, to: 9, r: 0.01, x: 0.08, b: 0.02, capacity: 190, thermalLimit: 190, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 8, from: 8, to: 9, r: 0.01, x: 0.08, b: 0.02, capacity: 180, thermalLimit: 180, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 9, from: 9, to: 10, r: 0.008, x: 0.06, b: 0.015, capacity: 120, thermalLimit: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 10, from: 9, to: 11, r: 0.008, x: 0.06, b: 0.015, capacity: 120, thermalLimit: 120, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 11, from: 9, to: 12, r: 0.01, x: 0.07, b: 0.018, capacity: 110, thermalLimit: 110, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 12, from: 9, to: 21, r: 0.005, x: 0.04, b: 0.01, capacity: 80, thermalLimit: 80, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 地域C内線路
      { id: 13, from: 13, to: 15, r: 0.01, x: 0.08, b: 0.02, capacity: 160, thermalLimit: 160, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 14, from: 14, to: 15, r: 0.015, x: 0.10, b: 0.025, capacity: 120, thermalLimit: 120, flow: 0, qFlow: 0, status: 'on', type: 'renewable', overloadCount: 0 },
      { id: 15, from: 15, to: 16, r: 0.008, x: 0.06, b: 0.015, capacity: 100, thermalLimit: 100, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      { id: 16, from: 15, to: 17, r: 0.008, x: 0.06, b: 0.015, capacity: 90, thermalLimit: 90, flow: 0, qFlow: 0, status: 'on', type: 'local', overloadCount: 0 },
      
      // 長距離送電線（電圧不安定要因）
      { id: 17, from: 15, to: 18, r: 0.05, x: 0.25, b: 0.15, capacity: 180, thermalLimit: 180, flow: 0, qFlow: 0, status: 'on', type: 'long_distance', overloadCount: 0 },
      { id: 18, from: 18, to: 19, r: 0.02, x: 0.12, b: 0.08, capacity: 150, thermalLimit: 150, flow: 0, qFlow: 0, status: 'on', type: 'long_distance', overloadCount: 0 },
      
      // 地域間連系線
      { id: 19, from: 3, to: 9, r: 0.03, x: 0.15, b: 0.08, capacity: 250, thermalLimit: 250, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 20, from: 20, to: 21, r: 0.025, x: 0.12, b: 0.06, capacity: 200, thermalLimit: 200, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 21, from: 9, to: 15, r: 0.035, x: 0.18, b: 0.10, capacity: 220, thermalLimit: 220, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 },
      { id: 22, from: 21, to: 18, r: 0.04, x: 0.20, b: 0.12, capacity: 180, thermalLimit: 180, flow: 0, qFlow: 0, status: 'on', type: 'tie', overloadCount: 0 }
    ]
  };

  const [buses, setBuses] = useState(initialSystemData.buses);
  const [lines, setLines] = useState(initialSystemData.lines);
  const [history, setHistory] = useState([]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [eventLog, setEventLog] = useState([]);
  const [relayThreshold, setRelayThreshold] = useState(1.05);
  const [voltageThreshold, setVoltageThreshold] = useState(0.90);
  const [overloadStepsRequired, setOverloadStepsRequired] = useState(3);
  const [selectedScenario, setSelectedScenario] = useState('voltage_collapse');
  const [time, setTime] = useState(0);
  const [cascadeWarning, setCascadeWarning] = useState('');
  const [showLegend, setShowLegend] = useState(true);
  const [showVoltageContours, setShowVoltageContours] = useState(true);
  const [powerFlowConverged, setPowerFlowConverged] = useState(true);
  const [voltageStabilityMargin, setVoltageStabilityMargin] = useState({ pMargin: 0, qMargin: 0, criticalBus: null });

  const scenarios = {
    'voltage_collapse': {
      name: '⚡ 電圧崩壊：負荷急増',
      description: '遠方大負荷の急増 → 無効電力不足 → 電圧崩壊',
      severity: 'catastrophic',
      type: 'load_increase',
      targetBus: 19,
      increaseRate: 1.5
    },
    'reactive_shortage': {
      name: '🔋 無効電力不足：発電機励磁限界',
      description: '発電機励磁限界到達 → 無効電力供給不足 → 電圧低下',
      severity: 'extreme', 
      type: 'q_limit',
      targetBus: 1
    },
    'line_outage_voltage': {
      name: '📉 長距離送電線事故',
      description: '主要送電線事故 → インピーダンス増大 → 電圧不安定',
      severity: 'extreme',
      type: 'line_trip',
      targetLine: 17
    },
    'svc_failure': {
      name: '🛑 無効電力補償装置故障',
      description: 'SVC故障 → 電圧調整能力喪失 → 電圧変動増大',
      severity: 'moderate',
      type: 'svc_trip',
      targetBus: 20
    },
    'wind_variability': {
      name: '💨 風力発電出力変動',
      description: '風力出力急変 → 無効電力バランス変化 → 電圧変動',
      severity: 'moderate',
      type: 'renewable_variation',
      targetBus: 14
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + 1), 100);
    return () => clearInterval(interval);
  }, []);

  // 高精度ニュートン・ラプソン法AC潮流計算
  const calculateNewtonRaphsonPowerFlow = (busesData, linesData, logChanges = false) => {
    const activeBuses = busesData.filter(b => b.status === 'on');
    const activeLines = linesData.filter(l => l.status === 'on');
    
    if (activeBuses.length === 0) {
      return { buses: busesData, lines: linesData, converged: false, flowDetails: [], stabilityMargin: { pMargin: 0, qMargin: 0, criticalBus: null } };
    }

    const n = activeBuses.length;
    const busIdToIndex = {};
    activeBuses.forEach((bus, idx) => {
      busIdToIndex[bus.id] = idx;
    });

    // アドミタンス行列作成
    const Y = Array(n).fill(0).map(() => Array(n).fill({ real: 0, imag: 0 }));
    
    // 線路アドミタンス
    activeLines.forEach(line => {
      const fromIdx = busIdToIndex[line.from];
      const toBusIdx = busIdToIndex[line.to];
      
      if (fromIdx !== undefined && toBusIdx !== undefined) {
        const z = { real: line.r, imag: line.x };
        const y = complexDivide({ real: 1, imag: 0 }, z);
        const b_half = { real: 0, imag: line.b / 2 };
        
        // 自己アドミタンス
        Y[fromIdx][fromIdx] = complexAdd(Y[fromIdx][fromIdx], complexAdd(y, b_half));
        Y[toBusIdx][toBusIdx] = complexAdd(Y[toBusIdx][toBusIdx], complexAdd(y, b_half));
        
        // 相互アドミタンス
        Y[fromIdx][toBusIdx] = complexSubtract(Y[fromIdx][toBusIdx], y);
        Y[toBusIdx][fromIdx] = complexSubtract(Y[toBusIdx][fromIdx], y);
      }
    });

    // 電圧と位相角の初期値
    let V = activeBuses.map(bus => bus.voltage || 1.0);
    let theta = activeBuses.map(bus => bus.angle || 0.0);

    // ニュートン・ラプソン反復
    const maxIter = 50;
    const tolerance = 1e-6;
    let converged = false;

    for (let iter = 0; iter < maxIter; iter++) {
      const { P_calc, Q_calc } = calculatePQ(V, theta, Y, n);
      
      // 指定値との差分計算
      const deltaP = [];
      const deltaQ = [];
      
      activeBuses.forEach((bus, i) => {
        if (bus.type !== 'gen' || !bus.vControlled) { // PQバスまたは非電圧制御発電機
          const P_spec = (bus.genOutput || 0) - (bus.pLoad || 0);
          deltaP.push(P_spec - P_calc[i]);
        }
        
        if (bus.type === 'load' || (bus.type === 'gen' && !bus.vControlled) || bus.type === 'svc') {
          const Q_spec = (bus.qGenOutput || 0) - (bus.qLoad || 0);
          deltaQ.push(Q_spec - Q_calc[i]);
        }
      });

      const maxMismatch = Math.max(...deltaP.map(Math.abs), ...deltaQ.map(Math.abs));
      if (maxMismatch < tolerance) {
        converged = true;
        break;
      }

      // ヤコビアン行列計算と更新
      const jacobian = calculateJacobian(V, theta, Y, n, activeBuses);
      const deltax = solveLinearSystem(jacobian, [...deltaP, ...deltaQ]);
      
      // 電圧と位相角更新
      let idx = 0;
      activeBuses.forEach((bus, i) => {
        if (bus.type !== 'gen' || !bus.vControlled) {
          theta[i] += deltax[idx] * 0.5; // 緩和係数
          idx++;
        }
      });
      
      activeBuses.forEach((bus, i) => {
        if (bus.type === 'load' || (bus.type === 'gen' && !bus.vControlled)) {
          V[i] += deltax[idx] * 0.3; // 緩和係数
          V[i] = Math.max(0.5, Math.min(1.5, V[i])); // 制限
          idx++;
        }
      });
    }

    // 線路潮流計算
    const updatedLines = calculateLinePowerFlow(linesData, busesData, V, theta, busIdToIndex);

    // バス更新
    const { P_calc, Q_calc } = calculatePQ(V, theta, Y, n);
    const updatedBuses = busesData.map(bus => {
      const idx = busIdToIndex[bus.id];
      if (idx !== undefined && bus.status === 'on') {
        let qGenOutput = bus.qGenOutput || 0;
        
        // 発電機の無効電力計算
        if (bus.type === 'gen' && bus.vControlled) {
          qGenOutput = Q_calc[idx] + (bus.qLoad || 0);
          qGenOutput = Math.max(bus.qGenMin, Math.min(bus.qGenMax, qGenOutput));
        }
        
        return {
          ...bus,
          voltage: V[idx],
          angle: theta[idx],
          qGenOutput
        };
      }
      return bus;
    });

    // 電圧安定性マージン計算
    const stabilityMargin = calculateVoltageStabilityMargin(updatedBuses, updatedLines);

    return { 
      buses: updatedBuses, 
      lines: updatedLines, 
      converged, 
      flowDetails: logChanges ? createFlowDetails(updatedBuses) : [],
      stabilityMargin
    };
  };

  // 複素数演算ヘルパー関数
  const complexAdd = (a, b) => ({ real: a.real + b.real, imag: a.imag + b.imag });
  const complexSubtract = (a, b) => ({ real: a.real - b.real, imag: a.imag - b.imag });
  const complexMultiply = (a, b) => ({ 
    real: a.real * b.real - a.imag * b.imag, 
    imag: a.real * b.imag + a.imag * b.real 
  });
  const complexDivide = (a, b) => {
    const denom = b.real * b.real + b.imag * b.imag;
    return { 
      real: (a.real * b.real + a.imag * b.imag) / denom,
      imag: (a.imag * b.real - a.real * b.imag) / denom
    };
  };

  const calculatePQ = (V, theta, Y, n) => {
    const P_calc = Array(n).fill(0);
    const Q_calc = Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const G_ij = Y[i][j].real;
        const B_ij = Y[i][j].imag;
        const theta_ij = theta[i] - theta[j];
        
        P_calc[i] += V[i] * V[j] * (G_ij * Math.cos(theta_ij) + B_ij * Math.sin(theta_ij));
        Q_calc[i] += V[i] * V[j] * (G_ij * Math.sin(theta_ij) - B_ij * Math.cos(theta_ij));
      }
    }
    
    return { P_calc, Q_calc };
  };

  const calculateJacobian = (V, theta, Y, n, buses) => {
    // 簡略化されたヤコビアン（実際にはより複雑）
    const size = buses.filter(b => b.type !== 'gen' || !b.vControlled).length + 
                 buses.filter(b => b.type === 'load' || (b.type === 'gen' && !b.vControlled)).length;
    return Array(size).fill(0).map(() => Array(size).fill(0.1)); // 簡易実装
  };

  const solveLinearSystem = (A, b) => {
    // ガウス消去法の簡易実装
    const n = b.length;
    const x = Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
      x[i] = b[i] / (A[i][i] || 1); // 簡略化
    }
    
    return x;
  };

  const calculateLinePowerFlow = (linesData, busesData, V, theta, busIdToIndex) => {
    return linesData.map(line => {
      if (line.status === 'off') return { ...line, flow: 0, qFlow: 0 };
      
      const fromIdx = busIdToIndex[line.from];
      const toIdx = busIdToIndex[line.to];
      
      if (fromIdx === undefined || toIdx === undefined) return { ...line, flow: 0, qFlow: 0 };
      
      const V_from = V[fromIdx];
      const V_to = V[toIdx];
      const theta_from = theta[fromIdx];
      const theta_to = theta[toIdx];
      const theta_diff = theta_from - theta_to;
      
      const G = line.r / (line.r * line.r + line.x * line.x);
      const B = -line.x / (line.r * line.r + line.x * line.x);
      
      const P_flow = V_from * V_from * G - V_from * V_to * (G * Math.cos(theta_diff) + B * Math.sin(theta_diff));
      const Q_flow = -V_from * V_from * (B + line.b/2) - V_from * V_to * (G * Math.sin(theta_diff) - B * Math.cos(theta_diff));
      
      return { ...line, flow: P_flow, qFlow: Q_flow };
    });
  };

  const calculateVoltageStabilityMargin = (busesData, linesData) => {
    // 簡易電圧安定性マージン計算
    const loadBuses = busesData.filter(b => b.type === 'load' && b.status === 'on');
    const minVoltage = Math.min(...loadBuses.map(b => b.voltage));
    const criticalBus = loadBuses.find(b => b.voltage === minVoltage);
    
    const pMargin = Math.max(0, (minVoltage - 0.85) * 100); // 簡易計算
    const qMargin = Math.max(0, (minVoltage - 0.90) * 100); // 簡易計算
    
    return { pMargin, qMargin, criticalBus };
  };

  const createFlowDetails = (busesData) => {
    return busesData.filter(b => b.type === 'gen' && b.status === 'on').map(bus => ({
      name: bus.name,
      pOutput: (bus.genOutput || 0).toFixed(1),
      qOutput: (bus.qGenOutput || 0).toFixed(1),
      voltage: bus.voltage.toFixed(3),
      qPercent: ((Math.abs(bus.qGenOutput || 0) / Math.max(bus.qGenMax, 1)) * 100).toFixed(1),
      status: bus.qGenOutput >= bus.qGenMax * 0.95 ? 'Q-Limit' : 'Normal'
    }));
  };

  const executeNextStep = () => {
    setHistory(prev => [...prev, {
      step: currentStep,
      buses: JSON.parse(JSON.stringify(buses)),
      lines: JSON.parse(JSON.stringify(lines)),
      eventLog: [...eventLog],
      warning: cascadeWarning
    }]);
    
    if (currentStep === 0) {
      const result = calculateNewtonRaphsonPowerFlow(buses, lines, true);
      setBuses(result.buses);
      setLines(result.lines);
      setPowerFlowConverged(result.converged);
      setVoltageStabilityMargin(result.stabilityMargin);
      
      setCascadeWarning('⚡ 初期状態：電圧安定性解析開始');
      setEventLog([`🟢 初期潮流計算完了（収束: ${result.converged ? 'YES' : 'NO'}）`]);
      setCurrentStep(1);
      
    } else if (currentStep === 1) {
      const scenario = scenarios[selectedScenario];
      let updatedBuses = [...buses];
      let updatedLines = [...lines];
      
      if (scenario.type === 'load_increase') {
        updatedBuses = buses.map(bus => 
          bus.id === scenario.targetBus ? { 
            ...bus, 
            pLoad: bus.pLoad * scenario.increaseRate,
            qLoad: bus.qLoad * scenario.increaseRate
          } : bus
        );
        setCascadeWarning(`⚡ 負荷急増開始：${scenario.description}`);
        setEventLog(prev => [...prev, `⚠️ ${scenario.name}`]);
        
      } else if (scenario.type === 'q_limit') {
        updatedBuses = buses.map(bus => 
          bus.id === scenario.targetBus ? { 
            ...bus, 
            qGenMax: Math.min(bus.qGenMax, bus.qGenOutput + 10)
          } : bus
        );
        setCascadeWarning(`🔋 励磁限界到達：${scenario.description}`);
        setEventLog(prev => [...prev, `⚠️ ${scenario.name}`]);
        
      } else if (scenario.type === 'line_trip') {
        updatedLines = lines.map(line =>
          line.id === scenario.targetLine ? { ...line, status: 'off', flow: 0, qFlow: 0 } : line
        );
        setCascadeWarning(`📉 送電線事故：${scenario.description}`);
        setEventLog(prev => [...prev, `⚠️ ${scenario.name}`]);
      }
      
      const result = calculateNewtonRaphsonPowerFlow(updatedBuses, updatedLines, true);
      setBuses(result.buses);
      setLines(result.lines);
      setPowerFlowConverged(result.converged);
      setVoltageStabilityMargin(result.stabilityMargin);
      
      setCurrentStep(2);
      
    } else if (currentStep >= 2 && currentStep < 30) {
      let cascadeOccurred = false;
      let updatedBuses = [...buses];
      let updatedLines = [...lines];
      
      // 電圧崩壊チェック
      updatedBuses.forEach(bus => {
        if (bus.voltage < voltageThreshold && bus.status === 'on') {
          if (bus.type === 'load') {
            updatedBuses = updatedBuses.map(b => 
              b.id === bus.id ? { ...b, status: 'off' } : b
            );
            setEventLog(prev => [...prev, `🔴 電圧崩壊: ${bus.name} (V=${bus.voltage.toFixed(3)})`]);
            cascadeOccurred = true;
          }
        }
      });
      
      // 発電機無効電力限界チェック
      updatedBuses.forEach(bus => {
        if (bus.type === 'gen' && bus.status === 'on' && bus.qGenOutput >= bus.qGenMax * 0.98) {
          updatedBuses = updatedBuses.map(b => 
            b.id === bus.id ? { ...b, vControlled: false, voltage: 1.0 } : b
          );
          setEventLog(prev => [...prev, `🔋 無効電力限界: ${bus.name}`]);
          cascadeOccurred = true;
        }
      });
      
      if (cascadeOccurred) {
        const result = calculateNewtonRaphsonPowerFlow(updatedBuses, updatedLines, true);
        setBuses(result.buses);
        setLines(result.lines);
        setPowerFlowConverged(result.converged);
        setVoltageStabilityMargin(result.stabilityMargin);
        
        if (!result.converged) {
          setCascadeWarning('💥 潮流計算発散：システム崩壊');
          setIsAutoMode(false);
        } else {
          setCascadeWarning(`⚡ 電圧不安定継続中 (マージン: ${result.stabilityMargin.pMargin.toFixed(1)}%)`);
        }
        
        setCurrentStep(prev => prev + 1);
      } else {
        const minVoltage = Math.min(...buses.filter(b => b.status === 'on').map(b => b.voltage));
        if (minVoltage < voltageThreshold) {
          setCascadeWarning('💥 電圧崩壊：システム不安定');
        } else {
          setCascadeWarning(`✅ 電圧安定化（最低電圧: ${minVoltage.toFixed(3)}p.u.）`);
        }
        setIsAutoMode(false);
      }
    }
  };

  useEffect(() => {
    if (isAutoMode && currentStep < 30) {
      const timer = setTimeout(executeNextStep, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoMode, currentStep]);

  const reset = () => {
    setBuses(initialSystemData.buses);
    setLines(initialSystemData.lines);
    setHistory([]);
    setCurrentStep(0);
    setEventLog([]);
    setIsAutoMode(false);
    setCascadeWarning('');
    setPowerFlowConverged(true);
    setVoltageStabilityMargin({ pMargin: 0, qMargin: 0, criticalBus: null });
  };

  const getBusColor = (bus) => {
    if (bus.status === 'off') return '#374151';
    
    const voltageLevel = bus.voltage;
    if (voltageLevel < 0.90) return '#dc2626'; // 危険（赤）
    if (voltageLevel < 0.95) return '#f97316'; // 警告（橙）
    if (voltageLevel > 1.10) return '#fbbf24'; // 高電圧（黄）
    
    switch (bus.type) {
      case 'gen': return '#3b82f6'; // 青
      case 'load': return '#8b5cf6'; // 紫
      case 'svc': return '#10b981'; // 緑
      case 'renewable': return '#06d6a0'; // シアン
      default: return '#64748b'; // グレー
    }
  };

  const getLineColor = (line) => {
    if (line.status === 'off') return '#666';
    const loadFactor = Math.abs(line.flow) / line.capacity;
    if (loadFactor > 1.0) return '#dc2626';
    if (loadFactor > 0.9) return '#f97316';
    if (loadFactor > 0.8) return '#fbbf24';
    return line.type === 'tie' ? '#06b6d4' : line.type === 'long_distance' ? '#f43f5e' : '#10b981';
  };

  const canvasWidth = 1400;
  const canvasHeight = 450;

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-[1900px] mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <TrendingDown className="text-red-500" size={32} />
            電圧安定性・無効電力解析シミュレーション
          </h1>
          <p className="text-sm text-cyan-400 font-semibold">
            ニュートン・ラプソン法AC潮流 | 電圧崩壊解析 | 無効電力制約 | 電圧安定性マージン
          </p>
        </div>

        {cascadeWarning && (
          <div className={`bg-gradient-to-r ${
            cascadeWarning.includes('💥') ? 'from-red-900 to-red-700' :
            cascadeWarning.includes('⚡') ? 'from-orange-900 to-red-800' :
            'from-blue-900 to-blue-700'
          } rounded-xl p-4 mb-4 shadow-2xl border-2 border-red-500`}>
            <div className="text-xl font-bold text-center animate-pulse">
              {cascadeWarning}
            </div>
            {voltageStabilityMargin.criticalBus && (
              <div className="text-center mt-2 text-sm">
                危険バス: {voltageStabilityMargin.criticalBus.name} | 
                Pマージン: {voltageStabilityMargin.pMargin.toFixed(1)}% | 
                Qマージン: {voltageStabilityMargin.qMargin.toFixed(1)}%
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">電圧不安定シナリオ</label>
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
              <label className="block text-sm font-medium mb-2">
                電圧下限: {voltageThreshold.toFixed(2)}p.u.
              </label>
              <input
                type="range"
                min="0.85"
                max="0.95"
                step="0.01"
                value={voltageThreshold}
                onChange={(e) => setVoltageThreshold(Number(e.target.value))}
                disabled={currentStep > 0}
                className="w-full h-2 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                過負荷閾値: {(relayThreshold * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="100"
                max="110"
                value={relayThreshold * 100}
                onChange={(e) => setRelayThreshold(Number(e.target.value) / 100)}
                disabled={currentStep > 0}
                className="w-full h-2 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <button
              onClick={() => history.length > 0 && setBuses(history[history.length - 1].buses)}
              disabled={history.length === 0}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2 font-bold"
            >
              <ChevronLeft size={20} />
              戻る
            </button>
            
            <button
              onClick={executeNextStep}
              disabled={currentStep >= 30 || isAutoMode}
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
              disabled={currentStep >= 30}
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
              ステップ: {currentStep} / 30
            </span>
            <div className="flex gap-3 text-sm">
              <span className={`px-3 py-1 rounded ${powerFlowConverged ? 'bg-green-700' : 'bg-red-700'}`}>
                潮流収束: {powerFlowConverged ? 'OK' : 'NG'}
              </span>
              <button
                onClick={() => setShowVoltageContours(!showVoltageContours)}
                className={`px-3 py-1 rounded transition ${showVoltageContours ? 'bg-cyan-600' : 'bg-gray-600'}`}
              >
                <TrendingDown size={16} className="inline mr-1" />
                電圧表示
              </button>
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
              >
                <Info size={16} />
                凡例
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Battery size={18} />
              電力系統図（電圧・無効電力）
            </h2>
            <div className="overflow-x-auto">
              <svg width={canvasWidth} height={canvasHeight} className="bg-gray-900 rounded">
                {/* 地域背景 */}
                <rect x="50" y="50" width="400" height="280" fill="#1e3a5f" opacity="0.3" rx="10" />
                <text x="250" y="35" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">地域A（工業）</text>
                
                <rect x="500" y="50" width="400" height="280" fill="#3a1e5f" opacity="0.3" rx="10" />
                <text x="700" y="35" fill="#a78bfa" fontSize="14" fontWeight="bold" textAnchor="middle">地域B（都市）</text>
                
                <rect x="950" y="50" width="300" height="280" fill="#1e5f3a" opacity="0.3" rx="10" />
                <text x="1100" y="35" fill="#4ade80" fontSize="14" fontWeight="bold" textAnchor="middle">地域C（農村）</text>
                
                <rect x="1150" y="280" width="200" height="150" fill="#5f1e1e" opacity="0.3" rx="10" />
                <text x="1250" y="270" fill="#fca5a5" fontSize="14" fontWeight="bold" textAnchor="middle">遠方負荷</text>

                {/* 送電線 */}
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
                        strokeWidth={line.type === 'long_distance' ? 6 : line.status === 'off' ? 1 : 4}
                        opacity={line.status === 'off' ? 0.3 : 0.9}
                        strokeDasharray={line.type === 'tie' ? '10,10' : line.type === 'long_distance' ? '15,5' : '0'}
                      />
                      
                      {/* 潮流値表示 */}
                      {Math.abs(line.flow) > 5 && (
                        <text 
                          x={(fromBus.x + toBus.x) / 2} 
                          y={(fromBus.y + toBus.y) / 2 - 8} 
                          fill="#fbbf24" 
                          fontSize="9" 
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          P:{line.flow.toFixed(0)}
                        </text>
                      )}
                      {Math.abs(line.qFlow) > 2 && (
                        <text 
                          x={(fromBus.x + toBus.x) / 2} 
                          y={(fromBus.y + toBus.y) / 2 + 15} 
                          fill="#a78bfa" 
                          fontSize="9" 
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          Q:{line.qFlow.toFixed(0)}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* バス */}
                {buses.map(bus => {
                  const shouldBlink = bus.voltage < voltageThreshold && Math.floor(time / 4) % 2 === 0;
                  const busColor = shouldBlink ? '#ff0000' : getBusColor(bus);
                  
                  return (
                    <g key={bus.id}>
                      {/* 電圧危険レベル表示 */}
                      {bus.voltage < 0.95 && bus.status === 'on' && (
                        <circle
                          cx={bus.x}
                          cy={bus.y}
                          r={35}
                          fill="none"
                          stroke={bus.voltage < voltageThreshold ? "#ff0000" : "#f97316"}
                          strokeWidth={3}
                          opacity={0.7}
                        />
                      )}
                      
                      {/* バス形状 */}
                      {bus.type === 'gen' || bus.type === 'renewable' ? (
                        <circle
                          cx={bus.x}
                          cy={bus.y}
                          r={bus.type === 'renewable' ? 18 : 22}
                          fill={busColor}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      ) : bus.type === 'svc' ? (
                        <polygon
                          points={`${bus.x-15},${bus.y+10} ${bus.x+15},${bus.y+10} ${bus.x},${bus.y-15}`}
                          fill={busColor}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      ) : bus.type === 'load' ? (
                        <rect
                          x={bus.x - 16}
                          y={bus.y - 16}
                          width={32}
                          height={32}
                          fill={busColor}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      ) : (
                        <polygon
                          points={`${bus.x},${bus.y-12} ${bus.x+10},${bus.y+6} ${bus.x-10},${bus.y+6}`}
                          fill={busColor}
                          stroke="white"
                          strokeWidth={2}
                          opacity={bus.status === 'off' ? 0.3 : 1}
                        />
                      )}
                      
                      {/* 停止表示 */}
                      {bus.status === 'off' && (
                        <>
                          <line x1={bus.x - 20} y1={bus.y - 20} x2={bus.x + 20} y2={bus.y + 20} stroke="#000" strokeWidth={4} />
                          <line x1={bus.x - 20} y1={bus.y + 20} x2={bus.x + 20} y2={bus.y - 20} stroke="#000" strokeWidth={4} />
                        </>
                      )}
                      
                      {/* バス名 */}
                      <text x={bus.x} y={bus.y - 35} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {bus.name}
                      </text>
                      
                      {/* 電圧表示 */}
                      {showVoltageContours && bus.status === 'on' && (
                        <text 
                          x={bus.x} 
                          y={bus.y + 35} 
                          fill={bus.voltage < voltageThreshold ? '#ff4444' : bus.voltage < 0.95 ? '#fbbf24' : '#4ade80'} 
                          fontSize="11" 
                          fontWeight="bold" 
                          textAnchor="middle"
                        >
                          {bus.voltage.toFixed(3)}
                        </text>
                      )}
                      
                      {/* 発電機情報 */}
                      {(bus.type === 'gen' || bus.type === 'renewable') && bus.status === 'on' && (
                        <>
                          <text x={bus.x} y={bus.y + 50} fill="#60a5fa" fontSize="9" textAnchor="middle">
                            P:{(bus.genOutput || 0).toFixed(0)}
                          </text>
                          {(bus.qGenOutput !== undefined && Math.abs(bus.qGenOutput) > 1) && (
                            <text 
                              x={bus.x} 
                              y={bus.y + 62} 
                              fill={Math.abs(bus.qGenOutput) >= bus.qGenMax * 0.95 ? '#ff4444' : '#a78bfa'} 
                              fontSize="9" 
                              textAnchor="middle"
                            >
                              Q:{bus.qGenOutput.toFixed(0)}
                            </text>
                          )}
                        </>
                      )}
                      
                      {/* 負荷情報 */}
                      {bus.type === 'load' && bus.status === 'on' && (
                        <>
                          <text x={bus.x} y={bus.y + 50} fill="#c084fc" fontSize="9" textAnchor="middle">
                            {bus.pLoad.toFixed(0)}MW
                          </text>
                          <text x={bus.x} y={bus.y + 62} fill="#a78bfa" fontSize="9" textAnchor="middle">
                            {bus.qLoad.toFixed(0)}Mvar
                          </text>
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <circle cx="10" cy="10" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
                    <span>発電機</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <rect x="2" y="2" width="16" height="16" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                    <span>負荷</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <polygon points="10,2 18,18 2,18" fill="#10b981" stroke="white" strokeWidth="2" />
                    <span>SVC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <circle cx="10" cy="10" r="6" fill="#06d6a0" stroke="white" strokeWidth="2" />
                    <span>風力</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">V&lt;0.90</span>
                    <span>電圧危険</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
                  <p><strong>電圧安定性マージン:</strong> 電圧崩壊までの余裕度</p>
                  <p><strong>無効電力制約:</strong> 発電機励磁限界とSVC容量</p>
                  <p><strong>長距離送電線:</strong> 高インピーダンスによる電圧降下</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3">電圧・無効電力状態</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {buses.filter(b => b.type === 'gen' || b.type === 'svc' || b.type === 'renewable').map(bus => (
                <div key={bus.id} className={`p-2 rounded text-xs ${
                  bus.status === 'off' ? 'bg-gray-900 opacity-50' :
                  bus.voltage < voltageThreshold ? 'bg-red-900/40 border border-red-500' :
                  (bus.qGenOutput && Math.abs(bus.qGenOutput) >= bus.qGenMax * 0.95) ? 'bg-yellow-900/40 border border-yellow-500' :
                  'bg-gray-900'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{bus.name}</span>
                    {bus.status === 'on' ? (
                      <span className={`font-mono font-bold ${
                        bus.voltage < voltageThreshold ? 'text-red-400' :
                        bus.voltage < 0.95 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {bus.voltage.toFixed(3)}
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold">停止</span>
                    )}
                  </div>
                  {bus.status === 'on' && (
                    <>
                      {bus.type === 'gen' && (
                        <div className="text-gray-400 mt-1">
                          P: {(bus.genOutput || 0).toFixed(0)}MW / {bus.genCapacity}MW
                        </div>
                      )}
                      {(bus.qGenOutput !== undefined) && (
                        <div className={`text-gray-400 ${
                          Math.abs(bus.qGenOutput) >= bus.qGenMax * 0.95 ? 'text-red-400 font-bold' : ''
                        }`}>
                          Q: {bus.qGenOutput.toFixed(0)} / {bus.qGenMax}Mvar
                        </div>
                      )}
                      {bus.vControlled !== undefined && (
                        <div className="text-gray-500 text-xs">
                          電圧制御: {bus.vControlled ? 'ON' : 'OFF'}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-900 rounded">
              <h3 className="font-bold text-sm mb-2">負荷バス電圧</h3>
              {buses.filter(b => b.type === 'load' && b.status === 'on').map(bus => (
                <div key={bus.id} className="flex justify-between text-xs mb-1">
                  <span>{bus.name}</span>
                  <span className={
                    bus.voltage < voltageThreshold ? 'text-red-400 font-bold' :
                    bus.voltage < 0.95 ? 'text-yellow-400' :
                    'text-green-400'
                  }>
                    {bus.voltage.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3">電圧安定性・イベントログ</h2>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {eventLog.map((event, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-xs font-medium ${
                  event.includes('🔴') || event.includes('💥')
                    ? 'bg-red-900/40 border-l-4 border-red-500'
                    : event.includes('🔋')
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

export default EnhancedVoltageStabilitySimulation;