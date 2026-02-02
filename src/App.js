import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const BitcoinComprehensiveHSATracker = () => {
  const [contributionAmount, setContributionAmount] = useState(500);
  const [contributionType, setContributionType] = useState('individual'); // individual, family, catchup
const [companyMatch, setCompanyMatch] = useState(0);

// Add this new useEffect here:
useEffect(() => {
  const maxMonthly = Math.floor(getYearlyLimit(2026) / 12);
  if (contributionAmount > maxMonthly) {
    setContributionAmount(maxMonthly);
  }
}, [contributionType]); // eslint-disable-line react-hooks/exhaustive-deps
  const [selectedMetric, setSelectedMetric] = useState('return');
  const [lookbackPeriod, setLookbackPeriod] = useState('1');
  const [projectionCAGR, setProjectionCAGR] = useState(25);
  const [activeTab, setActiveTab] = useState('current'); // current, lookback, projections

  // HSA contribution limits
  const hsaLimits = {
    individual: { 2024: 4150, 2025: 4300, 2026: 4400 },
    family: { 2024: 8300, 2025: 8550, 2026: 8750 },
    catchup: 1000
  };
  
  const getYearlyLimit = (year) => {
    const limit = hsaLimits[contributionType][year] || hsaLimits[contributionType][2026];
    const catchup = contributionType === 'catchup' ? hsaLimits.catchup : 0;
    return limit + catchup;
  };
  
  const getMonthlyLimit = (year) => {
    return Math.floor(getYearlyLimit(year) / 12);
  };
  
  // Historical price data
  const historicalPrices = {
    btc: {
      '2020-01-11': 8160,
      '2021-01-11': 35789,
      '2022-01-11': 42744,
      '2023-01-11': 17622,
      '2024-01-11': 46700,
      '2024-02-01': 43000,
      '2024-03-01': 62000,
      '2024-04-01': 70000,
      '2024-05-01': 64000,
      '2024-06-01': 67000,
      '2024-07-01': 62000,
      '2024-08-01': 59000,
      '2024-09-01': 63000,
      '2024-10-01': 68000,
      '2024-11-01': 91000,
      '2024-12-01': 98000,
      '2025-01-01': 101000,
      '2025-02-01': 97000,
      '2025-03-01': 103000,
      '2025-04-01': 109000,
      '2025-05-01': 104000,
      '2025-06-01': 108000,
      '2025-07-01': 115000,
      '2025-08-01': 112000,
      '2025-09-01': 118000,
      '2025-10-01': 125000,
      '2025-11-01': 121000,
      '2025-12-01': 127000,
      '2026-01-01': 130000,
      '2026-01-26': 105000
    },
    spy: {
      '2020-01-11': 330,
      '2021-01-11': 380,
      '2022-01-11': 465,
      '2023-01-11': 390,
      '2024-01-11': 475,
      '2024-02-01': 485,
      '2024-03-01': 510,
      '2024-04-01': 505,
      '2024-05-01': 520,
      '2024-06-01': 535,
      '2024-07-01': 545,
      '2024-08-01': 530,
      '2024-09-01': 550,
      '2024-10-01': 565,
      '2024-11-01': 580,
      '2024-12-01': 595,
      '2025-01-01': 600,
      '2025-02-01': 590,
      '2025-03-01': 605,
      '2025-04-01': 615,
      '2025-05-01': 608,
      '2025-06-01': 620,
      '2025-07-01': 630,
      '2025-08-01': 625,
      '2025-09-01': 638,
      '2025-10-01': 645,
      '2025-11-01': 640,
      '2025-12-01': 655,
      '2026-01-01': 660,
      '2026-01-26': 668
    },
    mag7: {
      '2020-01-11': 100,
      '2021-01-11': 165,
      '2022-01-11': 242,
      '2023-01-11': 180,
      '2024-01-11': 298,
      '2024-02-01': 305,
      '2024-03-01': 328,
      '2024-04-01': 320,
      '2024-05-01': 335,
      '2024-06-01': 352,
      '2024-07-01': 368,
      '2024-08-01': 358,
      '2024-09-01': 375,
      '2024-10-01': 392,
      '2024-11-01': 408,
      '2024-12-01': 425,
      '2025-01-01': 432,
      '2025-02-01': 428,
      '2025-03-01': 442,
      '2025-04-01': 455,
      '2025-05-01': 448,
      '2025-06-01': 462,
      '2025-07-01': 478,
      '2025-08-01': 472,
      '2025-09-01': 485,
      '2025-10-01': 498,
      '2025-11-01': 492,
      '2025-12-01': 508,
      '2026-01-01': 515,
      '2026-01-26': 522
    },
    gold: {
      '2020-01-11': 1550,
      '2021-01-11': 1850,
      '2022-01-11': 1815,
      '2023-01-11': 1925,
      '2024-01-11': 2040,
      '2024-02-01': 2050,
      '2024-03-01': 2160,
      '2024-04-01': 2340,
      '2024-05-01': 2380,
      '2024-06-01': 2320,
      '2024-07-01': 2415,
      '2024-08-01': 2520,
      '2024-09-01': 2630,
      '2024-10-01': 2740,
      '2024-11-01': 2670,
      '2024-12-01': 2625,
      '2025-01-01': 2665,
      '2025-02-01': 2710,
      '2025-03-01': 2748,
      '2025-04-01': 2820,
      '2025-05-01': 2795,
      '2025-06-01': 2855,
      '2025-07-01': 2910,
      '2025-08-01': 2880,
      '2025-09-01': 2945,
      '2025-10-01': 3010,
      '2025-11-01': 2985,
      '2025-12-01': 3045,
      '2026-01-01': 3080,
      '2026-01-26': 3095
    },
    silver: {
      '2020-01-11': 18.0,
      '2021-01-11': 25.0,
      '2022-01-11': 22.5,
      '2023-01-11': 23.8,
      '2024-01-11': 23.2,
      '2024-02-01': 23.5,
      '2024-03-01': 25.2,
      '2024-04-01': 27.8,
      '2024-05-01': 29.5,
      '2024-06-01': 29.2,
      '2024-07-01': 30.8,
      '2024-08-01': 32.5,
      '2024-09-01': 34.2,
      '2024-10-01': 34.8,
      '2024-11-01': 33.5,
      '2024-12-01': 32.8,
      '2025-01-01': 33.5,
      '2025-02-01': 34.2,
      '2025-03-01': 35.0,
      '2025-04-01': 36.2,
      '2025-05-01': 35.8,
      '2025-06-01': 36.8,
      '2025-07-01': 37.5,
      '2025-08-01': 37.0,
      '2025-09-01': 38.2,
      '2025-10-01': 39.0,
      '2025-11-01': 38.5,
      '2025-12-01': 39.5,
      '2026-01-01': 40.0,
      '2026-01-26': 40.2
    }
  };
  
  const interpolatePrice = (prices, date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (prices[dateStr]) return prices[dateStr];
    
    const sortedDates = Object.keys(prices).sort();
    let before = null, after = null;
    
    for (let i = 0; i < sortedDates.length - 1; i++) {
      if (new Date(sortedDates[i]) <= date && new Date(sortedDates[i + 1]) > date) {
        before = { date: new Date(sortedDates[i]), price: prices[sortedDates[i]] };
        after = { date: new Date(sortedDates[i + 1]), price: prices[sortedDates[i + 1]] };
        break;
      }
    }
    
    if (!before || !after) return prices[sortedDates[sortedDates.length - 1]];
    
    const ratio = (date - before.date) / (after.date - before.date);
    return before.price + (after.price - before.price) * ratio;
  };
  
  // Generate current performance data (ETF approval to now)
  const generateCurrentData = () => {
    const startDate = new Date('2024-01-11');
    const endDate = new Date('2026-01-26');
    const data = [];
    
    let btcUnits = 0, spyUnits = 0, mag7Units = 0, goldUnits = 0, silverUnits = 0;
    let btcInvested = 0, spyInvested = 0, mag7Invested = 0, goldInvested = 0, silverInvested = 0;
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const btcPrice = interpolatePrice(historicalPrices.btc, currentDate);
      const spyPrice = interpolatePrice(historicalPrices.spy, currentDate);
      const mag7Price = interpolatePrice(historicalPrices.mag7, currentDate);
      const goldPrice = interpolatePrice(historicalPrices.gold, currentDate);
      const silverPrice = interpolatePrice(historicalPrices.silver, currentDate);
      
      const year = currentDate.getFullYear();
      const monthlyContribution = Math.min(contributionAmount, getMonthlyLimit(year));
      const totalMonthlyContribution = monthlyContribution + companyMatch;
      
      if (currentDate.getDate() === 11 || (currentDate.getTime() === startDate.getTime())) {
        btcInvested += totalMonthlyContribution;
        spyInvested += totalMonthlyContribution;
        mag7Invested += totalMonthlyContribution;
        goldInvested += totalMonthlyContribution;
        silverInvested += totalMonthlyContribution;
        
        btcUnits += totalMonthlyContribution / btcPrice;
        spyUnits += totalMonthlyContribution / spyPrice;
        mag7Units += totalMonthlyContribution / mag7Price;
        goldUnits += totalMonthlyContribution / goldPrice;
        silverUnits += totalMonthlyContribution / silverPrice;
      }
      
      const btcValue = btcUnits * btcPrice;
      const spyValue = spyUnits * spyPrice;
      const mag7Value = mag7Units * mag7Price;
      const goldValue = goldUnits * goldPrice;
      const silverValue = silverUnits * silverPrice;
      
      const btcReturn = btcInvested > 0 ? ((btcValue - btcInvested) / btcInvested) * 100 : 0;
      const spyReturn = spyInvested > 0 ? ((spyValue - spyInvested) / spyInvested) * 100 : 0;
      const mag7Return = mag7Invested > 0 ? ((mag7Value - mag7Invested) / mag7Invested) * 100 : 0;
      const goldReturn = goldInvested > 0 ? ((goldValue - goldInvested) / goldInvested) * 100 : 0;
      const silverReturn = silverInvested > 0 ? ((silverValue - silverInvested) / silverInvested) * 100 : 0;
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        btcReturn: parseFloat(btcReturn.toFixed(2)),
        spyReturn: parseFloat(spyReturn.toFixed(2)),
        mag7Return: parseFloat(mag7Return.toFixed(2)),
        goldReturn: parseFloat(goldReturn.toFixed(2)),
        silverReturn: parseFloat(silverReturn.toFixed(2)),
        btcValue: parseFloat(btcValue.toFixed(2)),
        spyValue: parseFloat(spyValue.toFixed(2)),
        mag7Value: parseFloat(mag7Value.toFixed(2)),
        goldValue: parseFloat(goldValue.toFixed(2)),
        silverValue: parseFloat(silverValue.toFixed(2)),
        btcInvested,
        spyInvested,
        mag7Invested,
        goldInvested,
        silverInvested
      });
      
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return data;
  };
  
  // Generate lookback data (1, 2, or 3 years ago)
  const generateLookbackData = (years) => {
    const endDate = new Date('2026-01-26');
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - years);
    
    const data = [];
    
    let btcUnits = 0, spyUnits = 0, mag7Units = 0, goldUnits = 0, silverUnits = 0;
    let btcInvested = 0, spyInvested = 0, mag7Invested = 0, goldInvested = 0, silverInvested = 0;
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const btcPrice = interpolatePrice(historicalPrices.btc, currentDate);
      const spyPrice = interpolatePrice(historicalPrices.spy, currentDate);
      const mag7Price = interpolatePrice(historicalPrices.mag7, currentDate);
      const goldPrice = interpolatePrice(historicalPrices.gold, currentDate);
      const silverPrice = interpolatePrice(historicalPrices.silver, currentDate);
      
      const year = currentDate.getFullYear();
      const monthlyContribution = Math.min(contributionAmount, getMonthlyLimit(year));
      const totalMonthlyContribution = monthlyContribution + companyMatch;
      
      if (currentDate.getDate() === 26 || (currentDate.getTime() === startDate.getTime())) {
        btcInvested += totalMonthlyContribution;
        spyInvested += totalMonthlyContribution;
        mag7Invested += totalMonthlyContribution;
        goldInvested += totalMonthlyContribution;
        silverInvested += totalMonthlyContribution;
        
        btcUnits += totalMonthlyContribution / btcPrice;
        spyUnits += totalMonthlyContribution / spyPrice;
        mag7Units += totalMonthlyContribution / mag7Price;
        goldUnits += totalMonthlyContribution / goldPrice;
        silverUnits += totalMonthlyContribution / silverPrice;
      }
      
      const btcValue = btcUnits * btcPrice;
      const spyValue = spyUnits * spyPrice;
      const mag7Value = mag7Units * mag7Price;
      const goldValue = goldUnits * goldPrice;
      const silverValue = silverUnits * silverPrice;
      
      const btcReturn = btcInvested > 0 ? ((btcValue - btcInvested) / btcInvested) * 100 : 0;
      const spyReturn = spyInvested > 0 ? ((spyValue - spyInvested) / spyInvested) * 100 : 0;
      const mag7Return = mag7Invested > 0 ? ((mag7Value - mag7Invested) / mag7Invested) * 100 : 0;
      const goldReturn = goldInvested > 0 ? ((goldValue - goldInvested) / goldInvested) * 100 : 0;
      const silverReturn = silverInvested > 0 ? ((silverValue - silverInvested) / silverInvested) * 100 : 0;
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        btcReturn: parseFloat(btcReturn.toFixed(2)),
        spyReturn: parseFloat(spyReturn.toFixed(2)),
        mag7Return: parseFloat(mag7Return.toFixed(2)),
        goldReturn: parseFloat(goldReturn.toFixed(2)),
        silverReturn: parseFloat(silverReturn.toFixed(2)),
        btcValue: parseFloat(btcValue.toFixed(2)),
        spyValue: parseFloat(spyValue.toFixed(2)),
        mag7Value: parseFloat(mag7Value.toFixed(2)),
        goldValue: parseFloat(goldValue.toFixed(2)),
        silverValue: parseFloat(silverValue.toFixed(2)),
        invested: btcInvested
      });
      
      currentDate.setDate(currentDate.getDate() + 14);
    }
    
    return data;
  };
  
  // Generate 30-year projection data
  const generateProjectionData = () => {
    const startYear = 2026;
    const years = 30;
    const data = [];
    
    const year2026Limit = getYearlyLimit(2026);
    const annualContribution = Math.min(contributionAmount * 12, year2026Limit);
    const annualCompanyMatch = companyMatch * 12;
    const totalAnnualContribution = annualContribution + annualCompanyMatch;
    
    // Historical returns: SPY ~10%, BTC 5-year CAGR ~25%, but we'll use 60% as an optimistic historical scenario
    const spyCAGR = 10; // Historical average
    const btcHistoricalCAGR = 60; // Optimistic historical scenario (actual 5Y CAGR is ~25%)
    const btcConservativeCAGR = projectionCAGR; // User-adjustable conservative projection
    
    // Start with initial contribution for year 0
    let spyValue = totalAnnualContribution;
    let btcHistoricalValue = totalAnnualContribution;
    let btcConservativeValue = totalAnnualContribution;
    let totalInvested = totalAnnualContribution;
    
    // Add year 0
    data.push({
      year: startYear,
      spyValue: Math.round(spyValue),
      btcHistoricalValue: Math.round(btcHistoricalValue),
      btcConservativeValue: Math.round(btcConservativeValue),
      totalInvested: Math.round(totalInvested)
    });
    
    for (let i = 1; i <= years; i++) {
      const year = startYear + i;
      
      totalInvested += totalAnnualContribution;
      spyValue = (spyValue + totalAnnualContribution) * (1 + spyCAGR / 100);
      btcHistoricalValue = (btcHistoricalValue + totalAnnualContribution) * (1 + btcHistoricalCAGR / 100);
      btcConservativeValue = (btcConservativeValue + totalAnnualContribution) * (1 + btcConservativeCAGR / 100);
      
      data.push({
        year,
        spyValue: Math.round(spyValue),
        btcHistoricalValue: Math.round(btcHistoricalValue),
        btcConservativeValue: Math.round(btcConservativeValue),
        totalInvested: Math.round(totalInvested)
      });
    }
    
    return data;
  };
  
  const [currentData, setCurrentData] = useState([]);
  const [lookbackData, setLookbackData] = useState([]);
  const [projectionData, setProjectionData] = useState([]);
  
  useEffect(() => {
    setCurrentData(generateCurrentData());
    setLookbackData(generateLookbackData(parseInt(lookbackPeriod)));
    setProjectionData(generateProjectionData());
  }, [contributionAmount, contributionType, companyMatch, lookbackPeriod, projectionCAGR]);
  
  const latestData = currentData[currentData.length - 1] || {};
  const latestLookbackData = lookbackData[lookbackData.length - 1] || {};
  const finalProjectionData = projectionData[projectionData.length - 1] || {};
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(10, 10, 15, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '16px',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)'
        }}>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '11px', 
            marginBottom: '12px',
            fontFamily: '"JetBrains Mono", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              color: entry.color, 
              margin: '6px 0', 
              fontSize: '13px',
              fontWeight: '500'
            }}>
              {entry.name}: <strong>{typeof entry.value === 'number' ? 
                (entry.value > 1000 ? `$${(entry.value / 1000).toFixed(0)}k` : `${entry.value.toFixed(1)}%`) : 
                entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const maxContribution = getYearlyLimit(2026);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #050505 0%, #0a0a0f 50%, #0f0f14 100%)',
      color: '#ffffff',
      fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif',
      padding: '0',
      margin: '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(8, 8, 10, 0.85)',
        backdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '28px 60px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #f7931a 0%, #ff8c00 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                boxShadow: '0 12px 40px rgba(247, 147, 26, 0.35), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              }}>₿</div>
              <div>
                <h1 style={{
                  margin: '0',
                  fontSize: '36px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7931a 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px'
                }}>
                  Bitcoin HSA Analysis Suite
                </h1>
                <p style={{
                  margin: '6px 0 0',
                  fontSize: '13px',
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: '0.3px'
                }}>
                  Performance · Lookback · Projections • Powered by Sound HSA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '40px 60px' }}>
        
        {/* Controls Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.8) 0%, rgba(20, 20, 25, 0.6) 100%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ 
            margin: '0 0 24px', 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#e5e5e5',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Configuration
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {/* Contribution Amount */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Monthly Contribution
              </label>
              <input
                type="range"
                min="100"
                max={Math.floor(maxContribution / 12)}
                step="10"
                value={Math.min(contributionAmount, Math.floor(maxContribution / 12))}
                onChange={(e) => setContributionAmount(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'linear-gradient(to right, #f7931a, #ff6b35)',
                  borderRadius: '3px',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: '#f7931a'
                }}>
                  ${contributionAmount.toLocaleString()}
                </span>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  ${(contributionAmount * 12).toLocaleString()} / year
                </span>
              </div>
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#52525b',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                Max: ${Math.floor(maxContribution / 12).toLocaleString()}/mo (${maxContribution.toLocaleString()}/yr)
              </div>
            </div>
            
            {/* Company Match */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Company Match (Monthly)
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="25"
                value={companyMatch}
                onChange={(e) => setCompanyMatch(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'linear-gradient(to right, #34c759, #5ac8fa)',
                  borderRadius: '3px',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: '#34c759'
                }}>
                  ${companyMatch.toLocaleString()}
                </span>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  ${(companyMatch * 12).toLocaleString()} / year
                </span>
              </div>
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#52525b',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                Total: ${(contributionAmount + companyMatch).toLocaleString()}/mo (${((contributionAmount + companyMatch) * 12).toLocaleString()}/yr)
              </div>
            </div>
            
            {/* Contribution Type */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                HSA Type
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { value: 'individual', label: 'Individual', limit: `$${hsaLimits.individual[2026]}` },
                  { value: 'family', label: 'Family', limit: `$${hsaLimits.family[2026]}` },
                  { value: 'catchup', label: '55+ Catch-Up', limit: `$${hsaLimits.individual[2026] + hsaLimits.catchup}` }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => setContributionType(type.value)}
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: '14px 20px',
                      background: contributionType === type.value 
                        ? 'linear-gradient(135deg, #f7931a 0%, #ff6b35 100%)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: contributionType === type.value
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: contributionType === type.value
                        ? '0 6px 24px rgba(247, 147, 26, 0.4)'
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (contributionType !== type.value) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (contributionType !== type.value) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                  >
                    <div>{type.label}</div>
                    <div style={{ 
                      fontSize: '11px', 
                      opacity: 0.7,
                      marginTop: '4px',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}>
                      {type.limit}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          paddingBottom: '0'
        }}>
          {[
            { value: 'current', label: 'Current Performance', icon: '📊' },
            { value: 'lookback', label: 'Historical Lookback', icon: '🔍' },
            { value: 'projections', label: '30-Year Projections', icon: '🚀' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                padding: '16px 28px',
                background: activeTab === tab.value 
                  ? 'linear-gradient(135deg, rgba(247, 147, 26, 0.2) 0%, rgba(255, 107, 53, 0.15) 100%)'
                  : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.value
                  ? '3px solid #f7931a'
                  : '3px solid transparent',
                borderRadius: '0',
                color: activeTab === tab.value ? '#f7931a' : '#71717a',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.value) {
                  e.target.style.color = '#a1a1aa';
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.value) {
                  e.target.style.color = '#71717a';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Current Performance Tab */}
        {activeTab === 'current' && (
          <>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { label: 'Bitcoin', value: latestData.btcReturn, color: '#f7931a', portfolio: latestData.btcValue },
                { label: 'S&P 500', value: latestData.spyReturn, color: '#5ac8fa', portfolio: latestData.spyValue },
                { label: 'Mag 7', value: latestData.mag7Return, color: '#af52de', portfolio: latestData.mag7Value },
                { label: 'Gold', value: latestData.goldReturn, color: '#ffd60a', portfolio: latestData.goldValue },
                { label: 'Silver', value: latestData.silverReturn, color: '#c0c0c0', portfolio: latestData.silverValue }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                  border: `1px solid ${stat.color}30`,
                  borderRadius: '16px',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${stat.color}25 0%, transparent 70%)`,
                    borderRadius: '50%'
                  }}></div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: stat.color, 
                    marginBottom: '8px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: '700', 
                    marginBottom: '6px',
                    color: '#ffffff'
                  }}>
                    +{stat.value?.toFixed(2)}%
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#71717a',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}>
                    ${stat.portfolio?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart Controls */}
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  📊 Showing complete history since Bitcoin ETF approval
                </div>
                
                <div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#71717a', 
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    Display
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { value: 'return', label: '% Return' },
                      { value: 'value', label: '$ Value' }
                    ].map(metric => (
                      <button
                        key={metric.value}
                        onClick={() => setSelectedMetric(metric.value)}
                        style={{
                          padding: '10px 18px',
                          background: selectedMetric === metric.value 
                            ? 'linear-gradient(135deg, #5ac8fa 0%, #34c759 100%)'
                            : 'rgba(255, 255, 255, 0.04)',
                          border: selectedMetric === metric.value 
                            ? 'none'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease',
                          boxShadow: selectedMetric === metric.value 
                            ? '0 4px 16px rgba(90, 200, 250, 0.35)'
                            : 'none'
                        }}
                      >
                        {metric.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Chart */}
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: '36px',
              minHeight: '500px'
            }}>
              <div style={{
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{
                  margin: '0',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  Performance vs. Benchmarks
                </h2>
                <div style={{
                  fontSize: '12px',
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  Since ETF Approval • Jan 11, 2024
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    {['btc', 'spy', 'mag7', 'gold', 'silver'].map((asset, idx) => {
                      const colors = ['#f7931a', '#5ac8fa', '#af52de', '#ffd60a', '#c0c0c0'];
                      return (
                        <linearGradient key={asset} id={`${asset}Gradient`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors[idx]} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={colors[idx]} stopOpacity={0}/>
                        </linearGradient>
                      );
                    })}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#52525b"
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                    }}
                  />
                  <YAxis 
                    stroke="#52525b"
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                    tickFormatter={(value) => {
                      if (selectedMetric === 'return') {
                        return `${value}%`;
                      } else {
                        return `$${(value / 1000).toFixed(0)}k`;
                      }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '24px',
                      fontSize: '13px',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric === 'return' ? 'btcReturn' : 'btcValue'}
                    stroke="#f7931a" 
                    strokeWidth={3}
                    dot={false}
                    name="Bitcoin"
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric === 'return' ? 'spyReturn' : 'spyValue'}
                    stroke="#5ac8fa" 
                    strokeWidth={3}
                    dot={false}
                    name="S&P 500"
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric === 'return' ? 'mag7Return' : 'mag7Value'}
                    stroke="#af52de" 
                    strokeWidth={2.5}
                    dot={false}
                    name="Mag 7"
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric === 'return' ? 'goldReturn' : 'goldValue'}
                    stroke="#ffd60a" 
                    strokeWidth={2}
                    dot={false}
                    name="Gold"
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric === 'return' ? 'silverReturn' : 'silverValue'}
                    stroke="#c0c0c0" 
                    strokeWidth={2}
                    dot={false}
                    name="Silver"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
        
        {/* Historical Lookback Tab */}
        {activeTab === 'lookback' && (
          <>
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <div style={{ 
                fontSize: '11px', 
                color: '#71717a', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: '600'
              }}>
                Lookback Period
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['1', '2', '3'].map(years => (
                  <button
                    key={years}
                    onClick={() => setLookbackPeriod(years)}
                    style={{
                      flex: 1,
                      padding: '16px 24px',
                      background: lookbackPeriod === years 
                        ? 'linear-gradient(135deg, #f7931a 0%, #ff6b35 100%)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: lookbackPeriod === years 
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '700',
                      transition: 'all 0.2s ease',
                      boxShadow: lookbackPeriod === years 
                        ? '0 6px 24px rgba(247, 147, 26, 0.4)'
                        : 'none'
                    }}
                  >
                    {years} Year{years > 1 ? 's' : ''} Ago
                  </button>
                ))}
              </div>
            </div>
            
            {/* Lookback Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { label: 'Bitcoin', value: latestLookbackData.btcReturn, color: '#f7931a' },
                { label: 'S&P 500', value: latestLookbackData.spyReturn, color: '#5ac8fa' },
                { label: 'Mag 7', value: latestLookbackData.mag7Return, color: '#af52de' },
                { label: 'Gold', value: latestLookbackData.goldReturn, color: '#ffd60a' },
                { label: 'Silver', value: latestLookbackData.silverReturn, color: '#c0c0c0' },
                { label: 'Invested', value: latestLookbackData.invested, color: '#71717a', isInvested: true }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: `linear-gradient(135deg, ${stat.color}12 0%, ${stat.color}06 100%)`,
                  border: `1px solid ${stat.color}25`,
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '11px', 
                    color: stat.color, 
                    marginBottom: '8px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '28px', 
                    fontWeight: '700',
                    color: '#ffffff'
                  }}>
                    {stat.isInvested ? `$${stat.value?.toLocaleString()}` : `+${stat.value?.toFixed(1)}%`}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Lookback Chart */}
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: '36px',
              minHeight: '500px'
            }}>
              <div style={{
                marginBottom: '28px'
              }}>
                <h2 style={{
                  margin: '0 0 8px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  Historical {lookbackPeriod}-Year Performance
                </h2>
                <p style={{
                  margin: '0',
                  fontSize: '13px',
                  color: '#71717a'
                }}>
                  What if you had started DCA investing {lookbackPeriod} year{lookbackPeriod > 1 ? 's' : ''} ago?
                </p>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={lookbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    {['btc', 'spy', 'mag7', 'gold', 'silver'].map((asset, idx) => {
                      const colors = ['#f7931a', '#5ac8fa', '#af52de', '#ffd60a', '#c0c0c0'];
                      return (
                        <linearGradient key={asset} id={`lookback${asset}Gradient`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors[idx]} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={colors[idx]} stopOpacity={0.05}/>
                        </linearGradient>
                      );
                    })}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#52525b"
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                    }}
                  />
                  <YAxis 
                    stroke="#52525b"
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '24px',
                      fontSize: '13px',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="btcReturn"
                    stroke="#f7931a" 
                    strokeWidth={3}
                    fill="url(#lookbackbtcGradient)"
                    name="Bitcoin"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spyReturn"
                    stroke="#5ac8fa" 
                    strokeWidth={3}
                    fill="url(#lookbackspyGradient)"
                    name="S&P 500"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mag7Return"
                    stroke="#af52de" 
                    strokeWidth={2.5}
                    fill="url(#lookbackmag7Gradient)"
                    name="Mag 7"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="goldReturn"
                    stroke="#ffd60a" 
                    strokeWidth={2}
                    fill="url(#lookbackgoldGradient)"
                    name="Gold"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="silverReturn"
                    stroke="#c0c0c0" 
                    strokeWidth={2}
                    fill="url(#lookbacksilverGradient)"
                    name="Silver"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
        
        {/* 30-Year Projections Tab */}
        {activeTab === 'projections' && (
          <>
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Conservative Bitcoin CAGR Projection
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={projectionCAGR}
                  onChange={(e) => setProjectionCAGR(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'linear-gradient(to right, #34c759, #f7931a)',
                    borderRadius: '3px',
                    outline: 'none',
                    marginBottom: '12px'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    fontSize: '32px', 
                    fontWeight: '700',
                    color: '#f7931a'
                  }}>
                    {projectionCAGR}%
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#71717a',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}>
                      Optimistic: ~60% CAGR*
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#71717a',
                      fontFamily: '"JetBrains Mono", monospace',
                      marginTop: '2px'
                    }}>
                      S&P 500: ~10% CAGR
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Projection Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(247, 147, 26, 0.15) 0%, rgba(255, 107, 53, 0.08) 100%)',
                border: '1px solid rgba(247, 147, 26, 0.3)',
                borderRadius: '16px',
                padding: '28px'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#f7931a', 
                  marginBottom: '8px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Bitcoin @ {projectionCAGR}% CAGR
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  wordBreak: 'break-all'
                }}>
                  ${finalProjectionData.btcConservativeValue?.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  30-year portfolio value
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(90, 200, 250, 0.15) 0%, rgba(52, 199, 89, 0.08) 100%)',
                border: '1px solid rgba(90, 200, 250, 0.3)',
                borderRadius: '16px',
                padding: '28px'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#5ac8fa', 
                  marginBottom: '8px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  S&P 500 @ 10% CAGR
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  wordBreak: 'break-all'
                }}>
                  ${finalProjectionData.spyValue?.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  30-year portfolio value
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(175, 82, 222, 0.15) 0%, rgba(255, 45, 85, 0.08) 100%)',
                border: '1px solid rgba(175, 82, 222, 0.3)',
                borderRadius: '16px',
                padding: '28px'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#af52de', 
                  marginBottom: '8px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  BTC Optimistic (60% CAGR)*
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  wordBreak: 'break-all'
                }}>
                  ${finalProjectionData.btcHistoricalValue?.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  Optimistic growth scenario
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(113, 113, 122, 0.05) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '28px'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#ffffff', 
                  marginBottom: '8px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Total Invested
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  wordBreak: 'break-all'
                }}>
                  ${finalProjectionData.totalInvested?.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#71717a',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  Over 30 years
                </div>
              </div>
            </div>
            
            {/* Projection Chart */}
            <div style={{
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: '36px',
              minHeight: '500px'
            }}>
              <div style={{
                marginBottom: '28px'
              }}>
                <h2 style={{
                  margin: '0 0 8px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  30-Year Growth Projections
                </h2>
                <p style={{
                  margin: '0',
                  fontSize: '13px',
                  color: '#71717a'
                }}>
                  Projected portfolio values with continued DCA contributions • Logarithmic scale
                </p>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={projectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="projBtcConservative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f7931a" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f7931a" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="projSpy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5ac8fa" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#5ac8fa" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="projBtcHistorical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#af52de" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#af52de" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#52525b"
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                  />
                  <YAxis 
                    stroke="#52525b"
                    scale="log"
                    domain={[1000, 'auto']}
                    allowDataOverflow={false}
                    style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace' }}
                    tickFormatter={(value) => {
                      if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
                      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                      return `$${(value / 1000).toFixed(0)}k`;
                    }}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{
                            background: 'rgba(10, 10, 15, 0.98)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '16px',
                            borderRadius: '12px',
                            backdropFilter: 'blur(20px)'
                          }}>
                            <p style={{ 
                              color: '#9ca3af', 
                              fontSize: '11px', 
                              marginBottom: '12px',
                              fontFamily: '"JetBrains Mono", monospace'
                            }}>
                              Year {label}
                            </p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ 
                                color: entry.color, 
                                margin: '6px 0', 
                                fontSize: '13px',
                                fontWeight: '500'
                              }}>
                                {entry.name}: <strong>
                                  ${entry.value.toLocaleString()}
                                </strong>
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '24px',
                      fontSize: '13px',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="btcConservativeValue"
                    stroke="#f7931a" 
                    strokeWidth={3}
                    fill="url(#projBtcConservative)"
                    name={`Bitcoin ${projectionCAGR}%`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spyValue"
                    stroke="#5ac8fa" 
                    strokeWidth={3}
                    fill="url(#projSpy)"
                    name="S&P 500 10%"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="btcHistoricalValue"
                    stroke="#af52de" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#projBtcHistorical)"
                    name="BTC Optimistic 60%*"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalInvested"
                    stroke="#71717a" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Total Invested"
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div style={{
                marginTop: '32px',
                padding: '20px',
                background: 'rgba(255, 214, 10, 0.08)',
                border: '1px solid rgba(255, 214, 10, 0.2)',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#ffd60a',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px'
                }}>
                  ⚠️ Important Disclaimer
                </div>
                <p style={{
                  margin: '0',
                  fontSize: '12px',
                  color: '#a1a1aa',
                  lineHeight: '1.6'
                }}>
                  These projections are hypothetical illustrations only and should not be considered financial advice. 
                  Past performance does not guarantee future results. Bitcoin is a highly volatile asset with significant 
                  risk. <strong>*Bitcoin's actual 5-year CAGR (Jan 2021-Jan 2026) is approximately 25%. The 60% "optimistic" 
                  scenario is a hypothetical projection</strong> that assumes higher growth rates and is unlikely to continue 
                  indefinitely. Consult with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </>
        )}
        
        {/* Footer */}
        <div style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0',
            fontSize: '13px',
            color: '#52525b',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            Created for Sound HSA • Market Analysis Tool • January 2026
          </p>
          <p style={{
            margin: '12px 0 0',
            fontSize: '11px',
            color: '#3f3f46',
            lineHeight: '1.6'
          }}>
            All data is for illustrative purposes only. Projections are hypothetical and do not guarantee future performance.
            <br />
            Bitcoin and cryptocurrency investments carry significant risk. Past performance does not indicate future results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitcoinComprehensiveHSATracker;
