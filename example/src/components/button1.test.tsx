import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./button1";

describe("Button1 Component", () => {
    test("renders correctly with children", () => {
        render(<Button>Click me</Button>);

        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    test("renders correctly with children (incorrect)", () => {
        render(<Button>Click me</Button>);

        expect(screen.getByText("Click me!!!")).toBeInTheDocument();
    });

    test("handles onClick", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        screen.getByText("Click me").click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    describe("Button1 Component - deep", () => {
        it("renders correctly with children deep", () => {
            expect(true).toBe(true);
        })
    })
});
