import type { NextPage } from 'next'
import { useReducer, useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [isExecutable, setIsExecutable] = useState('');

  const addressSubmittedHandler =  async (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address);
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
      await connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL);
      });

      await connection.getAccountInfo(key).then(accountInfo => {
        if (accountInfo !== null) {
          setIsExecutable(`${accountInfo.executable}`);
          console.log(accountInfo);
        } else {
          setIsExecutable('');
        }
      })
      
    } catch (error) {
      setAddress('');
      setBalance(0);
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable: ${isExecutable}`}</p>
      </header>
    </div>
  )
}

export default Home
