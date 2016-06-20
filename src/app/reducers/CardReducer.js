import {
   CardActions
} from '../actions/CardActions';

const initialState = {
   	cardNumber: [],
   	expiry: [],
   	birth: [],
   	passwordPre2Digit: '',
   	isAgreed: false,
}

const cardReducer = function(state = initialState, action) {
  switch (action.type) {
  	case CardActions.SET_CARD_NUMBER: {
  		console.log("SET_CARD_NUMBER:", action.cardNumber);
  		const index = action.index;
  		const cardNumber = action.cardNumber;

			return Object.assign({}, state, {
	  		cardNumber: [
		      ...state.cardNumber.slice(0, index),
			    cardNumber,
			    ...state.cardNumber.slice(index + 1)
			  ]
			});
  	}

  	case CardActions.SET_PASSWORD_PRE_TWO_DIGIT: {
  		console.log("SET_PASSWORD_PRE_TWO_DIGIT:", action.passwordPre2Digit);
  		const passwordPre2Digit = action.passwordPre2Digit;

  		return Object.assign({}, state, {
        passwordPre2Digit
			});
  	}

  	case CardActions.SET_EXPIRY: {
  		console.log("SET_EXPIRY:", action.expiry);
  		const index = action.index;
  		const expiry = action.expiry;
  		
  		return Object.assign({}, state, {
        expiry: [
		      ...state.expiry.slice(0, index),
			    expiry,
			    ...state.expiry.slice(index + 1)
			  ]
			});
  	}

  	case CardActions.SET_BIRTH: {
  		console.log("SET_BIRTH:", action.birth);
  		const index = action.index;
  		const birth = action.birth;
  		
  		return Object.assign({}, state, {
        birth: [
		      ...state.birth.slice(0, index),
			    birth,
			    ...state.birth.slice(index + 1)
			  ]
			});
  	}

  	case CardActions.INITIAL_BIRTH: {
  		return Object.assign({}, state,  {
  			birth : []
  		});
  	}

  	case CardActions.SET_AGREED: {
  		console.log("SET_AGREED:", action.isAgreed);
  		const index = action.index;
  		const isAgreed = action.isAgreed;
  		
  		return Object.assign({}, state, {
        isAgreed
			});
  	}
  	
  	case CardActions.GET_CARD_INFO: {
  		console.log("GET_CARD_INFO");
  		
  		return Object.assign({}, state, {
        cardInfo
			});
  	}

    default:
    	return state;
   }    
};

export default cardReducer;