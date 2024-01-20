import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  activeSlide,
  activeSlides,
  clickNext,
  clickPrevious,
  getActiveButton,
  getActiveSlide,
  getActiveSlidesCount,
  getActiveSlidesText,
  getButtons,
  getButtonsLength,
  getButtonsListItem,
  getClonesCount,
  getCurrentSlide,
  getSlidesCount,
  hasClass
} from "../../test-utils";
import CustomArrows from "../CustomArrows";
describe("CustomArrow example", () => {
  it("should have 8 slides (3(preclone) + 6(actual) + 3(postclone))", function() {
    const { container } = render(<CustomArrows />);
    expect(container.getElementsByClassName("slick-slide").length).toBe(12);
  });
  it("should have 3 clone slides", function() {
    const { container } = render(<CustomArrows />);
    expect(container.getElementsByClassName("slick-cloned").length).toBe(6);
  });
  it("should have 1 current slide", function() {
    const { container } = render(<CustomArrows />);
    expect(
      container.getElementsByClassName("slick-slide slick-current").length
    ).toBe(1);
    expect(parseInt(getCurrentSlide(container).textContent) - 1).toBe(0);
  });
  it("should have 3 active slide", function() {
    const { container } = render(<CustomArrows />);
    expect(
      container.getElementsByClassName("slick-slide slick-active").length
    ).toBe(3);
    expect(
      Array.from(getActiveSlide(container).children).map(
        e => parseInt(e.textContent) - 1
      )[0]
    ).toBe(0);
  });
  it("should have 6 dots", function() {
    const { container } = render(<CustomArrows />);
    expect(
      container.getElementsByClassName("slick-dots")[0].children.length
    ).toBe(6);
  });
  it("should have 1 active dot", function() {
    const { container } = render(<CustomArrows />);

    expect(container.querySelectorAll(".slick-dots .slick-active").length).toBe(
      1
    );
  });
  it("should have a prev arrow", function() {
    const { container } = render(<CustomArrows />);
    expect(container.getElementsByClassName("slick-prev").length).toBe(1);
  });
  it("should have a next arrow", function() {
    const { container } = render(<CustomArrows />);
    expect(container.getElementsByClassName("slick-next").length).toBe(1);
  });
  it("should got to next slide when next button is clicked", function() {
    const { container } = render(<CustomArrows />);
    clickNext(container);
    expect(
      container.getElementsByClassName("slick-slide slick-active")[0]
        .textContent
    ).toBe("2");
    expect(container.querySelectorAll(".slick-dots .slick-active").length).toBe(
      1
    );
    expect(
      container.querySelectorAll(".slick-dots")[0].children[1]
    ).toHaveClass("slick-active");
  });
  it("should goto previous slide when prev button is clicked", function() {
    const { container } = render(<CustomArrows />);
    clickPrevious(container);
    expect(
      container.getElementsByClassName("slick-slide slick-active")[0]
        .textContent
    ).toBe("6");
    expect(container.querySelectorAll(".slick-dots .slick-active").length).toBe(
      1
    );
    expect(
      container.querySelectorAll(".slick-dots")[0].children[5]
    ).toHaveClass("slick-active");
  });
  it("should goto 4th slide when 4th dot is clicked", function() {
    const { container } = render(<CustomArrows />);
    fireEvent(
      container.querySelectorAll(".slick-dots button")[3],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(getActiveSlidesText(container)).toEqual(["4", "5", "6"]);
    expect(getActiveSlidesCount(container)).toEqual(3);
    expect(hasClass(getButtonsListItem(container)[3], "slick-active")).toEqual(
      true
    );
  });
});
