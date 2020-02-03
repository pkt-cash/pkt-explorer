export function treatDTx (data) {
  return data.map((data, i) => [new Date(data.date), data.transactionCount])
}
