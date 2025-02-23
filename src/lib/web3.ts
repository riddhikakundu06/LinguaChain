import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  async connect(): Promise<string | null> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        
        // Get the connected address
        const address = await this.signer.getAddress();

        // Listen for account changes
        window.ethereum.on('accountsChanged', this.handleAccountsChanged);
        window.ethereum.on('chainChanged', this.handleChainChanged);

        return address;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        throw error;
      }
    } else {
      const error = new Error('Please install MetaMask to use this feature');
      error.name = 'NoMetaMask';
      throw error;
    }
  }

  private handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      window.location.reload();
    }
  };

  private handleChainChanged = () => {
    // Reload the page when the chain changes
    window.location.reload();
  };

  async disconnect(): Promise<void> {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
    }
    this.provider = null;
    this.signer = null;
  }

  isConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }
}

export const web3Service = new Web3Service();