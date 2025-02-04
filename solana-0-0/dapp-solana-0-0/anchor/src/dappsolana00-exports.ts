// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import Dappsolana00IDL from '../target/idl/dappsolana00.json'
import type { Dappsolana00 } from '../target/types/dappsolana00'

// Re-export the generated IDL and type
export { Dappsolana00, Dappsolana00IDL }

// The programId is imported from the program IDL.
export const DAPPSOLANA00_PROGRAM_ID = new PublicKey(Dappsolana00IDL.address)

// This is a helper function to get the Dappsolana00 Anchor program.
export function getDappsolana00Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...Dappsolana00IDL, address: address ? address.toBase58() : Dappsolana00IDL.address } as Dappsolana00, provider)
}

// This is a helper function to get the program ID for the Dappsolana00 program depending on the cluster.
export function getDappsolana00ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Dappsolana00 program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return DAPPSOLANA00_PROGRAM_ID
  }
}
