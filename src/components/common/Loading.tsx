import React from 'react';
import '../../styles/Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  fullScreen = false,
}) => {
  const content = (
    <div className="loading-content">
      <div className={`spinner spinner-${size}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loading-fullscreen">{content}</div>;
  }

  return content;
};

export default Loading;