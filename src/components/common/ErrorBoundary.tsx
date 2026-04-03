'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ErrorBoundary [${this.props.name || 'Anonymous'}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 rounded-[2rem] bg-red-50 border-2 border-red-100 text-center my-8">
          <h2 className="text-xl font-black text-red-900 mb-2 uppercase tracking-tighter">Something went wrong</h2>
          <p className="text-sm text-red-700 font-bold opacity-70">We encountered a small rendering issue in this section, but the rest of the app is still working. Try refreshing the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
