const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://pkt.cash'
export default {
  blkLApi: `${backendURL}/api/v1/PKT/pkt/chain/down`,
  richLApi: `${backendURL}/api/v1/PKT/pkt/stats/richlist`,
  addrMetaApi: `${backendURL}/api/v1/PKT/pkt/address`,
  blockApi: `${backendURL}/api/v1/PKT/pkt/block`,
  pkApi: `${backendURL}/api/v1/PKT/pkt/packetcrypt/stats`,
  txStats: `${backendURL}/api/v1/PKT/pkt/stats/daily-transactions`
}
