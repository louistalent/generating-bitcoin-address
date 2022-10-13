
const $ = (selector) => document.querySelector(selector);

const onGenerate = (mnemonic, hardend) => {
    const {bitgo, util} = window;
	const {bip39, bip32} = util;

    const network = bitgo.networks.bitcoin;
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const lastRoot = bip32.fromSeed(seed, network);

    const result = [];
    for (let index = 0; index<30; index++) {
        const child = lastRoot.derivePath([hardend,index].join(''));
        const privkey = child.toWIF();
        const keyPair = bitgo.ECPair.fromWIF(privkey, network);
        result.push(keyPair.getAddress());
    }
    return result;
}

window.onload = () => {
    
    $("button").onclick = () => {
        const mnemonic = $("#mnemonic").value;
        const hardend = $("#hardend").value;
        const result = onGenerate(mnemonic, hardend);
        $("#root").innerHTML = result.map(i=>`<div><code>${i}</code></div>`).join('');
    }
}