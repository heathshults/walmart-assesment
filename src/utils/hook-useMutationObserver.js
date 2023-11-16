const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
};

/* Example 

const App = () => {
  const mutationRef = React.useRef();
  const [mutationCount, setMutationCount] = React.useState(0);
  const incrementMutationCount = () => {
    return setMutationCount(mutationCount + 1);
  };
  useMutationObserver(mutationRef, incrementMutationCount);
  const [content, setContent] = React.useState('Hello world');

  return (
    <>
      <label for="content-input">Edit this to update the text:</label>
      <textarea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div
        style={{ width: '100%' }}
        ref={mutationRef}
      >
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
      </div>
      <div>
        <h3>Mutation count {mutationCount}</h3>
      </div>
    </>
  );
};


*/