import Head from "next/head";
import { useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import Minter from "../src/artifacts/contracts/Minter.sol/Minter.json";
import TotalSupply from "../components/TotalSupply";
import Wallet from "../components/Wallet";
import Image from "next/image";
import PIC from "../public/pic.png";

export default function Home() {
  const [mintError, setMintError] = useState(false);
  const [mintMessage, setMintMessage] = useState("");
  const [mintLoading, setMintLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    personality: "",
    eyeColor: "",
    fingerprint: 0,
  });
  const [tokenURI, setTokenURI] = useState("");
  const [urlInput, setUrlInput] = useState("");

  async function mintNFTs() {
    if (!hasEthereum()) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const address = await signer.getAddress();

        setMintLoading(true);
        // Interact with contract
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MINTER_ADDRESS,
          Minter.abi,
          signer
        );
        const transaction = await contract.mint("ipfs://ExampleURL.com");
        await transaction.wait();

        setMintMessage(`Congrats, you minted!`);
        setMintError(false);
      } catch {
        setMintMessage("Connect your wallet first.");
        setMintError(true);
      }
    } catch (error) {
      setMintMessage(error.message);
      setMintError(true);
    }
    setMintLoading(false);
  }

  const tokenId = 6;

  async function getTokenURI() {
    if (!hasEthereum()) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MINTER_ADDRESS,
          Minter.abi,
          signer
        );
        const tx = await contract.tokenURI(tokenId);
        console.log(tx);
        setTokenURI(tx);
        await tx.wait();
      } catch {
        // console.log("error");
      }
    } catch (error) {
      console.log("failed");
    }
  }

  async function changeTokenUri() {
    if (!hasEthereum()) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MINTER_ADDRESS,
          Minter.abi,
          signer
        );
        const tx = await contract.changeTokenURI(tokenId, urlInput);
        console.log(tx);
        await tx.wait();
        getTokenURI();
      } catch {
        // console.log("error");
      }
    } catch (error) {
      console.log("failed");
    }
  }

  return (
    <div className="flex justify-center px-4 bg-gray-700 h-screen pt-36">
      <Head>
        <title>NFT Minting dApp Starter</title>
        <meta name="description" content="Mint an NFT, from the client-side." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wallet />
      <main className="">
        {!process.env.NEXT_PUBLIC_MINTER_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_MINTER_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="mb-8">
                <h1 className="text-4xl font-semibold mb-8 text-pink-400">
                  Fingerprint NFT Minting dApp
                </h1>
                <TotalSupply />
              </div>
              <div className="flex justify-between items-center">
                <Image src={PIC} alt="pic" width="500px" height="300px" />
                <div className="ml-28">
                  <div className="mt-4 flex-col justify-center items-center">
                    <div className="flex">
                      <label className="text-white mt-2 mr-8">Name:</label>
                      <div>
                        <input
                          onChange={(evt) =>
                            setDetails({
                              ...details,
                              name: evt.target.value,
                            })
                          }
                          type="text"
                          className="bg-paszamine-700 focus:border-pink-300 border-2 rounded-lg border-soorati-300 mb-4 w-32 md:w-48 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <label className="text-white mt-2 mr-8">
                        Personality type:
                      </label>
                      <div>
                        <input
                          onChange={(evt) =>
                            setDetails({
                              ...details,
                              personality: evt.target.value,
                            })
                          }
                          type="text"
                          className="bg-paszamine-700 focus:border-pink-300 border-2 rounded-lg border-soorati-300 mb-4 w-32 md:w-48 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <label className="text-white mt-2 mr-8">Eye color:</label>
                      <div>
                        <input
                          onChange={(evt) =>
                            setDetails({
                              ...details,
                              eyeColor: evt.target.value,
                            })
                          }
                          type="text"
                          className="bg-paszamine-700 focus:border-pink-300 border-2 rounded-lg border-soorati-300 mb-4 w-32 md:w-48 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <label className="text-white mt-2 mr-8">
                        Fingerprint:
                      </label>
                      <div>
                        <input
                          onChange={(evt) =>
                            setDetails({
                              ...details,
                              fingerprint: +evt.target.value,
                            })
                          }
                          type="number"
                          className="bg-paszamine-700 focus:border-soorati-300 border-2 rounded-lg border-soorati-300 mb-4 w-32 md:w-48 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-around items-end">
                      <div className="flex mr-4">
                        <label className="text-white mt-2 mr-8">
                          New Metadata URL:
                        </label>
                        <div>
                          <input
                            onChange={(e) => {
                              e.preventDefault();
                              setUrlInput(e.target.value);
                            }}
                            type="text"
                            className="bg-paszamine-700 focus:border-pink-300 border-2 rounded-lg border-soorati-300 mb-4 w-32 md:w-48 text-white"
                          />
                        </div>
                      </div>

                      <button
                        className="bg-pink-800 hover:bg-pink-800 text-white py-4 px-8 rounded mt-8 shadow-xl"
                        onClick={changeTokenUri}
                      >
                        Change Token URI
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-pink-700 hover:bg-pink-800 text-white py-4 px-8 rounded my-8 shadow-xl"
                    onClick={mintNFTs}
                  >
                    {mintLoading ? "Loading..." : "Mint"}
                  </button>
                  <div className="flex justify-between items-center mb-32 w-2/3">
                    <button
                      className="bg-pink-800 hover:bg-pink-800 text-white py-4 px-8 rounded shadow-xl"
                      onClick={getTokenURI}
                    >
                      Get Current metadata URL
                    </button>
                    <div className="text-white">{tokenURI && tokenURI}</div>
                  </div>
                </div>
              </div>
              {mintMessage && (
                <span
                  className={
                    mintError
                      ? "text-red-600 text-xs mt-2 block"
                      : "text-green-600 text-xs mt-2 block"
                  }
                >
                  {mintMessage}
                </span>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
