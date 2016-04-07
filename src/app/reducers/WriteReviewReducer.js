import {
  WriteReviewActions,
} from '../actions/WriteReviewActions';

function writeReviewReducer(state = {
  reviews: {},
  orderIdx: 0,
}, action) {
  switch (action.type) {
    case WriteReviewActions.RECEIVE_WRITE_REVIEW_LIST:
      {
        const reviews = action.reviews;
        const orderIdx = action.orderIdx;
        
        return Object.assign({}, state, {
          reviews,
          orderIdx,
        });
      }
    case WriteReviewActions.CHANGE_STAR_RATING:
      {
        const reviews = state.reviews;
        const orderDIdx = action.orderDIdx;
        const rating = action.rating;
        //console.log(orderDIdx, rating);
        reviews.forEach((review) => {
          if(review.idx === orderDIdx) {
            review.rating = rating;
          }
        })
        //console.log(reviews);

        return Object.assign({}, state, {
          reviews,
        });
      }
    case WriteReviewActions.CHANGE_TEXT_INPUT_COMMENT:
      {
        const reviews = state.reviews;
        const orderDIdx = action.orderDIdx;
        const comment = action.comment;
        //console.log(orderDIdx, comment);
        reviews.forEach((review) => {
          if(review.idx === orderDIdx) {
            review.comment = comment;
          }
        })
        //console.log(reviews);

        return Object.assign({}, state, {
          reviews,
        });
      }
    default:
      return state;
  }
}

export default writeReviewReducer;
