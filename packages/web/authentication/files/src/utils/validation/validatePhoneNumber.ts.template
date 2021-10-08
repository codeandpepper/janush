import { PhoneNumberUtil } from "google-libphonenumber";

const util = PhoneNumberUtil.getInstance();

const validatePhoneNumber =
  (optional = false) =>
  (input?: string): boolean => {
    if (!input) {
      return optional;
    }

    try {
      const phone = util.parseAndKeepRawInput(input);
      return util.isValidNumber(phone);
    } catch (e) {
      return false;
    }
  };

export default validatePhoneNumber;
