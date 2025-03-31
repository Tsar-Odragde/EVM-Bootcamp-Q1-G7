import { Injectable } from '@nestjs/common';
import * as tokenJson from "./assets/MyToken.json";
import { Address, createPublicClient, createWalletClient, http, parseUnits } from 'viem';
import { sepolia } from 'viem/chains';
import { ConfigService } from '@nestjs/config';
import { privateKeyToAccount } from 'viem/accounts';

@Injectable()
export class AppService {
  publicClient;
  walletClient;

  constructor(private configService: ConfigService) {
    const account = privateKeyToAccount(`0x${this.configService.get<string>('PRIVATE_KEY')}`);
    const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${this.configService.get<string>('ALCHEMY_API_KEY')}`

    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(rpcUrl),
    });
    this.walletClient = createWalletClient({
      transport: http(rpcUrl),
      chain: sepolia,
      account: account,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): string {
    const address = this.configService.get<string>('TOKEN_ADDRESS');
    if (!address) {
      throw new Error("TOKEN_ADDRESS is not defined in the configuration.");
    }
    return address;
  }

  async getTokenName(): Promise<string> {
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as Address,
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name as string;
  }

  async getTransactionReceipt(hash: string) {
    throw new Error('Method not implemented.');
  }

  getTokenBalance(address: string) {
    throw new Error('Method not implemented.');
  }

  async getTotalSupply(): Promise<string> {
    const totalSupplyBn = await this.publicClient.readContract({
      address: this.getContractAddress() as Address,
      abi: tokenJson.abi,
      functionName: "totalSupply"
    });
    return totalSupplyBn.toString() as string;
  }

  getServerWalletAddress() {
    return this.walletClient.account.address;
  }

  async checkMinterRole(address: string): Promise<boolean> {
    // const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
    const MINTER_ROLE =  await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: 'MINTER_ROLE'
    });
    const hasRole = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: 'hasRole',
      args: [MINTER_ROLE, address],
    });
    return hasRole;
  }

  async mintTokens(recipientAddress: string, amount: string): Promise<string> {
    console.log(`Minting ${amount} tokens to ${recipientAddress}`);

    const mintTx = await this.walletClient.writeContract({
      address: this.getContractAddress() as Address,
      abi: tokenJson.abi,
      functionName: "mint",
      args: [recipientAddress, parseUnits(amount, 18)],
    });
  
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash: mintTx });
  
    console.log(`Minted successfully. Tx Hash: ${receipt.transactionHash}`);
    return receipt.transactionHash;
  }
}  
