import React from 'react'

export default function BookShelf(props) {
    const childrenArray = []

    function calculateWithLimit(calculation, index, limit) {
        if (index > limit) {
            return index % limit
        }

        return calculation
    }

    function checkWhichRow(_rows, columns, index) {
        // Needs to be added row limit later if there is supposed to be more than one bookshelf.
        if (index > columns) {
            return Math.floor(index / columns)
        }

        return 0
    }

    for (let i = 0; i < props.iterate; i++) {
        const position = [
            calculateWithLimit(props.gap * i, i, props.columns),
            checkWhichRow(props.rows, props.columns, i),
            0
        ]

        childrenArray.push(
            React.cloneElement(props.children, { key: i, position })
        )
    }

    return (
        <>
            { childrenArray }
        </>
    )
}