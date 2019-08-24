import React from 'react';

import './TodoPage.css';

export default ({ children }) => {
    return (
        <section className="TodoPage">
            {children}
        </section>
    )
}