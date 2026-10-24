export interface FishProfitInput {
  speciesName: string
  stockedCount: number
  survivalRatePercent: number // 70-95%
  averageHarvestWeightKg: number // 0.8 - 2.5 kg
  sellingPricePerKg: number // in ₹
  fingerlingsCost: number
  feedCost: number
  electricityDieselCost: number
  laborSecurityCost: number
  probioticsMedicineCost: number
  pondLeaseMaintenanceCost: number
}

export interface FishProfitResult {
  survivingFishCount: number
  totalBiomassHarvestedKg: number
  grossRevenue: number
  totalOperatingCosts: number
  netProfit: number
  profitPerKg: number
  estimatedFCR: number
  roiPercentage: number
  isProfit: boolean
}

export function calculateFishProfit(input: FishProfitInput): FishProfitResult {
  const stocked = Math.max(100, input.stockedCount || 1000)
  const survivalRate = Math.min(100, Math.max(10, input.survivalRatePercent || 80)) / 100
  const avgWeight = Math.max(0.1, input.averageHarvestWeightKg || 1)
  const pricePerKg = Math.max(10, input.sellingPricePerKg || 120)

  const survivingFishCount = Math.round(stocked * survivalRate)
  const totalBiomassHarvestedKg = Math.round(survivingFishCount * avgWeight)
  const grossRevenue = totalBiomassHarvestedKg * pricePerKg

  const totalOperatingCosts =
    (input.fingerlingsCost || 0) +
    (input.feedCost || 0) +
    (input.electricityDieselCost || 0) +
    (input.laborSecurityCost || 0) +
    (input.probioticsMedicineCost || 0) +
    (input.pondLeaseMaintenanceCost || 0)

  const netProfit = grossRevenue - totalOperatingCosts
  const profitPerKg = totalBiomassHarvestedKg > 0 ? netProfit / totalBiomassHarvestedKg : 0
  const roiPercentage = totalOperatingCosts > 0 ? (netProfit / totalOperatingCosts) * 100 : 0
  const estimatedFCR = totalBiomassHarvestedKg > 0 ? (input.feedCost / 40) / totalBiomassHarvestedKg : 1.5

  return {
    survivingFishCount,
    totalBiomassHarvestedKg,
    grossRevenue,
    totalOperatingCosts,
    netProfit,
    profitPerKg,
    estimatedFCR: Math.round(estimatedFCR * 10) / 10 || 1.6,
    roiPercentage,
    isProfit: netProfit >= 0
  }
}

export function evaluateWaterQuality(readings: {
  ph: number
  dissolvedOxygen: number
  temperature: number
  ammonia: number
  alkalinity: number
}) {
  const issues: string[] = []
  const recommendations: string[] = []
  let overallStatus: 'Optimal' | 'Caution' | 'Critical' = 'Optimal'

  if (readings.ph < 6.8) {
    overallStatus = 'Caution'
    issues.push('Acidic Water (pH < 6.8)')
    recommendations.push('Apply Agricultural Limestone (CaCO3) @ 50-75 kg per acre.')
  } else if (readings.ph > 8.8) {
    overallStatus = 'Caution'
    issues.push('Alkaline Spike (pH > 8.8)')
    recommendations.push('Broadcast Gypsum or fermented molasses @ 15 kg/acre.')
  }

  if (readings.dissolvedOxygen < 3.2) {
    overallStatus = 'Critical'
    issues.push('Critical Hypoxia: DO < 3.2 mg/L')
    recommendations.push('Activate all paddlewheel aerators immediately and broadcast oxygen booster tablets.')
  } else if (readings.dissolvedOxygen < 4.5) {
    if ((overallStatus as string) !== 'Critical') overallStatus = 'Caution'
    issues.push('Sub-optimal Oxygen (3.2 - 4.5 mg/L)')
    recommendations.push('Increase aerator running duration during early dawn (3 AM - 7 AM).')
  }

  if (readings.ammonia > 0.1) {
    overallStatus = 'Critical'
    issues.push('Toxic Unionized Ammonia (> 0.1 mg/L)')
    recommendations.push('Stop feeding immediately, exchange 20% bottom water, and apply Yucca extract.')
  } else if (readings.ammonia > 0.04) {
    if ((overallStatus as string) !== 'Critical') overallStatus = 'Caution'
    issues.push('Elevated Ammonia (0.04 - 0.1 mg/L)')
    recommendations.push('Reduce daily feed ration by 25% and apply pond bottom probiotics.')
  }

  if (issues.length === 0) {
    recommendations.push('All parameters are within healthy range. Maintain routine feeding.')
  }

  return { overallStatus, issues, recommendations }
}
