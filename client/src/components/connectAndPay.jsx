import { ethers } from 'ethers';
import { useState, useEffect, Alert,} from 'react';
import '../styles/ConnectWalletButton.css';
import { Box, Container, Typography, LinearProgress,} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [expiryDate, setExpiryDate] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  var price = '0.05'
  const auth = useAuth();

  useEffect(() => {
      dashboardService
          .getPaymentInfo(auth.token)
          .then((info) => {
              if (info ) {
                  const { expiryDate } = info;
                  setExpiryDate(expiryDate ? expiryDate : '');
              }
          });
      setLoading(false);
  }, [auth.token]);

  // Calculate the difference between the expiry date and the current date
  const diffInMs = expiryDate ? new Date(expiryDate) - new Date() : 0;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // Determine the status of the subscription
  let subscriptionStatus = '';
  if (!expiryDate) {
    subscriptionStatus = 'Unknown';
  } else if (diffInMs <= 0) {
    subscriptionStatus = 'Expired';
  } else {
    subscriptionStatus = 'Active';
  }

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
      setTransactionStatus('Sent')
      setIsButtonHidden(true)
      setLoading(true)
      await transaction.wait();
      setTransactionStatus('Completed')
      setPaymentStatus('Sent')
      await handlePayment(transaction.hash, price);
      setPaymentStatus('Completed')
      window.location.reload();

    } catch (error) {
      if (error.code === ethers.utils.Logger.errors.INSUFFICIENT_FUNDS) {
        const transactionStatus = document.getElementById('transaction-status');
        transactionStatus.innerHTML = 'Insufficient balance. Please add funds to your account.';
        transactionStatus.style.display = 'block';
        setLoading(false)
      } else {
        console.error(error);
        setLoading(false)

      }
    }
  }
  
  async function handlePayment(transactionHash , price){
    try {
      const response = await dashboardService.payRenewal(transactionHash, price, auth.token);
      if (response === 200) {
        document.getElementById('payment-status').innerHTML = 'Payment Completed';
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      } else {
        document.getElementById('payment-status').innerHTML = 'Payment failed';
      }
    } catch (error) {
      if (error.message === 'insufficient funds') {
        setPaymentStatus('Error: Insufficient funds');
        alert('Insufficient funds');
      } else {
        setPaymentStatus('Error: ' + error.message);
      }
      setLoading(false);
    }
  
    if (parseFloat(await dashboardService.getBalance(auth.token)) < price) {
      setPaymentStatus('Error: Insufficient balance');
    }
  };


  return (
    <Box
    component='main'
    sx={{
      flexGrow: 1,
      py: 8,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }}
  >
    <Box sx={{ mr: 8, flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Expiry Date:</Typography>
        <Typography variant='h6' sx={{ fontSize: '18px' }}>{expiryDate ? new Date(expiryDate).toLocaleDateString() : 'Unknown'}</Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Subscription Status:</Typography>
        <Typography variant='h6' sx={{ fontSize: '18px', color: subscriptionStatus === 'Expired' ? 'red' : 'inherit' }}>
          {subscriptionStatus} {subscriptionStatus === 'Active' && diffInDays > 0 ? `(${diffInDays} days left)` : ''}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ mb: 4 }}>
        {!isButtonHidden ? (
          <button className="connect-wallet-button" onClick={() => {
              if (isConnected) {
                pay();
              } else {
                connectWallet();
              }
            }}>
            <div className="icon"></div>
            <div className="text">{isConnected ? 'Pay' : 'Connect Wallet'}</div>
          </button>
        ) : null}
        {transactionStatus === 'Sent' && (
          <Box sx={{ position: 'relative', height: 36 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      {transactionStatus && (transactionStatus === 'Sent' || transactionStatus === 'Completed') && (
        <Typography sx={{ mb: 3, fontSize: 18 }} id="transaction-status">
            Transaction {transactionStatus}
        </Typography>
      )}
  
      {paymentStatus && (paymentStatus === 'Sent' || paymentStatus === 'Completed' || paymentStatus.startsWith('Error')) && (
        <Typography sx={{ mb: 3, fontSize: 18, color: paymentStatus.startsWith('Error') ? 'red' : 'inherit' }} id="payment-status">
          Payment {paymentStatus}
        </Typography>
      )}
    </Box>
  </Box>
  );
}
    
export default ConnectAndPay;