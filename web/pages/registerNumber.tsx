import { useState } from "react";
import {
  sendSmsVerificationToken,
  validatePhoneNumber,
  verifyToken,
} from "../services/twilio";

export default function RegisterNumberModal({
  isOpen,
  onDismiss,
  registerNumber,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  registerNumber: (number: string) => Promise<void>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [number, setNumber] = useState("");
  const [userCode, setUserCode] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  function editNumber(input: string) {
    setInvalidInput(false);
    setNumber(input);
  }

  function editCode(input: string) {
    setInvalidInput(false);
    setUserCode(input);
  }

  async function sendVerificationText() {
    if (!validatePhoneNumber(number)) {
      setInvalidInput(true);
      return;
    }
    await sendSmsVerificationToken(number);
    setInvalidInput(false);
    setActiveIndex(1);
  }

  async function validateCode() {
    const successfulVerification = await verifyToken(number, userCode);
    if (successfulVerification) {
      setActiveIndex(2);
      await registerNumber(number);
      setDoneLoading(true);
    } else {
      setInvalidInput(true);
    }
  }

  function closeModal() {
    setActiveIndex(0);
    setNumber("");
    setUserCode("");
    setDoneLoading(false);
    setInvalidInput(false);
    onDismiss();
  }

  const modalStyle = {
    display: isOpen ? "block" : "none",
    /* Add your custom modal styles here */
  };

  return (
    <div style={modalStyle}>
      {activeIndex === 0 && (
        <div className="">
          <div className="p-20">
            <h2 className="py-5">Verify your phone number</h2>
            <label
              htmlFor="numberToRegister"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="text"
              name="numberToRegister"
              id="numberToRegister"
              value={number}
              onChange={(e) => editNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
            />
            {invalidInput && (
              <small>
                Not a valid phone number! Make sure you include the country code
              </small>
            )}
          </div>
          <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6 ">
            <button
              className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
              onClick={sendVerificationText}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {activeIndex === 1 && (
        <div className="">
          <div className="p-20">
            <h2 className="py-5">Enter the code we sent to your number</h2>
            <label
              htmlFor="userCode"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              type="text"
              name="userCode"
              id="userCode"
              value={userCode}
              onChange={(e) => editCode(e.target.value)}
              className="mt-1 block w-full border-black focus:border-black sm:text-sm"
            />
            {invalidInput && (
              <small>
                Incorrect code! Make sure you&apos;re entering the latest code
                received to your phone
              </small>
            )}
          </div>
          <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6 ">
            <button
              className="mr-3 inline-flex object-bottom justify-center border py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              onClick={validateCode}
            >
              Validate Code
            </button>
          </div>
        </div>
      )}

      {activeIndex === 2 && (
        <div className="flex flex-col items-center">
          <h2 className="py-5">Registering your phone number</h2>
          {!doneLoading ? (
            <svg
              aria-hidden="true"
              className="mr-2 my-10 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 self-center"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path code */}
            </svg>
          ) : (
            <p className="my-10">Done!</p>
          )}
        </div>
      )}

      <button
        className="mt-5 mr-3 absolute top-2 right-3 py-2 px-4 text-md font-medium text-black"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  );
}
