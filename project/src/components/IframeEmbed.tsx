import React from 'react';

const IframeEmbed: React.FC = () => {
    return (
        <iframe
            src="http://dify.homelab.ddnsguru.com/chatbot/mmDbumgz3CriXYXI"
            style={{ width: '100%', height: '100%', minHeight: '700px' }}
            frameBorder="0"
            allow="microphone"
        ></iframe>
    );
};

export default IframeEmbed;
