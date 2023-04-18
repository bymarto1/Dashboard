import { ethers } from 'ethers';
import { useState, useEffect, Alert,} from 'react';
import '../styles/ConnectWalletButton.css';

import dashboardService from '../services/dashboard';
import { useAuth } from '../hooks/useAuth';


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
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isTransactionSent, setIsTransactionSent] = useState(false);
  const [isTransactionCompleted, setIsTransactionCompleted] = useState(false);
  var price = '0.05'
  const auth = useAuth();
  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3Provider.getSigner();
        const signerAddress = await signer.getAddress();
        setProvider(web3Provider);
        setSigner(signerAddress);
        setIsConnected(true); // Set isConnected to true when the wallet is connected
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  }
  
  async function pay() {
    console.log('started pay')
    const recipientAddress = '0xd5C1D179669EED09E66544f1037B55993929092e';
    const mumbaiRpcUrl = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';
    const maticNetwork = {
      chainId: 80001,
      name: 'Mumbai Testnet',
      rpcUrl: mumbaiRpcUrl,
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
    };
  
    // Create a new provider for the Mumbai Testnet
    try {
      const signer = provider.getSigner();
      const transaction = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(price),
      });
      console.log(transaction)
      const transactionStatus = document.getElementById('transaction-status');
      transactionStatus.innerHTML = 'Transaction sent';
      transactionStatus.style.display = 'block';
      await transaction.wait();
      transactionStatus.innerHTML = 'Transaction complete';
      const paymentStatus = document.getElementById('payment-status');
      paymentStatus.innerHTML = 'Payment processing...';
      paymentStatus.style.display = 'block';
      await handlePayment(transaction.hash, price);
      paymentStatus.innerHTML = 'Payment successful';
    } catch (error) {
      if (error.code === ethers.utils.Logger.errors.INSUFFICIENT_FUNDS) {
        const transactionStatus = document.getElementById('transaction-status');
        transactionStatus.innerHTML = 'Insufficient balance. Please add funds to your account.';
        transactionStatus.style.display = 'block';
      } else {
        console.error(error);
      }
    }
  }
  
  async function handlePayment(transactionHash , price){
    const response = await dashboardService.payRenewal(transactionHash, price,auth.token);
    if (response === 200) {
        document.getElementById('payment-status').innerHTML = 'Payment successful';
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 1500);
    } else {
        document.getElementById('payment-status').innerHTML = 'Payment failed';
    }
  };


  return (
    <button className="connect-wallet-button" onClick={isConnected ? pay : connectWallet}>
      <div className="icon"></div>
      <div className="text">{isConnected ? 'Pay' : 'Connect Wallet'}</div>
    </button>
  );
}

export default ConnectAndPay;