import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import App from "./App";

import mockResponse from "./__mocks__/subreddit-reactjs-respone.json";

fetchMock.enableMocks();

function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe("Header", () => {
  test('"How it works" link points to the correct page', () => {
    setup();
    screen.debug();

    const link = screen.getByRole("link", { name: /how it works/i });
    userEvent.click(link);

    expect(
      screen.getByRole("heading", { name: /how it works/i })
    ).toBeInTheDocument();
  });

  test('"About" link points to the correct page', () => {
    setup();
    screen.debug();

    const link = screen.getByRole("link", { name: /about/i });
    userEvent.click(link);

    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  });

  test('"Logo" link points to the correct page', () => {
    setup();
    screen.debug();

    const link = screen.getByRole("link", { name: /logo/i });
    userEvent.click(link);

    expect(
      screen.getByRole("heading", { name: /Find the top posts on Reddit/i })
    ).toBeInTheDocument();
  });
});

describe("Subreddit form", () => {
  /**
   * 1. The user enters a value in the form's input and submits.
   * 2. The app shows a loading message while it's waiting for the data.
   * 3. When the response arrives the data is rendered.
   */
  test("loads posts that are rendered on page", async () => {
    fetch.once(JSON.stringify(mockResponse));
    setup();
    // screen.debug();

    const subredditInput = screen.getByLabelText("r /");
    userEvent.type(subredditInput, "reactjs");

    const submitBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitBtn);

    // screen.debug();

    const loadingMessage = screen.getByText(/is loading/i);
    expect(loadingMessage).toBeInTheDocument();

    const numberOfTopPosts = await screen.findByText(
      /number of top posts: 25/i
    );
    expect(numberOfTopPosts).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      "https://www.reddit.com/r/reactjs/top.json"
    );
  });
});
