import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const WriteReviewActions = {
  RECEIVE_WRITE_REVIEW_LIST: 'RECEIVE_WRITE_REVIEW_LIST',
  CHANGE_STAR_RATING: 'CHANGE_STAR_RATING',
  CHANGE_TEXT_INPUT_COMMENT: 'CHANGE_TEXT_INPUT_COMMENT',
};

export function receiveWriteReviewList(orderIdx, reviews) {
  return {
    type: WriteReviewActions.RECEIVE_WRITE_REVIEW_LIST,
    reviews,
    orderIdx,
  };
}

export function changeStarRating(orderDIdx, rating) {
  return {
    type: WriteReviewActions.CHANGE_STAR_RATING,
    orderDIdx,
    rating,
  }; 
}
export function changeTextInputComment(orderDIdx, comment) {
  return {
    type: WriteReviewActions.CHANGE_TEXT_INPUT_COMMENT,
    orderDIdx,
    comment,
  }; 
}

export function fetchWriteReviewList(orderIdx) {
  return (dispatch) => {
    return fetch(`${RequestURL.REQUEST_WRITE_REVIEW_LIST}order_idx=${orderIdx}`)
      .then((response) => response.json())
      .then((json) => {
        const orderIdx = json.order_idx;
        const reviews = json.review_list;
        dispatch(receiveWriteReviewList(orderIdx, reviews))
      })
      .catch((error) => console.warn(error));
  };
}

