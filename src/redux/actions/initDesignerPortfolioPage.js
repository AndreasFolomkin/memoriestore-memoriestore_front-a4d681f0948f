import {
  INIT_DESIGNERPORTFOLIOPAGE_TRIGGERED,
  INIT_DESIGNERPORTFOLIOPAGE_REQUEST,
  INIT_DESIGNERPORTFOLIOPAGE_SUCCESS,
  INIT_DESIGNERPORTFOLIOPAGE_FAILURE
} from "../types";

export const initDesignerPortfolioPageTriggered = designerID => ({
  type: INIT_DESIGNERPORTFOLIOPAGE_TRIGGERED,
  payload: { designerID }
});

export const initDesignerPortfolioPageRequest = () => ({
  type: INIT_DESIGNERPORTFOLIOPAGE_REQUEST
});

export const initDesignerPortfolioPageSuccess = data => ({
  type: INIT_DESIGNERPORTFOLIOPAGE_SUCCESS,
  payload: { data }
});

export const initDesignerPortfolioPageFailure = error => ({
  type: INIT_DESIGNERPORTFOLIOPAGE_FAILURE,
  payload: { error }
});
