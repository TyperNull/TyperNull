"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Bug, Lightbulb, ExternalLink, Loader2, Info, X, MessageSquare, User } from "lucide-react"

const GITHUB_REPO = "TyperNull/TyperNull"
const FEATURE_WEBHOOK_URL = "https://hook.eu1.make.com/42qgurk4inpamoi0uq9nqx0iguci2t5l"
const BUG_WEBHOOK_URL = "https://hook.eu1.make.com/u7pgnb8sh81he6v9f3eqiuqgxm66vwis"

// GitHub label colors mapping widget
const getStatusBadge = (labels: any[]) => {
  const statusLabels = labels.filter(l => {
    const n = l.name.toLowerCase()
    return n !== 'bug' && n !== 'feature request' && n !== 'feature'
  })
  if (statusLabels.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap mt-3">
      {statusLabels.map((l, i) => (
        <span key={i} className="px-2 py-1 text-[10px] font-retro uppercase border rounded" style={{ borderColor: `#${l.color}`, color: `#${l.color}` }}>
          {l.name}
        </span>
      ))}
    </div>
  )
}

function IssueReplies({ issue }: { issue: any }) {
  const [replies, setReplies] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!issue.comments) return null

  const fetchReplies = async () => {
    if (isOpen) {
      setIsOpen(false)
      return
    }

    if (replies.length > 0) {
      setIsOpen(true)
      return
    }

    setLoading(true)
    try {
      // Add a slight artificial delay for the rate-limit anxiety as requested
      await new Promise(resolve => setTimeout(resolve, 300))
      const res = await fetch(issue.comments_url)
      const data = await res.json()
      // Filter out empty or bot messages if needed, here we just take them
      setReplies(data)
    } catch {
      // suppress error
    }
    setLoading(false)
    setIsOpen(true)
  }

  return (
    <div className="mt-4 border-t border-border/50 pt-4">
      <button onClick={fetchReplies} className="comic-button bg-transparent border-0 font-mono text-xs text-primary flex items-center gap-2 hover:bg-primary/10 px-3 py-1.5 h-auto uppercase cursor-pointer">
        <MessageSquare className="w-3 h-3" />
        {loading ? "FETCHING..." : isOpen ? "HIDE DEV REPLIES" : `READ DEV REPLIES (${issue.comments})`}
      </button>

      {isOpen && replies.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-primary/30">
          {replies.map((reply: any) => (
            <div key={reply.id} className="bg-primary/5 p-3 rounded text-sm relative">
              <div className="flex items-center gap-2 font-mono text-[10px] text-primary font-bold mb-2 uppercase">
                <User className="w-3 h-3" /> DEV UPDATE - {new Date(reply.created_at).toLocaleDateString()}
              </div>
              <div className="text-foreground/80 whitespace-pre-wrap">{reply.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TrackerContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams?.get("type") || "all"

  const [activeTab, setActiveTab] = useState(initialType)
  const [issues, setIssues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Submission States
  const [submitModalType, setSubmitModalType] = useState<"feature" | "bug" | null>(null)
  const [submitTitle, setSubmitTitle] = useState("")
  const [submitBody, setSubmitBody] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Update tab if URL param changes
  useEffect(() => {
    if (initialType && initialType !== "all" && initialType !== activeTab) {
      setActiveTab(initialType)
    }
  }, [initialType])

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues?state=all&per_page=50`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then(data => {
        // GitHub API treats Pull Requests as issues, verify it's purely an issue
        const pureIssues = data.filter((i: any) => !i.pull_request)
        setIssues(pureIssues)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const filteredIssues = issues.filter(issue => {
    const isClosed = issue.state === 'closed'
    if (activeTab === "finished") return isClosed
    if (isClosed) return false // Hide closed items from open queues

    if (activeTab === "all") return true
    const isBug = issue.labels.some((l: any) => l.name.toLowerCase() === 'bug')
    if (activeTab === "bug") return isBug
    if (activeTab === "feature") {
      return issue.labels.some((l: any) => {
        const n = l.name.toLowerCase()
        return n === 'enhancement' || n === 'feature request' || n === 'feature'
      })
    }
    return true
  })

  const formatDate = (ds: string) => {
    return new Date(ds).toLocaleDateString()
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-12 mb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="section-header text-5xl mb-2">TRACKER</h1>
          <p className="text-muted-foreground font-mono text-sm">
            // Live Development Board
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSubmitModalType('feature')}
            className="glow-button no-lift text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lightbulb className="w-4 h-4" />
            Request Feature
          </button>
          <button
            onClick={() => setSubmitModalType('bug')}
            className="glass-card no-lift px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm flex items-center justify-center gap-2 font-medium text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <Bug className="w-4 h-4" />
            Report Issue
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border/50 mb-8 overflow-x-auto pb-px">
        {['all', 'feature', 'bug', 'finished'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-retro tracking-widest text-sm uppercase transition-colors whitespace-nowrap cursor-pointer ${activeTab === tab
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab === 'feature' ? 'Features' : tab === 'bug' ? 'Bugs' : tab === 'finished' ? 'Finished' : 'All Requests'}
          </button>
        ))}
      </div>

      {/* Issue List */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-primary gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <div className="font-mono text-sm text-foreground animate-pulse">// Syncing with database...</div>
        </div>
      ) : error ? (
        <div className="comic-card p-8 text-center mt-12">
          <Info className="w-10 h-10 text-destructive mx-auto mb-4" />
          <h3 className="font-retro text-xl mb-2 text-foreground">SERVER CONNECTION FAILED</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our request database is currently overloaded or temporarily unavailable. Please try again later.
          </p>
        </div>
      ) : filteredIssues.length === 0 ? (
        <div className="comic-card p-12 text-center text-muted-foreground font-mono border-dashed bg-transparent mt-12">
          // 404: NO ITEMS FOUND IN THIS CATEGORY
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const isBug = issue.labels.some((l: any) => l.name.toLowerCase() === 'bug')
            const isClosed = issue.state === 'closed'
            return (
              <div
                key={issue.id}
                className={`comic-card p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition-all bg-card/50 backdrop-blur-sm ${isClosed ? 'opacity-60 saturate-50' : 'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10'
                  }`}
              >
                {/* Icon Badge */}
                <div className={`p-4 rounded-xl shrink-0 ${isBug ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                  {isBug ? <Bug className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
                </div>

                <div className="flex-1 w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                    <div className="text-lg font-bold text-foreground truncate w-full">
                      {issue.title}
                    </div>
                    <span className="font-mono text-xs text-muted-foreground shrink-0">.REQ-{issue.number}</span>
                  </div>

                  <div className="text-sm text-foreground/80 line-clamp-2 mb-3 bg-background/50 p-3 rounded border border-border/50">
                    {issue.body ? issue.body : <i className="text-muted-foreground">No description provided.</i>}
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                    <span className={`px-2 py-0.5 rounded-full ${isClosed ? 'bg-muted' : 'bg-primary/20 text-primary'}`}>
                      {isClosed ? 'CLOSED' : 'OPEN'}
                    </span>
                    <span>•</span>
                    <span>{formatDate(issue.created_at)}</span>
                  </div>

                  {/* Custom Labels mapped directly from Github labels */}
                  {getStatusBadge(issue.labels)}

                  {/* Dev Replies Lazy Loader Component */}
                  <IssueReplies issue={issue} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Submission Modal */}
      {submitModalType && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="comic-card max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200 bg-card">
            <button
              onClick={() => {
                setSubmitModalType(null)
                setSubmitSuccess(false)
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-retro tracking-wide text-2xl text-primary mb-6 flex items-center gap-2">
              {submitModalType === 'bug' ? <><Bug className="w-6 h-6" /> SUBMIT BUG</> : <><Lightbulb className="w-6 h-6" /> REQUEST FEATURE</>}
            </h3>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="text-primary font-retro text-xl mb-2">SUCCESS!</div>
                <p className="text-muted-foreground">Your request has been securely forwarded to the development board.</p>
                <button
                  onClick={() => {
                    setSubmitModalType(null);
                    setSubmitSuccess(false);
                    setSubmitTitle('');
                    setSubmitBody('');
                  }}
                  className="glow-button no-lift text-white mt-6 px-6 py-2 cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault()
                const hookUrl = submitModalType === 'bug' ? BUG_WEBHOOK_URL : FEATURE_WEBHOOK_URL
                if (!hookUrl) {
                  alert(`Webhook URL not configured yet for ${submitModalType}. Please paste it into page.tsx.`)
                  return
                }
                setIsSubmitting(true)
                try {
                  // Format the title to include the tag so your Github catches it easily
                  const formattedTitle = submitModalType === 'bug' ? `[BUG] ${submitTitle}` : `[FEATURE] ${submitTitle}`

                  await fetch(hookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      type: submitModalType,
                      title: formattedTitle,
                      body: submitBody
                    })
                  })
                  setSubmitSuccess(true)
                } catch (err) {
                  alert("Failed to submit. Check webhook configuration.")
                }
                setIsSubmitting(false)
              }} className="space-y-4">
                <div>
                  <label className="block font-mono text-sm text-foreground mb-1">Title</label>
                  <input
                    required
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    className="w-full bg-background border-2 border-border/50 rounded-md p-2 text-foreground font-sans focus:border-primary outline-none transition-colors"
                    placeholder="Brief summary..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-sm text-foreground mb-1">Description</label>
                  <textarea
                    required
                    value={submitBody}
                    onChange={(e) => setSubmitBody(e.target.value)}
                    className="w-full bg-background border-2 border-border/50 rounded-md p-2 text-foreground font-sans focus:border-primary outline-none transition-colors min-h-[120px] resize-y"
                    placeholder="Detailed explanation of the request or bug..."
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="glow-button no-lift text-white px-4 py-2 md:px-6 md:py-2 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? "SENDING..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Tracker() {
  return (
    <Suspense fallback={<div className="p-32 text-center font-mono animate-pulse">LOADING WORKSPACE...</div>}>
      <TrackerContent />
    </Suspense>
  )
}
