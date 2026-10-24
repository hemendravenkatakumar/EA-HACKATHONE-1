export interface CropProfitInput {
  cropName: string
  areaAcres: number
  expectedYieldPerAcre: number // in quintals
  sellingPricePerQuintal: number // in ₹
  seedsCost: number
  fertilizerPesticidesCost: number
  machineryDieselCost: number
  laborWagesCost: number
  irrigationPowerCost: number
  transportBaggingCost: number
  otherCosts: number
}

export interface CropProfitResult {
  totalProductionQuintals: number
  grossRevenue: number
  totalExpenses: number
  netProfit: number
  profitPerAcre: number
  roiPercentage: number
  isProfit: boolean
  costPerQuintal: number
}

export function calculateCropProfit(input: CropProfitInput): CropProfitResult {
  const area = Math.max(0.1, input.areaAcres || 1)
  const totalProductionQuintals = area * Math.max(0, input.expectedYieldPerAcre || 0)
  const grossRevenue = totalProductionQuintals * Math.max(0, input.sellingPricePerQuintal || 0)

  const totalExpenses =
    (input.seedsCost || 0) +
    (input.fertilizerPesticidesCost || 0) +
    (input.machineryDieselCost || 0) +
    (input.laborWagesCost || 0) +
    (input.irrigationPowerCost || 0) +
    (input.transportBaggingCost || 0) +
    (input.otherCosts || 0)

  const netProfit = grossRevenue - totalExpenses
  const profitPerAcre = netProfit / area
  const roiPercentage = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0
  const costPerQuintal = totalProductionQuintals > 0 ? totalExpenses / totalProductionQuintals : 0

  return {
    totalProductionQuintals,
    grossRevenue,
    totalExpenses,
    netProfit,
    profitPerAcre,
    roiPercentage,
    isProfit: netProfit >= 0,
    costPerQuintal
  }
}
