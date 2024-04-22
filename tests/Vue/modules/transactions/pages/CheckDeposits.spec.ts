import getGiven from "givens";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import api from "@/services/api";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import CheckDeposits from "@transactions/pages/CheckDeposits.vue";
import { Model } from "vue-api-query";
import userEvent from "@testing-library/user-event";

vi.mock("@/services/api");

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

    render(CheckDeposits, {
      global: { plugins: [router, VueQueryPlugin] },
      props: {
        filter: given.filter,
        title: given.pageTitle,
      },
    });
  });

  it("renders pending check deposits", async () => {
    given.render;

    await waitFor(() =>
      expect(screen.getByText(given.checkDeposit.description)).toBeTruthy()
    );

    expect(screen.getByText("$110.00")).toBeTruthy();
    expect(screen.getByText("04/22/2024 13:40")).toBeTruthy();
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
});
