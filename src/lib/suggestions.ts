import type { UserInput, DesignSettings } from '../types'

// Shopifyでよく使えるフォント（Dawnテーマで利用可能なものに近い）
const FONTS = {
  heading: [
    { name: 'Noto Sans JP', label: 'Noto Sans JP（ゴシック）' },
    { name: 'Shippori Mincho', label: ' Shippori Mincho（明朝）' },
    { name: 'Zen Kaku Gothic New', label: 'Zen Kaku Gothic New' },
    { name: 'M PLUS 1p', label: 'M PLUS 1p' },
    { name: 'Sawarabi Gothic', label: 'Sawarabi Gothic' },
    { name: 'Inter', label: 'Inter（欧文）' },
    { name: 'Lora', label: 'Lora（セリフ）' },
  ],
  body: [
    { name: 'Noto Sans JP', label: 'Noto Sans JP' },
    { name: 'Zen Kaku Gothic New', label: 'Zen Kaku Gothic New' },
    { name: 'M PLUS 1p', label: 'M PLUS 1p' },
    { name: 'Sawarabi Gothic', label: 'Sawarabi Gothic' },
    { name: 'Inter', label: 'Inter' },
    { name: 'Lora', label: 'Lora' },
  ],
} as const

const PRESETS: Record<string, Partial<DesignSettings>> = {
  luxury: {
    colors: {
      primary: '#2C2C2C',
      secondary: '#8B7355',
      background: '#FAF9F7',
      text: '#333333',
      accent: '#C9A962',
    },
    font: { heading: 'Shippori Mincho', body: 'Noto Sans JP' },
    textSize: { base: 16, heading: 28, small: 14 },
  },
  casual: {
    colors: {
      primary: '#4A90A4',
      secondary: '#F5A623',
      background: '#FFFFFF',
      text: '#333333',
      accent: '#E07C5C',
    },
    font: { heading: 'M PLUS 1p', body: 'M PLUS 1p' },
    textSize: { base: 16, heading: 26, small: 14 },
  },
  minimal: {
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#FFFFFF',
      text: '#1A1A1A',
      accent: '#000000',
    },
    font: { heading: 'Noto Sans JP', body: 'Noto Sans JP' },
    textSize: { base: 15, heading: 24, small: 13 },
  },
  natural: {
    colors: {
      primary: '#5C6B4B',
      secondary: '#8B9A6E',
      background: '#F7F5F0',
      text: '#3D3D3D',
      accent: '#A67B5B',
    },
    font: { heading: 'Zen Kaku Gothic New', body: 'Zen Kaku Gothic New' },
    textSize: { base: 16, heading: 26, small: 14 },
  },
  modern: {
    colors: {
      primary: '#1E3A5F',
      secondary: '#4A90D9',
      background: '#F8FAFC',
      text: '#1E293B',
      accent: '#0EA5E9',
    },
    font: { heading: 'Inter', body: 'Noto Sans JP' },
    textSize: { base: 16, heading: 28, small: 14 },
  },
  retro: {
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      background: '#FFF8E7',
      text: '#2C1810',
      accent: '#CD853F',
    },
    font: { heading: 'Lora', body: 'Lora' },
    textSize: { base: 16, heading: 26, small: 14 },
  },
  playful: {
    colors: {
      primary: '#E91E63',
      secondary: '#9C27B0',
      background: '#FFF5F8',
      text: '#333333',
      accent: '#FF4081',
    },
    font: { heading: 'M PLUS 1p', body: 'M PLUS 1p' },
    textSize: { base: 16, heading: 28, small: 14 },
  },
  professional: {
    colors: {
      primary: '#1A1A2E',
      secondary: '#16213E',
      background: '#FFFFFF',
      text: '#2D2D2D',
      accent: '#0F3460',
    },
    font: { heading: 'Noto Sans JP', body: 'Noto Sans JP' },
    textSize: { base: 15, heading: 24, small: 13 },
  },
}

const DEFAULT: DesignSettings = {
  colors: {
    primary: '#333333',
    secondary: '#666666',
    background: '#FFFFFF',
    text: '#333333',
    accent: '#2563EB',
  },
  font: { heading: 'Noto Sans JP', body: 'Noto Sans JP' },
  textSize: { base: 16, heading: 26, small: 14 },
}

function mergeSettings(base: DesignSettings, override: Partial<DesignSettings>): DesignSettings {
  return {
    colors: { ...base.colors, ...override.colors },
    font: { ...base.font, ...override.font },
    textSize: { ...base.textSize, ...override.textSize },
  }
}

export function getSuggestedSettings(input: UserInput): DesignSettings {
  let result: DesignSettings = { ...DEFAULT }

  const images = input.designImages
  if (images.length > 0) {
    const primary = images[0]
    const preset = PRESETS[primary]
    if (preset) result = mergeSettings(result, preset)
    if (images.length > 1 && PRESETS[images[1]]) {
      const second = PRESETS[images[1]]
      result = mergeSettings(result, {
        colors: second.colors ? { ...result.colors, ...second.colors } : result.colors,
        font: second.font ? { ...result.font, ...second.font } : result.font,
      })
    }
  }

  if (input.age === '50s+' || input.age === '40s') {
    result = mergeSettings(result, {
      textSize: {
        ...result.textSize,
        base: Math.max(result.textSize.base, 16),
        small: Math.max(result.textSize.small, 14),
      },
    })
  }
  if (input.age === 'teens' || input.age === '20s') {
    result = mergeSettings(result, {
      textSize: {
        ...result.textSize,
        heading: Math.max(result.textSize.heading, 26),
      },
    })
  }

  return result
}

export function getFontOptions() {
  return FONTS
}
