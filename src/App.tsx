import { useState } from 'react'
import type { UserInput, DesignSettings, TargetGender, TargetAge, DesignImage } from './types'
import { getSuggestedSettings } from './lib/suggestions'
import { generateGuide } from './lib/guide'

const GENDER_OPTIONS: { value: TargetGender; label: string }[] = [
  { value: 'any', label: '指定なし' },
  { value: 'female', label: '女性' },
  { value: 'male', label: '男性' },
]

const AGE_OPTIONS: { value: TargetAge; label: string }[] = [
  { value: 'any', label: '指定なし' },
  { value: 'teens', label: '10代' },
  { value: '20s', label: '20代' },
  { value: '30s', label: '30代' },
  { value: '40s', label: '40代' },
  { value: '50s+', label: '50代以上' },
]

const DESIGN_OPTIONS: { value: DesignImage; label: string }[] = [
  { value: 'luxury', label: '高級感' },
  { value: 'casual', label: 'カジュアル' },
  { value: 'minimal', label: 'ミニマル' },
  { value: 'natural', label: 'ナチュラル' },
  { value: 'modern', label: 'モダン' },
  { value: 'retro', label: 'レトロ' },
  { value: 'playful', label: 'ポップ・遊び心' },
  { value: 'professional', label: 'プロフェッショナル' },
]

type Step = 'input' | 'adjust' | 'guide'

