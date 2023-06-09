import { ethers } from 'ethers'

export const web3InitialState = {
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  connect: null,
  disconnect: null,
  chainId: null
}

export function web3Reducer(
  state,
  action
) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        network: action.network,
        chainId: action.chainId
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_NETWORK':
      return {
        ...state,
        network: action.network,
        chainId: action.chainId
      }
    case 'RESET_WEB3_PROVIDER':
      return web3InitialState
    default:
      throw new Error()
  }
}