export const CardActions = {
    SET_CARD_NUMBER: 'SET_CARD_NUMBER',
    SET_EXPIRY: 'SET_EXPIRY',
  	SET_BIRTH: 'SET_BIRTH',
  	INITIAL_BIRTH: 'INITIAL_BIRTH',
  	SET_PASSWORD_PRE_TWO_DIGIT: 'SET_PASSWORD_PRE_TWO_DIGIT',
  	SET_AGREED: 'SET_AGREED',
  	GET_CARD_INFO: 'GET_CARD_INFO'
};

export const setCardNumber = (cardNumber, index) => ({
 	type: CardActions.SET_CARD_NUMBER,
 	cardNumber,
 	index,
});
	

export const setPasswordPre2Digit = (passwordPre2Digit) => ({
	type: CardActions.SET_PASSWORD_PRE_TWO_DIGIT,
	passwordPre2Digit,
});

export const setExpiry = (expiry, index) => ({
	type: CardActions.SET_EXPIRY,
	expiry,
	index,
});

export const setBirth = (birth, index) => ({
	type: CardActions.SET_BIRTH,
	birth,
	index,
});

export const initialBirth = () => ({
	type: CardActions.INITIAL_BIRTH,
});

export const setAgreed = (isAgreed) => ({
	type: CardActions.SET_AGREED,
	isAgreed,
});

export const getCardInfo = () => ({
	type: CardActions.GET_CARD_INFO,
});