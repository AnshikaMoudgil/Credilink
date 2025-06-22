const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let nonces = {};

app.post('/nonce', (req, res) => {
  const { address } = req.body;
  const nonce = Math.floor(Math.random() * 1e6).toString();
  nonces[address] = nonce;
  res.json({ nonce });
});

app.post('/verify', (req, res) => {
  const { address, signature } = req.body;
  const nonce = nonces[address];
  if (!nonce) return res.status(400).json({ error: 'No nonce for address' });

  try {
    const recovered = ethers.verifyMessage(nonce, signature);
    if (recovered.toLowerCase() === address.toLowerCase()) {
      delete nonces[address];
      return res.json({ success: true });
    } else {
      return res.status(401).json({ error: 'Signature invalid' });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Verification failed' });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000')); 