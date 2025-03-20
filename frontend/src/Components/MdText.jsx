import React from 'react';
import ReactMarkdown from 'react-markdown';

function AssistantText({ content }) {
  return (
    <div className="prose prose-invert max-w-full break-words">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default AssistantText;
