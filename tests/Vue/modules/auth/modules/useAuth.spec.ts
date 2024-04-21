import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import getGiven from "givens";
import useAuth from "@auth/hooks/useAuth";
import useAuthState from "@auth/hooks/useAuthState";
import api from "@/services/api";
import { ref } from "vue";

vi.mock("@/services/api");
vi.mock("@auth/hooks/useAuthState");

const given = getGiven();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useAuth", () => {
  describe(".login", () => {
    given("form", () => ({ email: "email@mail.com", password: "pass123" }));
    given("subject", async () => {
      const auth = useAuth();
      await auth.login(given.form);

      return auth;
    });

    beforeEach(() => {
      vi.mocked(api.post).mockResolvedValue({
        data: { access_token: "fake-token" },
      });

      vi.mocked(api.get).mockResolvedValue({
        data: { id: 1, name: "user name" },
      });

      (useAuthState as Mock).mockReturnValue({
        token: ref(),
        onLogged: vi.fn(),
      });
    });

    it("updates token", async () => {
      await given.subject;

      const authState = useAuthState();
      expect(authState.token.value).toEqual("fake-token");

      expect(api.post).toHaveBeenCalledWith("/api/auth/login", given.form);
      expect(api.post).toHaveBeenCalledOnce();
      expect(authState.onLogged).toHaveBeenCalledWith("fake-token");
    });
  });

  describe(".logout", () => {
    given("subject", async () => {
      const auth = useAuth();
      await auth.logout();

      return auth;
    });

    beforeEach(() => {
      (useAuthState as Mock).mockReturnValue({
        resetAuthState: vi.fn(),
      });
    });

    it("performs logout", async () => {
      await given.subject;

      const authState = useAuthState();

      expect(api.post).toHaveBeenCalledWith("/api/auth/logout");
      expect(api.post).toHaveBeenCalledOnce();
      expect(authState.resetAuthState).toHaveBeenCalledOnce();
    });
  });
});
