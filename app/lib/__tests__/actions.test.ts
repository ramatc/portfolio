import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendQuestion } from "../actions";

const ok = (text: string) =>
  new Response(
    JSON.stringify({ candidates: [{ content: { parts: [{ text }] } }] }),
    { status: 200 },
  );

const fail = (status: number) =>
  new Response(JSON.stringify({ error: { code: status, message: "busy" } }), {
    status,
  });

describe("sendQuestion", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("returns the answer text", async () => {
    fetchMock.mockResolvedValueOnce(ok("Hola"));

    await expect(sendQuestion("hi")).resolves.toBe("Hola");
  });

  it("retries when Gemini is overloaded and then succeeds", async () => {
    fetchMock.mockResolvedValueOnce(fail(503)).mockResolvedValueOnce(ok("Hola"));

    const result = sendQuestion("hi");
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe("Hola");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives up with a clear error after the retries are exhausted", async () => {
    fetchMock.mockImplementation(async () => fail(503));

    const result = sendQuestion("hi");
    const assertion = expect(result).rejects.toThrow(/Gemini request failed: 503/);
    await vi.runAllTimersAsync();

    await assertion;
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("does not retry non-transient errors", async () => {
    fetchMock.mockResolvedValueOnce(fail(400));

    await expect(sendQuestion("hi")).rejects.toThrow(/Gemini request failed: 400/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws a clear error when the response has no answer", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ promptFeedback: {} }), { status: 200 }),
    );

    await expect(sendQuestion("hi")).rejects.toThrow(/no answer/);
  });
});
