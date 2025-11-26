export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(\+?25)?0?7[2-8][0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateVerificationCode = (code) => {
  return code.length === 6 && /^\d+$/.test(code);
};

export const validatePaymentAmount = (amount) => {
  return !isNaN(amount) && amount > 0;
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('250')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+25${cleaned}`;
  }
  return `+${cleaned}`;
};