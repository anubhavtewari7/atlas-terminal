// ErrorBoundary.js -- class component (required by React error boundary API).
// Catches render-time exceptions in any child subtree so a single bad component
// cannot crash the whole terminal. Renders a minimal dark-themed fallback.
//
// Usage:
//   <ErrorBoundary label="Globe">
//     <Globe ... />
//   </ErrorBoundary>

import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Log to console in dev; swap for Sentry/Datadog call here in prod.
    console.error('[ErrorBoundary]', this.props.label || 'Component', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      const label = this.props.label || 'Module'
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[120px] bg-black/60 border border-rose-500/20 rounded-lg text-center p-6 gap-2">
          <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">{label} Unavailable</span>
          <span className="text-slate-500 text-[10px]">A render error occurred. Refresh the page to restore this module.</span>
          <button
            className="mt-2 text-[10px] text-slate-400 border border-white/10 px-3 py-1 rounded hover:border-white/20 transition-colors"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
