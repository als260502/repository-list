import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { api } from "../services/api";

import Home from "../pages/index";
import { SearchProvider } from "../context/useSearch";

const mockedRouterPush = jest.fn();

jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      push: mockedRouterPush,
    }),
  };
});

const apiMock = new MockAdapter(api);

describe("Homepage", () => {
  it("Should renders without crash", () => {
    render(<Home />);
    const searchField = screen.getByPlaceholderText("user name to search");
    const buttonElement = screen.getByText("Search");

    expect(
      screen.getByRole("heading", { name: "Search github repositories" })
    ).toBeInTheDocument();

    expect(searchField).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("Should search for github user", async () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    );

    const search = "als260602";
    const searchField = screen.getByPlaceholderText("user name to search");
    fireEvent.change(searchField, {
      target: { value: search },
    });

    apiMock.onPost(`/users/${search}`).reply(200, {
      name: "Andre",
      bio: "my bio",
      avatar_url: "https:github.com",
    });
    apiMock.onPost(`/users/${search}/repos`).reply(200, [
      {
        name: "repo1",
        description: "repo description",
        url: "https:github.com",
      },
    ]);

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(mockedRouterPush).toBeCalled();
  });
});
