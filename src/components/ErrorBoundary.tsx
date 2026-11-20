import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

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
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (e) {
      // ignore storage errors
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050510',
            color: '#f1f5f9',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '36px 28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 10px', color: '#fff' }}>
              Memuat Ulang Tampilan
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.5 }}>
              Sistem mendeteksi pembaruan skrip atau cache browser sebelumnya. Silakan klik tombol di bawah untuk menyinkronkan kembali.
            </p>

            <button
              onClick={this.handleReload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 28px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
              }}
            >
              <RefreshCw size={16} />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
