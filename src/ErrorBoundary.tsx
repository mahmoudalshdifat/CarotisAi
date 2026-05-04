import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('[CarotisAi ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary">
          <h2>Ein unerwarteter Fehler ist aufgetreten.</h2>
          <p>Die Anwendung konnte nicht gerendert werden. Bitte Seite neu laden.</p>
          {this.state.message && <pre className="error-detail">{this.state.message}</pre>}
          <button
            type="button"
            className="action-btn action-btn-advance"
            onClick={() => this.setState({ hasError: false, message: '' })}
          >
            Erneut versuchen
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
