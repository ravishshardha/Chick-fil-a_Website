import React, { useEffect } from 'react';

const UserwayWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute("data-position", "10");
    script.setAttribute('data-account', 'G8Q4kJUUFu');
    script.setAttribute('src', 'https://cdn.userway.org/widget.js');
    document.body.appendChild(script);
  }, []);

  return (
    <noscript>Please ensure Javascript is enabled for purposes of <a href="https://userway.org">website accessibility</a></noscript>
  );
};

export default UserwayWidget;