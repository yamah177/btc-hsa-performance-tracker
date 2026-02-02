{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // This fetches current prices from CoinGecko API (free, no key needed)\
export async function fetchCurrentPrices() \{\
  try \{\
    const response = await fetch(\
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'\
    );\
    const data = await response.json();\
    \
    // For SPY, you'd need a stock API (Alpha Vantage free tier allows 25 calls/day)\
    // For now, we'll use a placeholder or manual update\
    \
    return \{\
      btc: data.bitcoin.usd,\
      timestamp: new Date().toISOString()\
    \};\
  \} catch (error) \{\
    console.error('Error fetching prices:', error);\
    return null;\
  \}\
\}}