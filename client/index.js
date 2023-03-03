const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const tree = new MerkleTree(niceList);
const root = tree.getRoot();

const nameToVerify = niceList[40];

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const index = niceList.findIndex((n) => n === nameToVerify);
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: nameToVerify,
    proof,
  });

  console.log({ gift });
}

main();
