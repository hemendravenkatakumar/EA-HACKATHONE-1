import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AgroVoice Uncaught Error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.hash = ''
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f7faf8] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-stone-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-display font-extrabold text-stone-900">
              Something went wrong
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              We encountered a temporary display issue. Click below to refresh your farm dashboard.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-[#1b6b43] hover:bg-[#124e31] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload AgroVoice Dashboard</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
