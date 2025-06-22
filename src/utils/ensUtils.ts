
import { normalize } from 'viem/ens'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// TODO: Add your Infura/Alchemy API key for ENS resolution
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'), // Replace with your key
})

export const resolveENS = async (ensName: string): Promise<string | null> => {
  try {
    const address = await publicClient.getEnsAddress({
      name: normalize(ensName),
    })
    return address
  } catch (error) {
    console.error('ENS resolution failed:', error)
    return null
  }
}

export const reverseResolveENS = async (address: string): Promise<string | null> => {
  try {
    const ensName = await publicClient.getEnsName({
      address: address as `0x${string}`,
    })
    return ensName
  } catch (error) {
    console.error('Reverse ENS resolution failed:', error)
    return null
  }
}

export const formatAddress = (address: string, ensName?: string | null): string => {
  if (ensName) return ensName
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
