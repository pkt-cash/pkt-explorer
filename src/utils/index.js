export function treatDTx (data) {
  return data.map((data, i) => [i + 1, data.transactionCount])
}