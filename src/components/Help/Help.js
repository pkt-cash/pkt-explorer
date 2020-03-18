import React from 'react'

export default {
    Orphan: ({children}) =>
        <a href="https://www.investopedia.com/terms/o/orphan-block-cryptocurrency.asp">{children}</a>,
    Coinbase: ({children}) =>
        <a href="https://en.bitcoin.it/wiki/Coinbase">{children}</a>,
    NLockTime: ({children}) =>
        <a href="https://en.bitcoin.it/wiki/NLockTime">{children}</a>,
    NetworkSteward: ({children}) =>
        <a href="https://pkt-cash.github.io/www.pkt.cash/steward/">{children}</a>,
}