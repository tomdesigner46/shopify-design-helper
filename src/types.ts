export type TargetGender = 'male' | 'female' | 'any'
export type TargetAge = 'teens' | '20s' | '30s' | '40s' | '50s+' | 'any'
export type DesignImage =
  | 'luxury'      // 高級感
  | 'casual'      // カジュアル
  | 'minimal'     // ミニマル
  | 'natural'     // ナチュラル
  | 'modern'      // モダン
  | 'retro'       // レトロ
  | 'playful'     // ポップ・遊び心
  | 'professional' // プロフェッショナル

export interface DesignSettings {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  font: {
    heading: string
    body: string
  }
  textSize: {
    base: number   // px
    heading: number
    small: number
  }
}

export interface UserInput {
  gender: TargetGender
  age: TargetAge
  designImages: DesignImage[]
}
