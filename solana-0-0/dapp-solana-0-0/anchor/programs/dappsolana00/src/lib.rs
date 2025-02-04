#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod dappsolana00 {
    use super::*;

  pub fn close(_ctx: Context<CloseDappsolana00>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.dappsolana00.count = ctx.accounts.dappsolana00.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.dappsolana00.count = ctx.accounts.dappsolana00.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeDappsolana00>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.dappsolana00.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeDappsolana00<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Dappsolana00::INIT_SPACE,
  payer = payer
  )]
  pub dappsolana00: Account<'info, Dappsolana00>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseDappsolana00<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub dappsolana00: Account<'info, Dappsolana00>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub dappsolana00: Account<'info, Dappsolana00>,
}

#[account]
#[derive(InitSpace)]
pub struct Dappsolana00 {
  count: u8,
}
