import React from 'react';

const SortIcon = ({
    direction
}) => {
    return (
        <span className={`direction ${direction}`}>^</span>
    )
}

export default React.memo(SortIcon);