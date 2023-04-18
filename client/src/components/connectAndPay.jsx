import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import '../styles/ConnectWalletButton.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    // flexGrow: 1,
    // py: 8,
};

export const ConnectAndPay = () => { 
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  async function connectWallet() {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      const signer = web3Provider.getSigner();
      const signerAddress = await signer.getAddress();
      setProvider(web3Provider);
      setAddress(signerAddress);
      setIsConnected(true); // Set isConnected to true when the wallet is connected
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  }

  async function pay() {
    const contractAddress = '0x1234567890123456789012345678901234567890';
    const contractAbi = [
      // Contract ABI
    ];
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const signer = provider.getSigner();
    
    try {
      const transaction = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther('1.0'),
      });
      await transaction.wait();
      alert('Transaction complete!');
    } catch (error) {
      if (error.code === ethers.utils.Logger.errors.INSUFFICIENT_FUNDS) {
        alert('Insufficient balance. Please add funds to your account.');
      } else {
        console.error(error);
      }
    }
  }

  return (
    <button className="connect-wallet-button" onClick={isConnected ? pay : connectWallet}>
      <div className="icon"></div>
      <div className="text">{isConnected ? 'Pay' : 'Connect Wallet'}</div>
    </button>
  );
}

export default ConnectAndPay;