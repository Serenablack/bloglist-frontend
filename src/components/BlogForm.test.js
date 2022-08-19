import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> opens the form for blog submission", async () => {
  const addFunc = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addfunc={addFunc} />);

  const input = screen.getAllByRole("textbox");
  const create = screen.getByText("create");

  await user.type(input[0], "typing title");
  await user.type(input[1], "typing url");
  await user.type(input[2], "typing author");

  await user.click(create);

  expect(addFunc.mock.calls).toHaveLength(1);
  expect(addFunc.mock.calls[0][0].title).toBe("typing title");
  expect(addFunc.mock.calls[0][0].url).toBe("typing url");
  expect(addFunc.mock.calls[0][0].author).toBe("typing author");
});
