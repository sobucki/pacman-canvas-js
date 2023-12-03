import { DynamicPositionBooleanMap } from "../../../common/types";

export class SelectorImageController {
  static createImageByWallPosition(
    position: DynamicPositionBooleanMap
  ): HTMLImageElement | undefined {
    const above = position["above"];
    const below = position["below"];
    const left = position["left"];
    const right = position["right"];
    const image = new Image();

    if (!above && !below && !left && !right) {
      image.src = "img/block.png";
      return image;
    }

    if (!above && below && !left && right) {
      image.src = "img/pipeCorner1.png";
      return image;
    }
    if (!above && !below && left && !right) {
      image.src = "img/capRight.png";
      return image;
    }
    if (!above && !below && left && right) {
      image.src = "img/pipeHorizontal.png";
      return image;
    }
    if (!above && below && left && !right) {
      image.src = "img/pipeCorner2.png";
      return image;
    }
    if (above && !below && !left && right) {
      image.src = "img/pipeCorner4.png";
      return image;
    }
    if (above && !below && !left && !right) {
      image.src = "img/capBottom.png";
      return image;
    }
    if (!above && below && !left && !right) {
      image.src = "img/capTop.png";
      return image;
    }
    if (!above && !below && !left && right) {
      image.src = "img/capLeft.png";
      return image;
    }
    if (above && below && !left && !right) {
      image.src = "img/pipeVertical.png";
      return image;
    }
    if (above && below && !left && right) {
      image.src = "img/pipeConnectorRight.png";
      return image;
    }
    if (above && !below && left && !right) {
      image.src = "img/pipeCorner3.png";
      return image;
    }
    if (!above && below && left && right) {
      image.src = "img/pipeConnectorBottom.png";
      return image;
    }
    if (above && below && left && !right) {
      image.src = "img/pipeConnectorLeft.png";
      return image;
    }
    if (above && !below && left && right) {
      image.src = "img/pipeConnectorTop.png";
      return image;
    }
  }
}
