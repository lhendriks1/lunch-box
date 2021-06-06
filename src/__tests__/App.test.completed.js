import {
    waitFor,
    within,
    screen,
    render,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
// TODO Start by looking a package.json

describe("Lunch Box app", () => {
    it("renders lunch box options", async () => {
        render(<App />);

        // wait for the removal of element(s) from the DOM -  query for the element on each DOM mutation
        await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

        // Screen: Because querying the entire document.body is very common,
        // DOM Testing Library also exports a screen object which has every query that is pre-bound to document.body

        expect(screen.getByText('Welcome to Lunch Box')).toBeVisible();
       // jest-dom matchers:  https://github.com/testing-library/jest-dom

        const nav = screen.getByRole("navigation", { name: "breadcrumb" });
        expect(within(nav).getByText("Select Box")).toHaveAttribute(
            "aria-current",
            "true"
        );

        // Which query should you use?
        https://testing-library.com/docs/react-testing-library/cheatsheet
        expect(
            screen.getByRole("heading", { name: /select box/i })
        ).toBeInTheDocument();

        // Assert box options (pizza & pasta)..but look at plugin and see they are just divs
        // TODO: LunchForm.jsx, ln 66 add role='listbox' aria-labelledby='selectBox', and id='selectBox' to h3;
        //  then, ln 23 in boxOptions add role='option'
        const mealOptions = screen.getByLabelText('Select Box');
        expect(within(mealOptions).getAllByRole("option")).toHaveLength(2);

        userEvent.click(screen.getByText(/Pizza Box/));

        // use findBy when the element might not be there right away, findBy is a wrapper around waitFor and getBy
        // instead of expect(await waitFor(() => screen.getByRole("heading", { name: "Adds-Ons"})).toBeVisible();
        expect(
            await screen.findByRole("heading", { name: "Add-Ons" })
        ).toBeVisible();

        // Now that we know the screen has settled, we can start making other assertions

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

        // TODO check the content in the order details summary, but it's just a div..
        //  In App.js, ln 46 add role='complementary' aria-label='order details'
        const orderDetailsSection = screen.getByRole("complementary", {
            name: "order details",
        });

        expect(orderDetailsSection).toHaveTextContent(
            "Order Details: Pizza BoxTotal: $8.00"
        );

        userEvent.click(extraSliceOption);
        // setState is asynchronous, so it might pass, but also it might be flaky
       // waitFor may run the callback a variable number of times.
        // polling the DOM at regular intervals until the query passes, or timeout error
        await waitFor(() =>
            expect(orderDetailsSection).toHaveTextContent("Total: $12.00")
        );
        expect(orderDetailsSection).toHaveTextContent("extra slice")

        // userEvent is a companion library that simulates user interactions, eg.: click: hover, mouse down, mouse up
        userEvent.click(extraSliceOption);
        await waitFor(() =>
            expect(orderDetailsSection).toHaveTextContent("Total: $8.00")
        );
        expect(orderDetailsSection).not.toHaveTextContent("extra slice")

        // use regex for buttons
        userEvent.click(screen.getByText(/next/i))

        // findBy methods are a combination of getBy queries and waitFor.
        // findBy queries work when you expect an element to appear
        // but the change to the DOM might not happen immediately.
        expect(await screen.findByText('Delivery Options')).toBeVisible();
    });
});