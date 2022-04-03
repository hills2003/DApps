var todoContract = artifacts.require("./TodoContract.sol");

module.exports = function(deployer) {
  deployer.deploy(todoContract);
};
