import getGiven from "givens";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import api from "@/services/api";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import CheckDeposits from "@transactions/pages/CheckDeposits.vue";
import { Model } from "vue-api-query";
import userEvent from "@testing-library/user-event";
import useAuthUser from "@auth/hooks/useAuthUser";
import { ref } from "vue";

vi.mock("@/services/api");
vi.mock("@auth/hooks/useAuthUser");

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("CheckDeposits", () => {
  given("checkDeposit", () => checkDescriptionFixture);
  given("apiResponse", () => ({ data: given.checkDeposit }));
  given("render", () => {
    Model.$http = api;
    vi.mocked(api.request).mockResolvedValue({ data: given.apiResponse });

    (useAuthUser as Mock).mockReturnValue({
      user: ref({
        bank_account: {
          id: 1,
        },
      }),
    });

    return render(CheckDeposits, {
      global: { plugins: [router, VueQueryPlugin] },
    });
  });

  it("renders pending check deposits", async () => {
    given.render;

    await waitFor(() =>
      expect(screen.getByText(given.checkDeposit.description)).toBeTruthy()
    );

    expect(screen.getByText("$110.00")).toBeTruthy();
    expect(screen.getByText("04/22/2024 16:40")).toBeTruthy();
    expect(api.request).toHaveBeenCalledWith({
      method: "GET",
      url: "/api/check-deposits?filter[state]=App\\States\\CheckDepositStatus\\Pending&page=1",
    });
  });

  it("can filter accepted checks", async () => {
    given.render;

    const user = userEvent.setup();
    await user.click(screen.getByText("Accepted"));

    expect(api.request).toHaveBeenCalledWith({
      method: "GET",
      url: "/api/check-deposits?filter[state]=App\\States\\CheckDepositStatus\\Accepted&page=1",
    });
  });

  it("can filter rejected checks", async () => {
    given.render;

    const user = userEvent.setup();
    await user.click(screen.getByText("Rejected"));

    expect(api.request).toHaveBeenCalledWith({
      method: "GET",
      url: "/api/check-deposits?filter[state]=App\\States\\CheckDepositStatus\\Rejected&page=1",
    });
  });

  describe("new check deposit", () => {
    given("modal", () => given.render.getByTestId("new-check-deposit-modal"));
    given("amountInput", () =>
      within(given.modal).getByRole("textbox", { name: "Amount" })
    );
    given("pictureFile", () =>
      given.render.container.querySelector("input[type=file]")
    );
    given("descriptionInput", () =>
      within(given.modal).getByRole("textbox", { name: "Description" })
    );
    given("submitBtn", () =>
      within(given.modal).getByRole("button", {
        name: "Submit Check Deposit to review",
      })
    );
    given(
      "testFile",
      () => new File(["fake-content"], "deposit.png", { type: "image/png" })
    );

    beforeEach(() => {
      vi.mocked(api.post).mockResolvedValue({});
    });

    it("can create new check deposit", async () => {
      given.render;

      const user = userEvent.setup();

      await user.click(
        screen.getByRole("button", { name: "Add new check deposit" })
      );

      await waitFor(() =>
        expect(screen.getByText("New Check Deposit")).toBeTruthy()
      );

      expect(given.modal).toBeTruthy();

      await user.type(given.amountInput, "10");
      await user.type(given.descriptionInput, "Grandma's gift");
      await user.upload(given.pictureFile, given.testFile);

      await user.click(given.submitBtn);

      await waitFor(() => expect(api.post).toHaveBeenCalled());

      expect(api.post).toHaveBeenCalledWith(
        "/api/check-deposits",
        {
          amount: "10",
          bank_account_id: 1,
          description: "Grandma's gift",
          picture: given.testFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });
  });
});
