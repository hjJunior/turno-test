import getGiven from "givens";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import api from "@/services/api";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import expenseFixture from "../../../fixtures/expenseFixture.json";
import Transactions from "@transactions/pages/Transactions.vue";
import { Model } from "vue-api-query";

vi.mock("@/services/api");

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
  given("render", () => {
    Model.$http = api;
    vi.mocked(api.request).mockResolvedValue({ data: given.apiResponse });

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
  });
});
