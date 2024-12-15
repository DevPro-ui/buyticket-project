import React from 'react';
import { useLucid } from '../context/LucidProvider';

import { Button } from './ui/Button';
import { TokenTransferButton } from './TokenTransfer/TokenTransferButton';
import { shortenAddress } from '../utils/cardano';

export const WalletConnect: React.FC = () => {
    const { connectWallet, address } = useLucid();

    return (
        <div className="flex items-center space-x-4">
            {address ? (
                <div className="flex items-center">
                    <div className="text-sm text-gray-600">
                        Connected: {shortenAddress(address)}
                    </div>
                    <TokenTransferButton />
                </div>
            ) : (
                <Button
                    onClick={connectWallet}
                    variant="primary"
                >
                    Connect Wallet
                </Button>
            )}
        </div>
    );
};