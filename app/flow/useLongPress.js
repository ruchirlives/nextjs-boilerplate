const useLongPress = (callback, ms = 500) => {
    let timerId;
  
    const start = (event) => {
      // Prevent the default action to ensure the page doesn't start selecting text, etc.
      event.preventDefault();
  
      // Cancel any ongoing timeout to avoid triggering multiple callbacks
      clearTimeout(timerId);
  
      // Start a new timeout
      timerId = setTimeout(() => callback(event), ms);
    };
  
    const stop = () => {
      clearTimeout(timerId);
    };
  
    return {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchEnd: stop,
    };
  };
  

export default useLongPress;
