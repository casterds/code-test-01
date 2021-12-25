import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import config from "utils/config";

/**
 * Gets metamask client.
 */
export async function getMetamask(): Promise<any> {
  return await detectEthereumProvider();
}

/**
 * Gets the ethers client.
 */
export async function getEthers(): Promise<ethers.providers.Web3Provider | null> {
  const metamask = await getMetamask();
  if (!metamask) {
    return null;
  }

  return new ethers.providers.Web3Provider(metamask);
}

/**
 * Gets the query contract client.
 */
export async function getEthersQueryContract(): Promise<ethers.Contract | null> {
  const eth = await getEthers();
  if (!eth) {
    return null;
  }

  return new ethers.Contract(config.CONTRACT_ADDRESS, config.CONTRACT_ABI, eth);
}

/**
 * Gets the mutation contract client.
 */
export async function getEthersMutationContract(): Promise<ethers.Contract | null> {
  const eth = await getEthers();
  if (!eth) {
    return null;
  }

  const signer = eth.getSigner();
  return new ethers.Contract(
    config.CONTRACT_ADDRESS,
    config.CONTRACT_ABI,
    signer
  );
}