# Business & Pricing Logic Guide

This document explains how to maintain and update the pricing engine without breaking the application.

## 1. The Pricing Formula
The estimator uses a **Multiplicative Compound Formula**. Unlike simple addition, this ensures profit margins scale proportionally with project risk and quality:

`Result = (Base Rate * Task Multiplier * Regional Multiplier) * Scale * Complexity * Quality * Urgency`

## 2. Managing Regional PPP
The `regions` object handles Purchasing Power Parity. 
- To expand into a new market, add a new key to the object in `pricingLogic.js`.
- **Multiplier 1.0** = Baseline (USA/CAN).
- **Multiplier 0.4** = High-volume emerging markets.

## 3. Adding New Service Niches
The architecture is "Infinite Scale." To add a new service (e.g., "Solar Installation"):
1. Open `constants/pricingLogic.js`.
2. Add a new entry to the `niches` object:
   ```javascript
   SOLAR: { 
     id: 'SOLAR', 
     cat: 'HOME', 
     label: 'Solar Energy', 
     baseRate: 150, 
     tasks: [
       { id: 'install', label: 'Panel Install', multiplier: 1.0 },
       { id: 'battery', label: 'Battery Backup', multiplier: 1.5 }
     ] 
   }