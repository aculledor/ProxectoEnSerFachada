import React from 'react';

const Film = ({ className, strokeWidth = 2, fill='none', strokeColor = 'currentColor'} ) => {
    return (
            <svg  className={className} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" stroke={strokeColor}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
    )
}

export default Film;