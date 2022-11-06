import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchProvider, SearchContext } from "../context/useSearch";

import Dashboard from "../pages/dashboard";

describe("DashBoard Page", () => {
  it("Should renders without crash", () => {
    render(
      <SearchProvider>
        <Dashboard />
      </SearchProvider>
    );

    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Total repositories")).toBeInTheDocument();
    expect(screen.getByText("GoBack")).toBeInTheDocument();
  });
});
