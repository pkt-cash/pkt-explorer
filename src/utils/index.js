export function treatDTx (data) {
  return data.map((data, i) => [new Date(data.date), data.transactionCount])
}

export const displayPKT = (amount) => Number(amount) / 0x40000000
