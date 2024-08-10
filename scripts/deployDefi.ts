import { toNano } from '@ton/core';
import { Defi } from '../wrappers/Defi';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const randomInt = BigInt(Math.floor(Math.random() * 1000000));
    const defi = provider.open(await Defi.fromInit(randomInt));

    await defi.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(defi.address);
    console.log("Id", await defi.getId());
    // run methods on `defi`
}
