import React from "react";
import Header from "components/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  test("render Header", async () => {
    render(<Header />);
    const header = screen.getByText("Spacestagram");
    expect(header).toBeInTheDocument();
  });
});
