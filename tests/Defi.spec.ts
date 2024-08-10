import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Defi } from '../wrappers/Defi';
import '@ton/test-utils';

describe('Defi', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let defi: SandboxContract<Defi>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        defi = blockchain.openContract(await Defi.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await defi.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: defi.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and defi are ready to use
    });
});
