
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { coinbaseWallet, walletConnect, injected } from 'wagmi/connectors'

// TODO: Add your project ID from WalletConnect Cloud (https://cloud.walletconnect.com)
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

export const config = createConfig({
  chains: [mainnet, polygon, bsc],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'CrediLink+',
    }),
    walletConnect({
      projectId,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
})

// TODO: Add your Infura/Alchemy API keys for better RPC performance
// Replace the http() calls above with:
// [mainnet.id]: http('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'),
// [polygon.id]: http('https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY'),
// [bsc.id]: http('https://bsc-dataseed.binance.org/'),
