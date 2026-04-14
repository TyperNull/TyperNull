"use client"

import { useState, useMemo, useEffect } from "react"
import { TRANSLATION_STRINGS, TranslationString } from "@/lib/translation-data"
import { Search, ChevronDown, ChevronRight, Copy, Download, Globe } from "lucide-react"

// Extractor for variables like {0}, {1}, or "{0}", "{1}"
function getVars(str: string): string[] {
  const found = new Set<string>()
  const rx = /("?\{[^}]+\}"?)/g
  let m
  while ((m = rx.exec(str)) !== null) found.add(m[1])
  return [...found]
}

export default function TranslatePage() {
  const [langCode, setLangCode] = useState("")
  const [langName, setLangName] = useState("")
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<'all' | 'missing' | 'done'>('all')
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem('tl_langCode')
      const savedName = localStorage.getItem('tl_langName')
      const savedData = localStorage.getItem('tl_translations')
      if (savedCode) setLangCode(savedCode)
      if (savedName) setLangName(savedName)
      if (savedData) setTranslations(JSON.parse(savedData))
    } catch (e) { }
    setIsLoaded(true)
  }, [])

  // Auto-save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('tl_langCode', langCode)
    localStorage.setItem('tl_langName', langName)
    localStorage.setItem('tl_translations', JSON.stringify(translations))
  }, [langCode, langName, translations, isLoaded])

  // Groups
  const groupedStrings = useMemo(() => {
    const groups: Record<string, TranslationString[]> = {}
    TRANSLATION_STRINGS.forEach(item => {
      if (!groups[item.s]) groups[item.s] = []
      groups[item.s].push(item)
    })
    return groups
  }, [])

  const sections = Object.keys(groupedStrings)

  // Derived state
  const total = TRANSLATION_STRINGS.length
  const done = Object.keys(translations).length
  const progressPct = total ? Math.round((done / total) * 100) : 0

  // Filtered lists
  const visibleItems = useMemo(() => {
    const visible: Record<string, boolean> = {}
    const q = searchQuery.toLowerCase()

    TRANSLATION_STRINGS.forEach(item => {
      const hasTranslation = !!translations[item.k]
      const tlVal = translations[item.k] || ""

      const matchesSearch = !q ||
        item.en.toLowerCase().includes(q) ||
        item.k.toLowerCase().includes(q) ||
        tlVal.toLowerCase().includes(q)

      let matchesFilter = true
      if (filter === 'missing') matchesFilter = !hasTranslation
      if (filter === 'done') matchesFilter = hasTranslation

      visible[item.k] = matchesSearch && matchesFilter
    })
    return visible
  }, [searchQuery, filter, translations])

  const toggleSection = (section: string) => {
    const newCollapsed = new Set(collapsedSections)
    if (newCollapsed.has(section)) newCollapsed.delete(section)
    else newCollapsed.add(section)
    setCollapsedSections(newCollapsed)
  }

  const expandAll = () => setCollapsedSections(new Set())
  const collapseAll = () => setCollapsedSections(new Set(sections))

  const handleInput = (key: string, value: string) => {
    setTranslations(prev => {
      const next = { ...prev }
      if (value.trim()) next[key] = value
      else delete next[key]
      return next
    })
  }

  const handleInsertVar = (key: string, variable: string) => {
    const inputEl = document.getElementById(`inp-${key}`) as HTMLInputElement | HTMLTextAreaElement
    if (!inputEl) return

    const start = inputEl.selectionStart ?? inputEl.value.length
    const end = inputEl.selectionEnd ?? inputEl.value.length
    const currentVal = inputEl.value

    const newVal = currentVal.slice(0, start) + variable + currentVal.slice(end)
    handleInput(key, newVal)

    setTimeout(() => {
      inputEl.focus()
      inputEl.setSelectionRange(start + variable.length, start + variable.length)
    }, 0)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const buildPropertiesFile = () => {
    const lines: string[] = []
    lines.push(`## TyperNull — ${langName || langCode || 'Translation'} locale`)
    lines.push(`## Language: ${langCode || '??'}`)
    lines.push(`## Generated: ${new Date().toISOString().split('T')[0]}`)
    lines.push('')

    let lastSection = ''
    TRANSLATION_STRINGS.forEach(item => {
      if (item.s !== lastSection) {
        lines.push('')
        lines.push('## ' + item.s)
        lastSection = item.s
      }
      const val = translations[item.k]
      if (val !== undefined) {
        const escaped = val.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n    ')
        lines.push(`${item.k}=${escaped}`)
      }
    })
    return lines.join('\n')
  }

  const exportProperties = () => {
    const missingCode = !langCode.trim();
    const missingName = !langName.trim();

    if (missingCode || missingName) {
      let msg = "❌ Please enter Language Code and Name at the top";
      if (missingCode && !missingName) msg = "❌ Please enter Language Code at the top";
      else if (!missingCode && missingName) msg = "❌ Please enter Language Name at the top";
      showToast(msg);

      const targetId = missingCode ? "langCodeInput" : "langNameInput";
      const inputEl = document.getElementById(targetId);
      if (inputEl) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        inputEl.focus()
        inputEl.classList.add('ring-2', 'ring-red-500', 'animate-pulse')
        setTimeout(() => inputEl.classList.remove('ring-2', 'ring-red-500', 'animate-pulse'), 2000)
      }
      return
    }
    const content = buildPropertiesFile()
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `messages_${langCode.trim()}.properties`
    a.click()
  }

  const copyProperties = () => {
    navigator.clipboard.writeText(buildPropertiesFile()).then(() => {
      showToast("✓ Copied properties to clipboard!")
    })
  }

  return (
    <div className="min-h-screen pb-32">
      {/* HEADER / STATS */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <h1 className="font-retro text-primary text-xl flex items-center gap-2 m-0 shrink-0">
              <Globe className="w-5 h-5" /> TL
            </h1>
            <div className="w-px h-6 bg-border/50 hidden sm:block"></div>
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs text-muted-foreground font-mono">Code:</label>
              <input
                id="langCodeInput"
                value={langCode}
                onChange={(e) => setLangCode(e.target.value)}
                placeholder="ru, ja, tr..."
                className="bg-card border border-border/50 rounded-md px-2 py-1 text-sm font-mono w-24 text-foreground focus:outline-none focus:border-primary transition-colors"
                maxLength={10}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs text-muted-foreground font-mono">Name:</label>
              <input
                id="langNameInput"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
                placeholder="Russian"
                className="bg-card border border-border/50 rounded-md px-2 py-1 text-sm font-sans w-32 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto overflow-hidden">
            <div className="flex flex-col gap-1 w-full sm:w-48">
              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{done} / {total} translated</span>
                <span className="text-primary">{progressPct}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={expandAll} className="text-xs font-mono text-muted-foreground hover:text-foreground">Expand</button>
              <button onClick={collapseAll} className="text-xs font-mono text-muted-foreground hover:text-foreground">Collapse</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Intro */}
        <div className="terminal-card p-6 mb-8 flex gap-4 items-start">
          <div className="text-3xl">🧩</div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2 font-retro leading-tight tracking-wide">Community Translation Template</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
              Translate the interface of TyperNull into your language. The left column shows the original English text. Type your translation on the right.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-3xl">
              When a string contains dynamic values like <span className="bg-primary/20 text-primary px-1 font-mono rounded text-xs leading-none py-0.5 inline-block mx-1">{"\"{0}\""}</span>, click the orange chips to insert them at your cursor — they <strong className="text-foreground">must</strong> stay in your translation. When done, click <strong className="text-primary">Export</strong> below.
              you can then send the file in the <a href="https://discord.com/channels/563935796009238528/564687121785421825" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Discord server make sure it is in the right #free-resource-discussion channel</a> i will ignore any your translation if it is not in the right channel. if you are not in the discord server you can join it using this link: <a href="https://discord.gg/XBkmy3QX" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Scanner Usage School</a>
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strings..."
              className="w-full bg-card border border-border/50 rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex p-1 bg-card rounded-md border border-border/50">
            {(['all', 'missing', 'done'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-mono rounded transition-colors ${filter === f ? 'bg-primary text-background' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {sections.map(section => {
            const items = groupedStrings[section]
            const visibleItemsInSection = items.filter(i => visibleItems[i.k])

            if (visibleItemsInSection.length === 0) return null

            const isCollapsed = collapsedSections.has(section)
            const sectionDone = items.filter(i => translations[i.k]).length
            const sectionTotal = items.length
            const sectionPct = sectionTotal ? (sectionDone / sectionTotal) * 100 : 0

            return (
              <div key={section} className="border border-border/50 rounded-md bg-card overflow-hidden">
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center gap-3 p-3 bg-card hover:bg-muted/50 transition-colors border-b border-border/50"
                >
                  <div className="text-muted-foreground">
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <span className="font-bold text-sm tracking-wide text-foreground flex-1 text-left">{section}</span>
                  <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 bg-background rounded-full border border-border/50">{visibleItemsInSection.length}</span>
                  <div className="w-16 h-1 mt-1 bg-background rounded-full overflow-hidden hidden sm:block">
                    <div className="h-full bg-primary" style={{ width: `${sectionPct}%` }}></div>
                  </div>
                </button>

                {!isCollapsed && (
                  <div className="divide-y divide-border/20 bg-background">
                    <div className="hidden sm:grid grid-cols-2 bg-muted/50 border-b border-border/20">
                      <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">🇺🇸 English</div>
                      <div className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-widest border-l border-border/20">🌐 Translation {langCode && `(${langCode})`}</div>
                    </div>
                    {visibleItemsInSection.map(item => {
                      const tlVal = translations[item.k] || ""
                      const isHtml = item.isHtml
                      const isLong = item.en.length > 80 || isHtml
                      const vars = getVars(item.en)
                      const missingVars = vars.filter(v => !tlVal.includes(v))
                      const hasMissingVars = tlVal.trim().length > 0 && missingVars.length > 0

                      return (
                        <div key={item.k} className={`grid sm:grid-cols-2 transition-colors ${tlVal ? 'bg-primary/5' : ''} hover:bg-white/[0.02]`}>

                          {/* English Cell */}
                          <div className="p-4 sm:border-r border-border/20 flex flex-col justify-center gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono bg-background border border-border/50 px-1.5 py-0.5 rounded text-muted-foreground">{item.k}</span>
                            </div>

                            {isHtml ? (
                              <div className="text-xs text-muted-foreground italic bg-background p-2 rounded border border-border/10 border-dashed">
                                [HTML block — translate visible text, keep all HTML tags]
                                <div className="mt-2 text-foreground/80 font-mono text-[10px] whitespace-pre-wrap opacity-70 max-h-32 overflow-y-auto">{item.en}</div>
                              </div>
                            ) : (
                              <div className={`text-sm text-foreground/90 ${isLong ? 'max-h-24 overflow-y-auto' : ''}`}>
                                {item.en}
                              </div>
                            )}

                            {vars.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {vars.map(v => (
                                  <button
                                    key={v}
                                    onClick={() => handleInsertVar(item.k, v)}
                                    className="text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded hover:bg-orange-500/20 transition-colors"
                                    title="Insert at cursor"
                                  >
                                    <span className="opacity-50">+</span> {v}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Translation Cell */}
                          <div className="p-4 flex flex-col justify-center">
                            <div className="sm:hidden text-xs font-bold text-primary mb-2">Translation:</div>
                            <div className="relative">
                              {isLong ? (
                                <textarea
                                  id={`inp-${item.k}`}
                                  value={tlVal}
                                  onChange={(e) => handleInput(item.k, e.target.value)}
                                  placeholder="Type translation here..."
                                  className={`w-full bg-background border rounded-md p-2 text-sm text-foreground resize-y min-h-[60px] focus:outline-none focus:bg-primary/5 transition-colors ${tlVal ? 'border-primary/30' : 'border-transparent hover:border-border/50'
                                    }`}
                                />
                              ) : (
                                <input
                                  id={`inp-${item.k}`}
                                  type="text"
                                  value={tlVal}
                                  onChange={(e) => handleInput(item.k, e.target.value)}
                                  placeholder="Type translation..."
                                  className={`w-full bg-background border rounded-md p-2 text-sm text-foreground focus:outline-none focus:bg-primary/5 transition-colors ${tlVal ? 'border-primary/30' : 'border-transparent hover:border-border/50'
                                    }`}
                                />
                              )}
                              {hasMissingVars && (
                                <div className="text-[10px] text-red-400 mt-1 flex gap-1">
                                  <span>⚠ Missing logic vars:</span>
                                  {missingVars.map(v => <code key={v} className="bg-red-950 px-1 rounded">{v}</code>)}
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {Object.values(visibleItems).filter(Boolean).length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-mono">
              [No strings match your filter]
            </div>
          )}
        </div>
      </div>

      {/* FOOTER EXPORT PANEL */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-mono text-muted-foreground hidden md:block">
            {langCode ? (
              <span>Ready for: <strong className="text-primary">{langName || langCode}</strong></span>
            ) : (
              <span>Enter language code at the top</span>
            )}
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={copyProperties}
              className="comic-button border-border/50 bg-surface text-foreground flex-1 sm:flex-none px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-surface2"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
            <button
              onClick={exportProperties}
              className="comic-button flex-1 sm:flex-none px-6 py-2 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* TOAST SYSTEM */}
      <div className={`fixed bottom-24 right-4 sm:right-8 bg-primary text-background px-4 py-2 rounded-md shadow-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 z-50 ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </div>
  )
}
