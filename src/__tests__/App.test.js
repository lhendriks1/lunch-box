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
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(screen.getByText("Welcome to Lunch Box")).toBeVisible();
    const nav = screen.getByRole("navigation");
    expect(within(nav).getByText("Select Box")).toHaveAttribute(
      "aria-current",
      "true"
    );
    expect(screen.getByRole("heading", {name: /select box/i})).toBeVisible();
    const mealOptions = screen.getByLabelText('Select Box');
    expect(within(mealOptions).getAllByRole("option").length).toBe(2)

    userEvent.click(screen.getByRole('option', {name: /pizza box/i}))

    //expect(screen.getByRole('heading', { name: 'Add-Ons'})).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Add-Ons'})).toBeVisible();
    const orderDetails = screen.getByRole('complementary', { name: 'order details'})
    expect(orderDetails).toHaveTextContent('Total: $8.00')
    const cauliflowerOption = screen.getByRole('checkbox', {name: /cauliflower crust/i});
    userEvent.click(cauliflowerOption);

    await waitFor(() => expect(orderDetails).toHaveTextContent('Total: $10.00'));
    userEvent.click(cauliflowerOption);
    await waitFor(() => expect(orderDetails).toHaveTextContent('Total: $8.00'));

    //screen.debug();
  });
});
