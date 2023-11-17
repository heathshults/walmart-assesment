import React from 'react';


export interface FallbackComponentProps {
    error: Record<string, any>
    resetErrorBoundary: any
}

export function FallbackComponent({ error, resetErrorBoundary }: FallbackComponentProps) {
    resetErrorBoundary = () => {
        // @ts-expect-error
        window.location.reload(false);
    }
    

  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <p><a href="#" onClick={resetErrorBoundary}>Reset</a></p>
    </div>
  );

}
export default FallbackComponent;

/*
<ErrorBoundary
  FallbackComponent={Fallback}
  onReset={(details) => {
    // Reset the state of your app so the error doesn't happen again
  }}
>
  <ExampleApplication />
</ErrorBoundary>;
    return <>ErrorBoundaryFallbackComponent</>;
};
*/