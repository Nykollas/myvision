import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers';
import {
  setAddingPolygonPointsState, getAddingPolygonPointsState, setDefaultState,
  getContinuousDrawingState, getLastDrawingModeState, getCancelledReadyToDrawState,
  getRemovingPointsAfterCancelDrawState,
} from '../facadeWorkersUtils/stateManager';
import assignAddPointsOnExistingPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/addPointsEventHandlers';
import setInitialStageOfAddPointsOnExistingPolygonMode from '../../../../canvas/mouseInteractions/cursorModes/initialiseAddPointsOnExistingPolygonMode';
import { setDefaultCursorModeAfterAlteringPolygonPoints } from '../../../../canvas/mouseInteractions/cursorModes/defaultMode';
import { getSelectedPolygonIdForAddPoints } from '../../../../canvas/mouseInteractions/mouseEvents/eventWorkers/addPointsEventsWorker';
import assignDefaultEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/defaultEventHandlers';
import { resetAddPoints, isAddingPointsToPolygon, removePolygonPoints } from '../../../../canvas/objects/polygon/alterPolygon/alterPolygon';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers';
import assignDrawBoundingBoxEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawBndBoxEventHandlers';

// Originally designed to be turned off after the points have been successfully added to a polygon

function discardAddPointsEvents(canvas) {
  if (getContinuousDrawingState()
  && (getCancelledReadyToDrawState() || getRemovingPointsAfterCancelDrawState())) {
    removePolygonPoints();
    if (getLastDrawingModeState() === 'polygon') {
      assignDrawPolygonEvents(canvas);
    } else if (getLastDrawingModeState() === 'boundingBox') {
      assignDrawBoundingBoxEvents(canvas);
    }
  } else {
    setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
    const currentlySelectedPolygonId = getSelectedPolygonIdForAddPoints();
    assignDefaultEvents(canvas, currentlySelectedPolygonId);
    setDefaultState(true);
  }
}

function initiateAddPolygonPointsEvents(canvas) {
  canvas.discardActiveObject();
  if (!getAddingPolygonPointsState()) {
    purgeCanvasMouseEvents(canvas);
    assignAddPointsOnExistingPolygonEvents(canvas);
    setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
    setDefaultState(false);
    setAddingPolygonPointsState(true);
  } else if (isAddingPointsToPolygon()) {
    purgeCanvasMouseEvents(canvas);
    assignAddPointsOnExistingPolygonEvents(canvas);
    resetAddPoints();
    setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
  } else {
    resetAddPoints();
    setAddingPolygonPointsState(false);
    purgeCanvasMouseEvents(canvas);
    discardAddPointsEvents(canvas);
  }
}

export { initiateAddPolygonPointsEvents as default };