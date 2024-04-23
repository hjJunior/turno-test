import getGiven from "givens";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import api from "@/services/api";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import CheckDeposits from "@admins/pages/CheckDeposits.vue";
import { Model } from "vue-api-query";
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
      user: ref(),
    });

    return render(CheckDeposits, {
      global: { plugins: [router, VueQueryPlugin] },
    });
  });

  it("renders pending check deposits", async () => {
    given.render;

    await waitFor(() => expect(screen.getByText("$110.00")).toBeTruthy());

    expect(screen.getByText("Federico Kessler III")).toBeTruthy();
    expect(api.request).toHaveBeenCalledWith({
      method: "GET",
      url: "/api/check-deposits?filter[state]=App\\States\\CheckDepositStatus\\Pending&page=1",
    });
  });
});
