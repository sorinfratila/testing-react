import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    );
    screen.debug();
  });
});
