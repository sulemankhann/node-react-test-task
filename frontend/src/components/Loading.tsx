import React from 'react'
import ContentLoader from 'react-content-loader'

const Loading: React.FC = () => {
    return (
        <div className="bg-white p-5 shadow-lg rounded-xl">
            <ContentLoader
                height={140}
                width="100%"
                foregroundColor="rgba(0,0,0,0.1)"
                backgroundColor="rgba(0,0,0,0.2)"
                speed={1}
            >
                <rect x="0" y="0" rx="70" ry="70" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="150" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="270" height="10" />

                <rect x="0" y="85" width="100%" height="1" />

                <rect x="0" y="100" rx="3" ry="6" width="80" height="40" />
                <rect x="100" y="100" rx="3" ry="6" width="80" height="40" />
            </ContentLoader>
        </div>
    )
}

export default Loading
