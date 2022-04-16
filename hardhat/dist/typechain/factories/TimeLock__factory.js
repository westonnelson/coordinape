"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minDelay",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "CallCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "CallExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "predecessor",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "delay",
                type: "uint256",
            },
        ],
        name: "CallScheduled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_id",
                type: "bytes32",
            },
        ],
        name: "cancel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_min",
                type: "uint256",
            },
        ],
        name: "changeMinDelay",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
            {
                internalType: "bytes32",
                name: "_predecessor",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "_salt",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "_delay",
                type: "uint256",
            },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_id",
                type: "bytes32",
            },
        ],
        name: "isDoneCall",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_id",
                type: "bytes32",
            },
        ],
        name: "isPendingCall",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_id",
                type: "bytes32",
            },
        ],
        name: "isReadyCall",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minDelay",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
            {
                internalType: "bytes32",
                name: "_predecessor",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "_salt",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "_delay",
                type: "uint256",
            },
        ],
        name: "schedule",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "timestamps",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051610b2f380380610b2f83398101604081905261002f91610090565b61003833610040565b6002556100a8565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100a1578081fd5b5051919050565b610a78806100b76000396000f3fe608060405234801561001057600080fd5b50600436106100a45760003560e01c80631333cdda146100a95780632a9eda11146100d15780632c5eaf21146100e45780634c84c5a1146100f9578063715018a61461010c5780638da5cb5b146101145780639749b36814610134578063abeb699714610147578063b58729581461015a578063c4d252f514610188578063c63c4e9b1461019b578063f2fde38b146101a4575b600080fd5b6100bc6100b7366004610930565b6101b7565b60405190151581526020015b60405180910390f35b6100bc6100df366004610930565b6101ec565b6100f76100f236600461089c565b610202565b005b6100bc610107366004610930565b610360565b6100f7610376565b61011c6103b1565b6040516001600160a01b0390911681526020016100c8565b6100f7610142366004610930565b6103c0565b6100f761015536600461089c565b610424565b61017a610168366004610930565b60016020526000908152604090205481565b6040519081526020016100c8565b6100f7610196366004610930565b610562565b61017a60025481565b6100f76101b236600461087b565b610634565b60008181526001602052604081205442108015906101e45750600082815260016020819052604090912054115b90505b919050565b6000908152600160208190526040909120541490565b3361020b6103b1565b6001600160a01b03161461023a5760405162461bcd60e51b8152600401610231906109e9565b60405180910390fd5b600061024987878787876106d4565b600081815260016020526040902054909150156102a85760405162461bcd60e51b815260206004820181905260248201527f54696d654c6f636b3a2043616c6c20616c7265616479207363686564756c65646044820152606401610231565b6002548210156102f95760405162461bcd60e51b815260206004820152601c60248201527b54696d654c6f636b3a20496e73756666696369656e742064656c617960201b6044820152606401610231565b6103038242610a1e565b60008281526001602052604090819020919091555181907f66dcc96f6c92c7919714879a908fc29b273e363ba3d409c0c6db86984ee3c4809061034f908a908a908a908a9089906109b0565b60405180910390a250505050505050565b6000908152600160208190526040909120541190565b3361037f6103b1565b6001600160a01b0316146103a55760405162461bcd60e51b8152600401610231906109e9565b6103af6000610710565b565b6000546001600160a01b031690565b33301461041f5760405162461bcd60e51b815260206004820152602760248201527f54696d654c6f636b3a2043616c6c6572206973206e6f7420636f6e74726163746044820152661034ba39b2b63360c91b6064820152608401610231565b600255565b3361042d6103b1565b6001600160a01b0316146104535760405162461bcd60e51b8152600401610231906109e9565b600061046287878787876106d4565b905061046d816101b7565b6104cf5760405162461bcd60e51b815260206004820152602d60248201527f54696d654c6f636b3a204e6f7420726561647920666f7220657865637574696f60448201526c1b881bdc88195e1958dd5d1959609a1b6064820152608401610231565b8315806104e057506104e0846101ec565b61053c5760405162461bcd60e51b815260206004820152602760248201527f54696d654c6f636b3a205072656465636573736f722063616c6c206e6f7420656044820152661e1958dd5d195960ca1b6064820152608401610231565b61054881888888610760565b600090815260016020819052604090912055505050505050565b3361056b6103b1565b6001600160a01b0316146105915760405162461bcd60e51b8152600401610231906109e9565b61059a81610360565b6105e65760405162461bcd60e51b815260206004820152601d60248201527f54696d654c6f636b3a2043616c6c206973206e6f742070656e64696e670000006044820152606401610231565b60008181526001602052604080822091909155517fab2af3494bc00bd4aa34e08bd246e5c402d3ee4856c19f5461ce47a6d57423e1906106299083815260200190565b60405180910390a150565b3361063d6103b1565b6001600160a01b0316146106635760405162461bcd60e51b8152600401610231906109e9565b6001600160a01b0381166106c85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610231565b6106d181610710565b50565b600085858585856040516020016106ef9594939291906109b0565b60405160208183030381529060405280519060200120905095945050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000836001600160a01b0316838360405161077c929190610972565b6000604051808303816000865af19150503d80600081146107b9576040519150601f19603f3d011682016040523d82523d6000602084013e6107be565b606091505b50509050806108215760405162461bcd60e51b815260206004820152602960248201527f54696d656c6f636b3a20756e6465726c79696e67207472616e73616374696f6e604482015268081c995d995c9d195960ba1b6064820152608401610231565b847fc08872e260006100fd2e00a3ba4c617fdb250f802f99384d55c10097dc1d048785858560405161085593929190610982565b60405180910390a25050505050565b80356001600160a01b03811681146101e757600080fd5b60006020828403121561088c578081fd5b61089582610864565b9392505050565b60008060008060008060a087890312156108b4578182fd5b6108bd87610864565b955060208701356001600160401b03808211156108d8578384fd5b818901915089601f8301126108eb578384fd5b8135818111156108f9578485fd5b8a602082850101111561090a578485fd5b979a60209290920199509697604081013597506060810135965060800135945092505050565b600060208284031215610941578081fd5b5035919050565b60008284528282602086013780602084860101526020601f19601f85011685010190509392505050565b6000828483379101908152919050565b6001600160a01b03841681526040602082018190526000906109a79083018486610948565b95945050505050565b6001600160a01b03861681526080602082018190526000906109d59083018688610948565b604083019490945250606001529392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610a3d57634e487b7160e01b81526011600452602481fd5b50019056fea2646970667358221220bae8ad4262dd371d7ed2dcd3c4e59be79dcbd2447ddeeb27aa14c52c170429e064736f6c63430008020033";
class TimeLock__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_minDelay, overrides) {
        return super.deploy(_minDelay, overrides || {});
    }
    getDeployTransaction(_minDelay, overrides) {
        return super.getDeployTransaction(_minDelay, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TimeLock__factory = TimeLock__factory;
TimeLock__factory.bytecode = _bytecode;
TimeLock__factory.abi = _abi;
