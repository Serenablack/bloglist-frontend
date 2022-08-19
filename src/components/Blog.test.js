import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
describe("tests related to blog component", () => {
  const blog = {
    title: "great",
    author: "Sandhya",
    likes: 2,
    url: "https://paranoia.com/garimaTimes",
  };

  const mockupdateFunc = jest.fn();
  const mockdeleteFunc = jest.fn();

  test("the blog's title and author", () => {
    render(
      <Blog
        blog={blog}
        mockupdateFunc={mockupdateFunc}
        mockdeleteFunc={mockdeleteFunc}
      />
    );
    const element = screen.getByText("great Sandhya", { exact: false });
    expect(element).toBeDefined();
  });

  test("clicking the button the blog's url and number of likes are shown", async () => {
    const comp = render(
      <Blog
        blog={blog}
        mockupdateFunc={mockupdateFunc}
        mockdeleteFunc={mockdeleteFunc}
      />
    );

    const user = userEvent.setup();
    const button = comp.getByText("view");

    await user.click(button);

    expect(comp.container).toHaveTextContent(
      "{https://paranoia.com/garimaTimes}",
      { exact: false }
    );
    expect(comp.container).toHaveTextContent("2");
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    render(
      <Blog
        blog={blog}
        mockupdateFunc={mockupdateFunc}
        mockdeleteFunc={mockdeleteFunc}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("like");

    await user.click(button);
    await user.click(button);

    expect(mockupdateFunc.mock.calls).toHaveLength(2);
  });
});
