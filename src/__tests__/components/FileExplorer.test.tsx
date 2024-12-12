import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileExplorer from "../../components/FileExplorer";

test("renders file explorer correctly", () => {
  render(<FileExplorer />);

  expect(screen.getByText(/Employee handbook/i)).toBeInTheDocument();
  expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
});

test("toggles folder open and close", () => {
  render(<FileExplorer />);

  const folder = screen.getByText(/Expenses/i);
  expect(folder).toBeInTheDocument();

  // Expand folder
  fireEvent.click(folder);
  expect(screen.getByText(/Expenses claim form/i)).toBeInTheDocument();
  expect(screen.getByText(/claim form/i)).toBeInTheDocument();

  // Collapse folder
  fireEvent.click(folder);
  expect(screen.queryByText(/Expenses claim form/i)).not.toBeInTheDocument();
});
