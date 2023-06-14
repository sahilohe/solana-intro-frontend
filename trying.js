const Web3 = require('@solana/web3.js');

// amount to be transferred
const amount = 0.5;

// creating the sender and recipient wallet addresses
const sender = Web3.Keypair.generate();
const recipient = Web3.Keypair.generate();

// keypair for the sender account used to sign the transaction
const keyPair = Web3.Keypair.fromSecretKey(sender.secretKey);

console.log(sender.publicKey.toString());

async function TransactionWorking() {
  const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'), 'confirmed');
  const transaction = new Web3.Transaction();

  // requesting 1 SOL to be airdroped to the sender's account
  await connection.requestAirdrop(sender.publicKey, Web3.LAMPORTS_PER_SOL);

  // system instruction for transferring funds between accounts
  const sendSOLTransaction = Web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient.publicKey,
    lamports: Web3.LAMPORTS_PER_SOL * amount,
  });

   transaction.add(sendSOLTransaction);

  // signing the transaction with the keypair
  const signature = await Web3.sendSOLTransaction(
    connection,
    transaction,
    [keyPair]
  );

  console.log(signature);
}

TransactionWorking();
