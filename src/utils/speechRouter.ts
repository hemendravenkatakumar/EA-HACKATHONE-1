export function parseVoiceCommand(
  text: string
): { action: string; target?: string } | null {
  const clean = text.toLowerCase().trim()

  if (
    clean.includes('crop') ||
    clean.includes('వ్యవసాయ') ||
    clean.includes('పంట') ||
    clean.includes('normal agriculture')
  ) {
    return { action: 'navigate', target: 'crop' }
  }
  if (
    clean.includes('fish') ||
    clean.includes('aquaculture') ||
    clean.includes('చేప') ||
    clean.includes('చెరువు')
  ) {
    return { action: 'navigate', target: 'fish' }
  }
  if (clean.includes('scheme') || clean.includes('పథకం') || clean.includes('subsidy')) {
    return { action: 'tab', target: 'schemes' }
  }
  if (clean.includes('disease') || clean.includes('తెగులు') || clean.includes('leaf')) {
    return { action: 'tab', target: 'disease' }
  }
  if (clean.includes('profit') || clean.includes('లాభం') || clean.includes('calculator')) {
    return { action: 'tab', target: 'calculator' }
  }
  if (clean.includes('weather') || clean.includes('వాతావరణం') || clean.includes('rain')) {
    return { action: 'tab', target: 'weather' }
  }
  if (clean.includes('water') || clean.includes('నీరు') || clean.includes('ph')) {
    return { action: 'tab', target: 'water' }
  }

  return null
}
