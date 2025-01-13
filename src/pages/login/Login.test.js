
// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../profile/ProfilePage';

// // Mock the loginUserApi and toast functions
// jest.mock('../../apis/Api');
// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// describe('Login Component Tests', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders the login form with email and password inputs', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     // expect(screen.getByLabelText('Email address')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Password')).toBeInTheDocument();
//     // expect(screen.getByText('Login')).toBeInTheDocument();
//   });


// });

// 22222222222222222222222 running tests

import '@testing-library/jest-dom'; // Make sure to import jest-dom for additional matchers like toBeInTheDocument
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";


// Mock the loginUserApi and toast functions
jest.mock("../../apis/Api");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));


beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() { }
    observe() { }
    unobserve() { }
    disconnect() { }
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Login Component Tests", () => {
  it("Should render the login form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it("Should navigate to registration page on clicking create account", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const createAccountButton = screen.getByText(/register here/i);
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/register');
    });
  });

  it("Should navigate to forgot password page on clicking forgot password", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotPasswordButton = screen.getByText(/forgot password/i);
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/forgot_password');
    });
  });

  it("Should show error messages on invalid inputs", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Email is empty or invalid")).toBeInTheDocument();
      expect(screen.getByText("Password is empty")).toBeInTheDocument();
    });

    // Testing invalid email format
    const email = screen.getByLabelText("Email address");
    fireEvent.change(email, { target: { value: "invalidemail" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Email is empty or invalid")).toBeInTheDocument();
    });
  });
  it("Should toggle password visibility", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByText("Show");

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(passwordInput.type).toBe("text");
    });

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(passwordInput.type).toBe("password");
    });
  });

  // it("Should redirect to home page on successful login", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Login />
  //     </BrowserRouter>
  //   );

  //   const mockResponse = {
  //     data: {
  //       success: true,
  //       message: "Login successful",
  //       token: "fake-token",
  //       userData: { name: "Test User" },
  //     },
  //   };

  //   loginUserApi.mockResolvedValue(mockResponse);

  //   const email = screen.getByLabelText("Email address");
  //   const password = screen.getByLabelText("Password");
  //   const loginButton = screen.getByRole('button', { name: /login/i });

  //   fireEvent.change(email, { target: { value: "test@gmail.com" } });
  //   fireEvent.change(password, { target: { value: "test123" } });
  //   fireEvent.click(loginButton);

  //   await waitFor(() => {
  //     expect(loginUserApi).toHaveBeenCalledWith({
  //       email: "test@gmail.com",
  //       password: "test123",
  //     });
  //     expect(toast.success).toHaveBeenCalledWith("Login successful");
  //     expect(window.location.pathname).toBe('/');
  //   });
  // });



});

