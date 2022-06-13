export enum EAccountType {
  // states follows the bexio states
  // https://docs.bexio.com/#operation/v2ListAccounts
  'earnings' = 1,
  'expenses' = 2,
  'active_accounts' = 3,
  'passive_accounts' = 4,
  'complete_accounts' = 5, // (Abschluss)
}
