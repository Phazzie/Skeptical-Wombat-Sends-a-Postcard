import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dots p-4">
          <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-neo max-w-md w-full text-center">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-display font-bold text-black mb-2">Oops! Something went wrong.</h1>
            <p className="text-slate-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-left mb-6 overflow-auto max-h-40">
              <code className="text-xs text-red-600 font-mono">
                {this.state.error?.message}
              </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors w-full"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
