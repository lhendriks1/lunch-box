import {
  render,
  within,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Lunch Box app", () => {
  it("records order details", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const mealOptions = screen.getByLabelText(/select box/i);
    expect(within(mealOptions).getAllByRole("option")).toHaveLength(2);
    userEvent.click(
      within(mealOptions).getByRole("option", { name: /pizza/i })
    );
    const orderDetails = screen.getByRole("complementary", {
      name: /order details/i,
    });
    expect(orderDetails).toHaveTextContent(/pizza box/i);
    //screen.debug(orderDetails)
  });
});
