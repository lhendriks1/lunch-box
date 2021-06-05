import {
  within,
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("Lunch Box app", () => {
  it("renders lunch box options", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), {
      timeout: 2000,
    });

    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(within(nav).getByText("Select Box")).toHaveAttribute(
      "aria-current",
      "true"
    );

    expect(
      screen.getByRole("heading", { name: /select box/i })
    ).toBeInTheDocument();
    const mealOptions = screen.getByRole("listbox", { name: "meal options" });
    expect(within(mealOptions).getAllByRole("option")).toHaveLength(2);

    userEvent.click(screen.getByText(/Pizza Box/));
    expect(
      await screen.findByRole("heading", { name: "Add-Ons" })
    ).toBeVisible();

    const extraSliceOption = screen.getByRole("checkbox", {
      name: /extra slice \(\$4\)/i,
    });
    const cauliflowerOption = screen.getByRole("checkbox", {
      name: /cauliflower crust \(\$2\)/i,
    });
    const extraCheeseOption = screen.getByRole("checkbox", {
      name: /extra cheese \(\$0\.75\)/i,
    });

    expect(cauliflowerOption).not.toBeChecked();
    expect(extraSliceOption).not.toBeChecked();
    expect(extraCheeseOption).not.toBeChecked();

    const orderDetailsSection = screen.getByRole("complementary", {
      name: "order details",
    });

    expect(orderDetailsSection).toHaveTextContent(
      "Order Details: Pizza BoxTotal: $8.00"
    );

    userEvent.click(extraSliceOption);
    await waitFor(() =>
      expect(orderDetailsSection).toHaveTextContent(
        "Order Details: Pizza Box, extra sliceTotal: $12.00"
      )
    );

    userEvent.click(extraSliceOption);
    await waitFor(() =>
        expect(orderDetailsSection).toHaveTextContent(
            "Order Details: Pizza Box, extra sliceTotal: $8.00"
        )
    );
  });
});
