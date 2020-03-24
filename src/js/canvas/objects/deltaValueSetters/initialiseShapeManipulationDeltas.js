import { setRightBoundingBoxDrawingDelta } from '../boundingBox/boundingBox';
import { setRightBoundingBoxMovingDelta } from '../sharedUtils/moveBlockers';
import { setRightBoundingBoxNewObjectDelta } from '../sharedUtils/newObjectBlockers';
import { setRightBoundingBoxScalingDelta } from '../boundingBox/scaling';

function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function initialiseShapeManipulationDeltas() {
  if (!isFirefox() && window.screen.width < 1500) {
    setRightBoundingBoxDrawingDelta(2);
    setRightBoundingBoxMovingDelta(2);
    setRightBoundingBoxNewObjectDelta(2);
    setRightBoundingBoxScalingDelta(2);
  } else {
    setRightBoundingBoxDrawingDelta(2.3);
    setRightBoundingBoxMovingDelta(2.3);
    setRightBoundingBoxNewObjectDelta(2.3);
    setRightBoundingBoxScalingDelta(2.4);
  }
}

export { initialiseShapeManipulationDeltas as default };
