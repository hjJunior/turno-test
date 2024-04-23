import RejectButton from "@/modules/admins/components/PendingCheckDepositRow/RejectButton.vue";
import { cleanup, render, screen, waitFor } from "@testing-library/vue";
import getGiven from "givens";
import { beforeEach, describe, expect, it, vi } from "vitest";
import checkDescriptionFixture from "../../../fixtures/checkDescriptionFixture.json";
import userEvent from "@testing-library/user-event";
import api from "@/services/api";
import { VueQueryPlugin } from "@tanstack/vue-query";
import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { Model } from "vue-api-query";

vi.mock("@/services/api");
vi.mock("@auth/hooks/useAuthUser");

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("RejectButton", () => {
  given("didConfirmed", () => true);
  given("button", () => screen.getByRole("button", { name: "Reject" }));
  given("checkDeposit", () => new CheckDeposit(checkDescriptionFixture));
  given("render", () => {
    Model.$http = api;
    globalThis.confirm = () => given.didConfirmed;

    return render(RejectButton, {
      props: { checkDeposit: given.checkDeposit },
      global: { plugins: [VueQueryPlugin] },
    });
  });

  describe("when confirms", () => {
    it("can reject", async () => {
      given.render;

      const user = userEvent.setup();

      await user.click(given.button);

      await waitFor(() => expect(api.post).toHaveBeenCalled());
      expect(api.post).toHaveBeenCalledWith("/api/check-deposits/21/reject");
    });
  });

  describe("when not confirmed", () => {
    given("didConfirmed", () => false);

    it("not reject", async () => {
      given.render;

      const user = userEvent.setup();

      await user.click(given.button);

      await waitFor(() => expect(api.post).not.toHaveBeenCalled());
    });
  });
});
