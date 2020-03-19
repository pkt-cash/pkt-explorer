import React from 'react'

const Orphan = ({ children }) => <a href="https://www.investopedia.com/terms/o/orphan-block-cryptocurrency.asp">{children}</a>
const Coinbase = ({ children }) => <a href="https://en.bitcoin.it/wiki/Coinbase">{children}</a>
const NLockTime = ({ children }) => <a href="https://en.bitcoin.it/wiki/NLockTime">{children}</a>
const NetworkSteward = ({ children }) => <a href="https://pkt-cash.github.io/www.pkt.cash/steward/">{children}</a>
const SegwitCommitment = ({ children }) => <a href="https://en.bitcoin.it/wiki/BIP_0141#Commitment_structure">{children}</a>
const PacketCryptCommitment = ({ children }) => <a href="https://github.com/cjdelisle/PacketCrypt#how-it-works">{children}</a>

export default {
  Orphan,
  Coinbase,
  NLockTime,
  NetworkSteward,
  SegwitCommitment,
  PacketCryptCommitment
}
