import { describe, expect, it } from "vitest";
import { SelectorImageController } from "../selector-image-controller";
import { DynamicPositionBooleanMap } from "../../../../common/types";

/**
 * @vitest-environment jsdom
 */
describe("SelectorImageController", () => {
  const baseUrl = "http://localhost:3000/";
  const testCases: {
    description: string;
    position: DynamicPositionBooleanMap;
    expectedSrc: string | undefined;
  }[] = [
    {
      description: "Block without neighbors",
      position: {},
      expectedSrc: baseUrl + "img/block.png",
    },
    {
      description: "Pipe corner 1",
      position: { below: true, right: true },
      expectedSrc: baseUrl + "img/pipeCorner1.png",
    },
    {
      description: "Cap right",
      position: { left: true },
      expectedSrc: baseUrl + "img/capRight.png",
    },
    {
      description: "Pipe horizontal",
      position: { left: true, right: true },
      expectedSrc: baseUrl + "img/pipeHorizontal.png",
    },
    {
      description: "Pipe corner 2",
      position: { below: true, left: true },
      expectedSrc: baseUrl + "img/pipeCorner2.png",
    },
    {
      description: "Pipe corner 4",
      position: { above: true, right: true },
      expectedSrc: baseUrl + "img/pipeCorner4.png",
    },
    {
      description: "Cap bottom",
      position: { above: true },
      expectedSrc: baseUrl + "img/capBottom.png",
    },
    {
      description: "Cap top",
      position: { below: true },
      expectedSrc: baseUrl + "img/capTop.png",
    },
    {
      description: "Cap left",
      position: { right: true },
      expectedSrc: baseUrl + "img/capLeft.png",
    },
    {
      description: "Pipe vertical",
      position: { above: true, below: true },
      expectedSrc: baseUrl + "img/pipeVertical.png",
    },
    {
      description: "Pipe connector right",
      position: { above: true, below: true, right: true },
      expectedSrc: baseUrl + "img/pipeConnectorRight.png",
    },
    {
      description: "Pipe corner 3",
      position: { above: true, left: true },
      expectedSrc: baseUrl + "img/pipeCorner3.png",
    },
    {
      description: "Pipe connector bottom",
      position: { below: true, left: true, right: true },
      expectedSrc: baseUrl + "img/pipeConnectorBottom.png",
    },
    {
      description: "Pipe connector left",
      position: { above: true, below: true, left: true },
      expectedSrc: baseUrl + "img/pipeConnectorLeft.png",
    },
    {
      description: "Pipe connector top",
      position: { above: true, left: true, right: true },
      expectedSrc: baseUrl + "img/pipeConnectorTop.png",
    },
  ];

  testCases.forEach(({ description, position, expectedSrc }) => {
    it(`should return correct image for ${description}`, () => {
      const result =
        SelectorImageController.createImageByWallPosition(position);
      expect(result?.src).toBe(expectedSrc);
    });
  });

  it("should return undefined for an unrecognized position", () => {
    const position: DynamicPositionBooleanMap = {
      above: true,
      below: true,
      left: true,
      right: true,
      topLeft: true,
    };
    const result = SelectorImageController.createImageByWallPosition(position);
    expect(result).toBeUndefined();
  });
});
