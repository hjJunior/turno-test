import getGiven from "givens";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import AuthLogin from "@/modules/auth/pages/AuthLogin.vue";
import useAuth from "@/modules/auth/hooks/useAuth";
import { waitFor } from "@testing-library/dom";
import { useRouter } from "vue-router";

vi.mock("@/modules/auth/hooks/useAuth");
vi.mock("vue-router");

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("AuthLogin", () => {
  given("render", () => render(AuthLogin));
  given("submitBtn", () => screen.getByRole("button", { name: "Login" }));
  given("emailInput", () => screen.getByRole("textbox", { name: "E-mail" }));
  given("passwordInput", () =>
    given.render.container.querySelector("input[name='password']")
  );

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      login: vi.fn().mockResolvedValue({}),
    });
    (useRouter as Mock).mockReturnValue({ push: vi.fn() });
  });

  it("can login in", async () => {
    given.render;
    const user = userEvent.setup();

    await user.type(given.emailInput, "my@mail.com");
    await user.type(given.passwordInput, "password");

    await user.click(given.submitBtn);

    await waitFor(() => expect(useAuth().login).toHaveBeenCalled());
    await waitFor(() =>
      expect(useRouter().push).toHaveBeenCalledWith({
        name: "transactions.index",
      })
    );
  });

  it("has validations", async function () {
    given.render;
    const user = userEvent.setup();

    await user.click(given.submitBtn);
    await waitFor(() =>
      expect(screen.getAllByText("Required")).toHaveLength(2)
    );

    await user.type(given.emailInput, "my");
    await waitFor(() => expect(screen.getByText("Must be a valid email")));

    await user.type(given.emailInput, "my@mail.com");
    await waitFor(() =>
      expect(screen.queryByText("Must be a valid email")).toBeFalsy()
    );

    await user.type(given.passwordInput, "password");
    await waitFor(() => expect(screen.queryByText("Required")).toBeFalsy());
  });

  describe("when login fails", () => {
    beforeEach(() => {
      (useAuth as Mock).mockReturnValue({
        login: vi.fn().mockRejectedValue({
          name: "AxiosError",
          response: { data: { error: "Unauthorized" } },
        }),
      });
    });

    it("shows server error", async () => {
      given.render;
      const user = userEvent.setup();

      await user.type(given.emailInput, "my@mail.com");
      await user.type(given.passwordInput, "password");

      await user.click(given.submitBtn);

      await waitFor(() => expect(useAuth().login).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByText("Unauthorized")));
    });
  });
});
