import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Chat from "@/app/components/Chat";
import { sendQuestion } from "@/app/lib/actions";

vi.mock("@/app/lib/actions", () => ({
  sendQuestion: vi.fn(),
}));

const mockedSendQuestion = vi.mocked(sendQuestion);

async function openChat() {
  const user = userEvent.setup();
  render(<Chat />);
  await user.click(
    screen.getByRole("button", { name: "Abrir chat con el asistente" }),
  );
  // AnimatePresence runs in "wait" mode, so the panel mounts only after the
  // trigger's exit animation finishes.
  await screen.findByRole("list", { name: "Preguntas sugeridas" });
  return user;
}

describe("Chat suggested questions", () => {
  beforeEach(() => {
    mockedSendQuestion.mockReset();
  });

  it("renders the suggested questions as buttons before the first question", async () => {
    await openChat();

    const list = screen.getByRole("list", { name: "Preguntas sugeridas" });
    const suggestions = within(list).getAllByRole("button");

    expect(suggestions.map((button) => button.textContent)).toEqual([
      "¿Qué hace Ramiro en el sector bancario?",
      "¿Qué es Coda y cómo está hecho?",
      "¿Está disponible para nuevos proyectos?",
      "¿Con qué stack trabaja?",
    ]);
  });

  it("sends the clicked suggestion, shows it with the answer, and hides the suggestions", async () => {
    mockedSendQuestion.mockResolvedValue("Ramiro trabaja con NestJS y React.");
    const user = await openChat();

    await user.click(
      screen.getByRole("button", { name: "¿Con qué stack trabaja?" }),
    );

    expect(mockedSendQuestion).toHaveBeenCalledTimes(1);
    expect(mockedSendQuestion).toHaveBeenCalledWith("¿Con qué stack trabaja?");
    expect(
      await screen.findByText("Ramiro trabaja con NestJS y React."),
    ).toBeInTheDocument();
    expect(screen.getByText("¿Con qué stack trabaja?")).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: "Preguntas sugeridas" }),
    ).not.toBeInTheDocument();
  });
});
