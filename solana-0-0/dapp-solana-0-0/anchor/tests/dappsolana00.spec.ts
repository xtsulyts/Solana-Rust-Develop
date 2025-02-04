import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Dappsolana00} from '../target/types/dappsolana00'

describe('dappsolana00', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Dappsolana00 as Program<Dappsolana00>

  const dappsolana00Keypair = Keypair.generate()

  it('Initialize Dappsolana00', async () => {
    await program.methods
      .initialize()
      .accounts({
        dappsolana00: dappsolana00Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([dappsolana00Keypair])
      .rpc()

    const currentCount = await program.account.dappsolana00.fetch(dappsolana00Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Dappsolana00', async () => {
    await program.methods.increment().accounts({ dappsolana00: dappsolana00Keypair.publicKey }).rpc()

    const currentCount = await program.account.dappsolana00.fetch(dappsolana00Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Dappsolana00 Again', async () => {
    await program.methods.increment().accounts({ dappsolana00: dappsolana00Keypair.publicKey }).rpc()

    const currentCount = await program.account.dappsolana00.fetch(dappsolana00Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Dappsolana00', async () => {
    await program.methods.decrement().accounts({ dappsolana00: dappsolana00Keypair.publicKey }).rpc()

    const currentCount = await program.account.dappsolana00.fetch(dappsolana00Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set dappsolana00 value', async () => {
    await program.methods.set(42).accounts({ dappsolana00: dappsolana00Keypair.publicKey }).rpc()

    const currentCount = await program.account.dappsolana00.fetch(dappsolana00Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the dappsolana00 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        dappsolana00: dappsolana00Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.dappsolana00.fetchNullable(dappsolana00Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