function App() {
  const [step, setStep] = useState<Step>('input')
  const [input, setInput] = useState<UserInput>({
    gender: 'any',
    age: 'any',
    designImages: [],
  })
  const [settings, setSettings] = useState<DesignSettings | null>(null)
  const [guideText, setGuideText] = useState('')

  const handleSubmitInput = () => {
    const suggested = getSuggestedSettings(input)
    setSettings(suggested)
    setStep('adjust')
  }

  const toggleDesign = (value: DesignImage) => {
    setInput((prev) => ({
      ...prev,
      designImages: prev.designImages.includes(value)
        ? prev.designImages.filter((x) => x !== value)
        : [...prev.designImages, value],
    }))
  }

  const handleConfirmSettings = () => {
    if (settings) {
      setGuideText(generateGuide(settings))
      setStep('guide')
    }
  }

  const updateSettings = (patch: Partial<DesignSettings>) => {
    if (!settings) return
    setSettings({
      ...settings,
      ...patch,
      colors: patch.colors ? { ...settings.colors, ...patch.colors } : settings.colors,
      font: patch.font ? { ...settings.font, ...patch.font } : settings.font,
      textSize: patch.textSize ? { ...settings.textSize, ...patch.textSize } : settings.textSize,
    })
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="border-b border-stone-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-xl font-semibold text-stone-800">Shopify Design Helper</h1>
          <p className="mt-1 text-sm text-stone-500">
            ターゲットとイメージに合わせて、配色・フォント・テキストサイズを提案し、設定ガイドを生成します
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* ステップインジケーター */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <span className={step === 'input' ? 'font-medium text-stone-800' : 'text-stone-400'}>
            1. 入力
          </span>
          <span className="text-stone-300">/</span>
          <span className={step === 'adjust' ? 'font-medium text-stone-800' : 'text-stone-400'}>
            2. 調整
          </span>
          <span className="text-stone-300">/</span>
          <span className={step === 'guide' ? 'font-medium text-stone-800' : 'text-stone-400'}>
            3. ガイド
          </span>
        </nav>

        {step === 'input' && (
          <section className="space-y-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">ストアのターゲットとイメージ</h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-600">性別</label>
              <div className="flex flex-wrap gap-2">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setInput((p) => ({ ...p, gender: opt.value }))}
                    className={`rounded-full px-4 py-2 text-sm ${
                      input.gender === opt.value
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-600">年齢層</label>
              <div className="flex flex-wrap gap-2">
                {AGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setInput((p) => ({ ...p, age: opt.value }))}
                    className={`rounded-full px-4 py-2 text-sm ${
                      input.age === opt.value
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-600">
                イメージさせたいデザイン（1つ以上選択）
              </label>
              <div className="flex flex-wrap gap-2">
                {DESIGN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleDesign(opt.value)}
                    className={`rounded-full px-4 py-2 text-sm ${
                      input.designImages.includes(opt.value)
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmitInput}
              disabled={input.designImages.length === 0}
              className="mt-4 w-full rounded-lg bg-stone-800 px-4 py-3 font-medium text-white hover:bg-stone-700 disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              提案を表示する
            </button>
          </section>
        )}

        {step === 'adjust' && settings && (
          <section className="space-y-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">配色・フォント・テキストサイズの調整</h2>
            <p className="text-sm text-stone-500">
              提案をベースに自由に変更できます。OK を押すと設定手順ガイドを生成します。
            </p>

            <div>
              <h3 className="mb-3 text-sm font-medium text-stone-600">配色</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['primary', 'secondary', 'background', 'text', 'accent'] as const).map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.colors[key]}
                      onChange={(e) =>
                        updateSettings({
                          colors: { ...settings.colors, [key]: e.target.value },
                        })
                      }
                      className="h-10 w-14 cursor-pointer rounded border border-stone-200"
                    />
                    <div className="flex-1">
                      <label className="text-xs text-stone-500">
                        {key === 'primary' && 'メイン'}
                        {key === 'secondary' && 'サブ'}
                        {key === 'background' && '背景'}
                        {key === 'text' && 'テキスト'}
                        {key === 'accent' && 'アクセント'}
                      </label>
                      <input
                        type="text"
                        value={settings.colors[key]}
                        onChange={(e) =>
                          updateSettings({
                            colors: { ...settings.colors, [key]: e.target.value },
                          })
                        }
                        className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-stone-600">フォント</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-stone-500">見出し</label>
                  <input
                    type="text"
                    value={settings.font.heading}
                    onChange={(e) =>
                      updateSettings({ font: { ...settings.font, heading: e.target.value } })
                    }
                    className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500">本文</label>
                  <input
                    type="text"
                    value={settings.font.body}
                    onChange={(e) =>
                      updateSettings({ font: { ...settings.font, body: e.target.value } })
                    }
                    className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-stone-600">テキストサイズ（px）</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-stone-500">ベース</label>
                  <input
                    type="number"
                    min={12}
                    max={24}
                    value={settings.textSize.base}
                    onChange={(e) =>
                      updateSettings({
                        textSize: { ...settings.textSize, base: Number(e.target.value) || 16 },
                      })
                    }
                    className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500">見出し</label>
                  <input
                    type="number"
                    min={18}
                    max={48}
                    value={settings.textSize.heading}
                    onChange={(e) =>
                      updateSettings({
                        textSize: { ...settings.textSize, heading: Number(e.target.value) || 26 },
                      })
                    }
                    className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-500">小</label>
                  <input
                    type="number"
                    min={10}
                    max={18}
                    value={settings.textSize.small}
                    onChange={(e) =>
                      updateSettings({
                        textSize: { ...settings.textSize, small: Number(e.target.value) || 14 },
                      })
                    }
                    className="mt-0.5 w-full rounded border border-stone-200 px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('input')}
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={handleConfirmSettings}
                className="flex-1 rounded-lg bg-stone-800 px-4 py-3 font-medium text-white hover:bg-stone-700"
              >
                OK — ガイドを生成する
              </button>
            </div>
          </section>
        )}

        {step === 'guide' && (
          <section className="space-y-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">設定手順ガイド</h2>
            <p className="text-sm text-stone-500">
              以下の手順を Shopify 管理画面で実行すると、設定が反映されます。コピーしてメモやドキュメントに貼り付けてお使いください。
            </p>
            <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-stone-200 bg-stone-50 p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-stone-700">
                {guideText}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(guideText)
                  alert('ガイドをクリップボードにコピーしました')
                }}
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                コピー
              </button>
              <button
                type="button"
                onClick={() => setStep('adjust')}
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                調整に戻る
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
