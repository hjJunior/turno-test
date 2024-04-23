import getGiven from "givens";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/vue";
import router from "@/router";
import { VueQueryPlugin, useQueryClient } from "@tanstack/vue-query";
import api from "@/services/api";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import expenseFixture from "../../../fixtures/expenseFixture.json";
import Transactions from "@transactions/pages/Transactions.vue";
import { Model } from "vue-api-query";
import userEvent from "@testing-library/user-event";
import useAuth from "@auth/hooks/useAuth";
import { ref } from "vue";
import { useTransactionsCacheKey } from "@/modules/transactions/hooks/useTransactions";

vi.mock("@/services/api");
vi.mock("@auth/hooks/useAuth");
vi.mock("@tanstack/vue-query", async () => ({
  ...(await vi.importActual("@tanstack/vue-query")),
  useQueryClient: vi.fn(),
}));

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("Transactions", () => {
  given("expense", () => expenseFixture);
  given("checkDeposit", () => checkDescriptionFixture);
  given("apiResponse", () => ({ data: given.checkDeposit }));
  given("filterType", () => "App\\Models\\CheckDeposit");
  given("filter", () => ({ type: given.filterType }));
  given("pageTitle", () => "Incomes");
  given("currentUser", () => ({ bank_account: { id: 1 } }));
  given("render", () => {
    Model.$http = api;

    vi.mocked(api.request).mockResolvedValue({ data: given.apiResponse });
    (useAuth as Mock).mockReturnValue({ user: ref(given.currentUser) });
    (useQueryClient as Mock).mockReturnValue({ invalidateQueries: vi.fn() });

    render(Transactions, {
      global: { plugins: [router, VueQueryPlugin] },
      props: {
        filter: given.filter,
        title: given.pageTitle,
      },
    });
  });

  describe("when check deposit", function () {
    given("apiResponse", () => ({ data: given.checkDeposit }));
    given("filterType", () => "App\\Models\\CheckDeposit");

    it("renders check deposit", async () => {
      given.render;

      await waitFor(() =>
        expect(screen.getByText(given.checkDeposit.description)).toBeTruthy()
      );

      expect(screen.getByText("$110.00")).toBeTruthy();
      expect(screen.getByText("04/22/2024 16:40")).toBeTruthy();
    });
  });

  describe("when expense", function () {
    given("pageTitle", () => "Expenses");
    given("apiResponse", () => ({ data: given.expense }));
    given("filterType", () => "App\\Models\\Expense");

    it("renders expense", async () => {
      given.render;

      await waitFor(() =>
        expect(screen.getByText(given.expense.description)).toBeTruthy()
      );

      expect(screen.getByText("$137.00")).toBeTruthy();
      expect(screen.getByText("04/22/2024 16:37")).toBeTruthy();
    });

    describe("new expense", () => {
      given("newExpenseBtn", () =>
        screen.getByRole("button", { name: "New expense" })
      );
      given("modal", () => screen.getByTestId("new-expense-modal"));
      given("amountInput", () =>
        within(given.modal).getByRole("textbox", { name: "Amount" })
      );
      given("descriptionInput", () =>
        within(given.modal).getByRole("textbox", { name: "Description" })
      );
      given("submitBtn", () =>
        within(given.modal).getByRole("button", { name: "Create" })
      );

      it("can create new expense", async () => {
        given.render;

        const user = userEvent.setup();

        user.click(given.newExpenseBtn);

        await waitFor(() => expect(given.modal).toBeTruthy());

        await user.type(given.amountInput, "10.20");
        await user.type(given.descriptionInput, "T-shirt");
        await user.click(given.submitBtn);

        await waitFor(() => expect(api.post).toHaveBeenCalled());
        expect(api.post).toHaveBeenCalledWith("/api/expenses", {
          amount: "10.20",
          description: "T-shirt",
          bank_account_id: 1,
        });
        expect(useQueryClient().invalidateQueries).toHaveBeenCalledWith({
          queryKey: useTransactionsCacheKey({
            type: "App\\Models\\Expense",
          }),
        });
      });
    });
  });
});
