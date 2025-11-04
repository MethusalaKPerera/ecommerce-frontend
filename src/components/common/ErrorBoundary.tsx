import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Button from './Button';
import Card from './Card';
import '../../styles/ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-container">
          <Card variant="glass">
            <div className="error-boundary-content">
              <div className="error-icon">⚠️</div>
              <h2>Oops! Something went wrong</h2>
              <p>We're sorry, but something unexpected happened.</p>
              {import.meta.env.DEV && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development Only)</summary>
                  <pre>{this.state.error.toString()}</pre>
                </details>
              )}
              <Button variant="primary" onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

