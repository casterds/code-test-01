import { materialRegister } from 'utils/materialForm';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { useFormContext, useWatch } from 'react-hook-form';
import { useCallback } from 'react';
import { useAccount } from 'store/account';
import { Masa } from "@masa-finance/masa-sdk";
import { getSigner } from 'utils/metamask';



/**
 * Text field to get the address of the recipient who is to receive the NFT gift card.
 */
export default function RecipientTextField() {
   const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const recipient = useWatch({ control, name: 'recipient' });

 

  const onUseMyWallet = useCallback(() => {
   
    const accountId = useAccount.getState().accountId!;
    setValue('recipient', accountId);
  }, [setValue]);

  const onClearRecipient = useCallback(() => {
    setValue('recipient', '');
  }, [setValue]);
 
  const resolveName = async () => {
    try {
      const signer = await getSigner();
      if (!signer) {
        // Handle the case where signer is null
        return;
      }
      const masa = new Masa({
        signer,
        apiUrl: "https://middleware.masa.finance",
        environment: "test",
      });

      const [soulNames] = await Promise.all([
        // get all soul names by address
        masa.soulName.loadSoulNames(recipient),
      
        // masa.contracts.instances.SoulNameContract.extension(),
      ]);
      
      if (soulNames.length > 0) {
        console.log("Soul names:", "\n");
        soulNames.forEach((soulName: string) =>
          console.log(`${soulName}`)
        );
      } else {
        console.log(`No soul names for ${recipient}`);
      }
     
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error in resolving name:', error);
    }
  };
 

  return (
    
    <TextField
      {...materialRegister(register, 'recipient')}
      label="Recipient Wallet"
      fullWidth
      helperText={
        errors.recipient?.message ??
        'This is the wallet of the person who you want to send this gift card to.'
      }
      error={!!errors.recipient}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {recipient ? (
              <IconButton size="small" onClick={onClearRecipient}>
                <MdClose />
              </IconButton>
            ) : (
              <Button size="small" onClick={onUseMyWallet}>
                Use My Wallet
              </Button>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
