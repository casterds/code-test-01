import { Box, Button } from '@mui/material';
import { useCallback } from 'react';
import MetamaskIcon from 'components/MetamaskIcon';
import { useAsync } from 'react-use';
import { getMetamask } from 'utils/metamask';
import RegisterNumberModal from 'pages/social/registerNumber';
import SendToNumberModal from 'pages/social/sendToNumber';
import DeregisterNumberModal from 'pages/social/deregisterNumber';
import registerNumber from 'pages/social/registerNumber';
import deregisterPhoneNumber from 'pages/social/deregisterNumber';
import sendToNumber from 'pages/social/sendToNumber';

export default function ConnectWallet() {
  const { value: metamask } = useAsync(useCallback(() => getMetamask(), []));

  const onRequest = useCallback(async () => {
    await metamask.request({ method: 'eth_requestAccounts' });
  }, [metamask]);

  const [isRegisterNumberModalOpen, setIsRegisterNumberModalOpen] =
  useState(false);
const [isSendToNumberModalOpen, setIsSendToNumberModalOpen] = useState(false);
const [isDeregisterNumberModalOpen, setIsDeregisterNumberModalOpen] =
  useState(false);

  if (!metamask) {
    return (
      <Button
        component="a"
        href="https://metamask.io/"
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
      >
        Install Metamask
      </Button>
    );
  }

  return (
    <div>
    <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsRegisterNumberModalOpen(true)}
                >
                  Verify and register your phone number
                </button>
              </div>
            </div>
          </div>

          <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsSendToNumberModalOpen(true)}
                >
                  Send payment to a phone number
                </button>
              </div>
            </div>
          </div>

          <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-b border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsDeregisterNumberModalOpen(true)}
                >
                  De-register your phone number
                </button>
              </div>
            </div>
          </div>

          <RegisterNumberModal
            isOpen={isRegisterNumberModalOpen}
            onDismiss={() => setIsRegisterNumberModalOpen(false)}
            registerNumber={registerNumber as any}
          />
          <SendToNumberModal
            isOpen={isSendToNumberModalOpen}
            onDismiss={() => setIsSendToNumberModalOpen(false)}
            sendToNumber={sendToNumber as any}
          />
          <DeregisterNumberModal
            isOpen={isDeregisterNumberModalOpen}
            onDismiss={() => setIsDeregisterNumberModalOpen(false)}
            deregisterNumber={deregisterPhoneNumber as any}/>
    <Button
      onClick={onRequest}
      variant="contained"
      size="large"
      sx={{ mt: 2, mb: 12 }}
    >
      <Box sx={{ width: 28, height: 28, mr: 2 }}>
        <MetamaskIcon />
      </Box>
      Connect your Wallet
    </Button>
    </div>
  );
}


function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

