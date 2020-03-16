const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://pkt.cash'
export default {
  blkUpApi: `${backendURL}/api/v1/PKT/pkt/chain/up`,
  blkDownApi: `${backendURL}/api/v1/PKT/pkt/chain/down`,
  richLApi: `${backendURL}/api/v1/PKT/pkt/stats/richlist`,
  addrMetaApi: `${backendURL}/api/v1/PKT/pkt/address`,
  blockApi: `${backendURL}/api/v1/PKT/pkt/block`,
  pcBlockApi: `${backendURL}/api/v1/PKT/pkt/packetcrypt`,
  pkApi: `${backendURL}/api/v1/PKT/pkt/packetcrypt/stats`,
  txStats: `${backendURL}/api/v1/PKT/pkt/stats/daily-transactions`
}
