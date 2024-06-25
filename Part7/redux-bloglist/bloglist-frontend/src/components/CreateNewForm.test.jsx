import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateNewForm from "./CreateNewForm";

test("check the event handler is triggered when new blog is created", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<CreateNewForm addBlog={mockHandler} />);

  const container = render(<CreateNewForm addBlog={mockHandler} />).container;

  const inputTitle = container.querySelector(".title");
  const inputAuthor = container.querySelector(".author");
  const inputUrl = container.querySelector(".url");
  const createButton = container.querySelector("#create");

  await user.type(inputTitle, "Today is a rainny day");
  await user.type(inputAuthor, "Amemiya");
  await user.type(inputUrl, "http://www.rainnyday.com");

  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls);
  expect(mockHandler.mock.calls[0][0].author).toBe("Amemiya");

  await user.type(inputTitle, "Today is a sunny day");
  await user.type(inputAuthor, "Summer");
  await user.type(inputUrl, "http://www.summer.com");
  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
  console.log(mockHandler.mock.calls);
  expect(mockHandler.mock.calls[1][0].author).toBe("Summer");
});
