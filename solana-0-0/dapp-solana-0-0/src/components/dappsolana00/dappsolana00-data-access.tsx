'use client'

import { getDappsolana00Program, getDappsolana00ProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useDappsolana00Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getDappsolana00ProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getDappsolana00Program(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['dappsolana00', 'all', { cluster }],
    queryFn: () => program.account.dappsolana00.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['dappsolana00', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ dappsolana00: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useDappsolana00ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useDappsolana00Program()

  const accountQuery = useQuery({
    queryKey: ['dappsolana00', 'fetch', { cluster, account }],
    queryFn: () => program.account.dappsolana00.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['dappsolana00', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ dappsolana00: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['dappsolana00', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ dappsolana00: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['dappsolana00', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ dappsolana00: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['dappsolana00', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ dappsolana00: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
