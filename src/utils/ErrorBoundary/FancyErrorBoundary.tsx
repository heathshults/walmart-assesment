import * as React from 'react';
import { useLocation } from 'react-router-dom';


function usePrevious<T>(value: T) {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}


export class RealErrorBoundary extends React.Component<
  { children?: React.ReactNode; setTrackPathChange: (track: boolean) => void },
  { error: unknown }
> {
  state = { error: undefined };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.props.setTrackPathChange(true);
  }

  render() {
    if (this.state.error) {
      return <p>An unknown error happened.</p>;
    } else {
      return this.props.children;
    }
  }
}

export interface iErrorBoundary {
  children: React.ReactNode 
}

// this "fake" error boundary will reset the "real" error boundary
// whenever a pathname change happens _after_ an error
export const ErrorBoundary: React.FC = ({ children }: iErrorBoundary) => {
  const [key, setKey] = React.useState(0);
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);
  const [trackPathChange, setTrackPathChange] = React.useState(false);

  React.useEffect(() => {
    if (trackPathChange && previousPathname !== pathname) {
      setKey(key => key + 1);
      setTrackPathChange(false);
    }
  }, [trackPathChange, previousPathname, pathname]);

  return (
    <RealErrorBoundary key={key} setTrackPathChange={setTrackPathChange}>
      {children}
    </RealErrorBoundary>
  );
};

export class FatalErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { error: unknown }
> {
  state = { error: undefined };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <p>
          A fatal error happened. You can only try ro reload.
          <button onClick={() => window.location.reload()}>Reload</button>
        </p>
      );
    } else {
      return this.props.children;
    }
  }
}

export const ErrBoundary = [
  RealErrorBoundary,
  ErrorBoundary,
  FatalErrorBoundary
]
export default ErrBoundary