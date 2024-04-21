import getGiven from "givens";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import useAuth from "@/modules/auth/hooks/useAuth";
import { waitFor } from "@testing-library/dom";
import { useRouter } from "vue-router";
import router from "@/router";
import UserRegistration from "@users/pages/UserRegistration.vue";
import useRegisterUser from "@users/hooks/useRegisterUser";
import useRegisterBankAccount from "@users/hooks/useRegisterBankAccount";

vi.mock("@auth/hooks/useAuth");
vi.mock("@users/hooks/useRegisterUser");
vi.mock("@users/hooks/useRegisterBankAccount");
vi.mock("vue-router", async () => ({
  ...(await vi.importActual("vue-router")),
  useRouter: vi.fn(),
}));

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("UserRegistration", () => {
  given("render", () =>
    render(UserRegistration, { global: { plugins: [router] } })
  );
  given("signInLink", () => screen.getByRole("link", { name: "Sign in" }));
  given("submitBtn", () => screen.getByRole("button", { name: "Sign Up" }));
  given("nameInput", () => screen.getByRole("textbox", { name: "Name" }));
  given("emailInput", () => screen.getByRole("textbox", { name: "E-mail" }));
  given("usernameInput", () =>
    screen.getByRole("textbox", { name: "Username" })
  );
  given("passwordInput", () =>
    given.render.container.querySelector("input[name='password']")
  );
  given("passwordConfirmationInput", () =>
    given.render.container.querySelector("input[name='password_confirmation']")
  );

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      login: vi.fn().mockResolvedValue({}),
    });
    (useRegisterUser as Mock).mockReturnValue(vi.fn().mockResolvedValue({}));
    (useRegisterBankAccount as Mock).mockReturnValue(
      vi.fn().mockResolvedValue({})
    );
    (useRouter as Mock).mockReturnValue({ push: vi.fn() });
  });

  it("has sign in link", () => {
    given.render;

    expect(given.signInLink).toHaveProperty(
      "href",
      "http://localhost:3000/auth/login"
    );
  });

  it("can sign up", async () => {
    given.render;
    const user = userEvent.setup();

    await user.type(given.nameInput, "Jhon Doe");
    await user.type(given.emailInput, "my@mail.com");
    await user.type(given.usernameInput, "jhon_doe");
    await user.type(given.passwordInput, "password");
    await user.type(given.passwordConfirmationInput, "password");

    await user.click(given.submitBtn);

    await waitFor(() => expect(useAuth().login).toHaveBeenCalled());
    await waitFor(() =>
      expect(useRouter().push).toHaveBeenCalledWith({
        name: "transactions.index",
      })
    );

    expect(useRegisterUser()).toHaveBeenCalledWith({
      name: "Jhon Doe",
      email: "my@mail.com",
      username: "jhon_doe",
      password: "password",
      password_confirmation: "password",
    });
    expect(useRegisterBankAccount()).toHaveBeenCalled();
  });

  it("has validations", async function () {
    given.render;
    const user = userEvent.setup();

    await user.click(given.submitBtn);

    await waitFor(() =>
      expect(screen.getAllByText("Required")).toHaveLength(5)
    );
  });
});
