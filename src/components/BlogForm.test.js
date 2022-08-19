import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const addFunc = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addFunc={addFunc} />);

  const input = screen.getAllByRole("textbox");
  const create = screen.getByText("create");

  await user.type(input[0], "typing title");
  await user.type(input[1], "typing url");
  await user.type(input[2], "typing author");

  await user.click(create);

  expect(addFunc.mock.calls).toHaveLength(1);
  expect(addFunc.mock.calls[0][0].content).toBe("typing title");
  expect(addFunc.mock.calls[0][1].content).toBe("typing url");
  expect(addFunc.mock.calls[0][2].content).toBe("typing author");
});
