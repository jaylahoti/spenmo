
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddEditBox from './addEditBox';

//Well This is my first test case So I tried writting one

describe("<AddEditBox />", () => {

  test('render text input', () => {
    render(<AddEditBox onClick={function (text: string, childIndex: number, parentIndex: number, cardType: string): void {
      throw new Error('Function not implemented.');
    } } parentIndex={0} noEdit={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    const inputEl = screen.getByTestId("text-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test('pass valid text to test name input field', () => {
    render(<AddEditBox onClick={function (text: string, childIndex: number, parentIndex: number, cardType: string): void {
      throw new Error('Function not implemented.');
    } } parentIndex={0} noEdit={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    const inputEl = screen.getByTestId("text-input");
    userEvent.type(inputEl, "testString");

    expect(screen.getByTestId("text-input")).toHaveValue("testString");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

});