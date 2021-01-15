import React from 'react';
import twemoji from 'twemoji';

const Emoji = ({ code }: { code: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: twemoji.parse(code) }} />;
};

export default Emoji;
