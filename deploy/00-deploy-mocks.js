const { loadFixture } = require("ethereum-waffle");
const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 is the premium, it costs 0.25 LINK
const GAS_PRICE_LINK = 1e9; //calculateed value base on the gas price of the chain

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    const args = [BASE_FEE, GAS_PRICE_LINK];
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks . . . ");
        //deploy mock VRFCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        });
    }
    log("Mocks deployed")
    log("-------------------------")
};

module.exports.tags = ["all", "mocks"]
