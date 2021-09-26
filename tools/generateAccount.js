const { ethers } = require("hardhat");
const { Wallet } = ethers;
const fs = require('fs')

const wallet = Wallet.createRandom();

const data = {
    key: wallet._signingKey(),
    address: wallet.address,
    mnemonic: wallet.mnemonic
}

try {
    fs.writeFileSync("key.json", JSON.stringify(data, null, 4))
} catch (err) {
    console.error(err)
}

console.log(data);