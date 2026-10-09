const typedText = document.querySelector("#typed-text");
const cursor = document.querySelector(".type-cursor");
const phrase = "3° Técnico em Desenvolvimento de Sistemas";

const typingSpeed = 72;
const deletingSpeed = 38;
const pauseAfterTyping = 2200;
const pauseAfterDeleting = 700;

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function keepCursorAtFront() {
  typedText.before(cursor);
}

async function typePhraseBackwards() {
  keepCursorAtFront();
  typedText.textContent = "";

  // Escreve a frase de trás para frente, mantendo o cursor na frente.
  for (let index = phrase.length - 1; index >= 0; index -= 1) {
    typedText.textContent = phrase[index] + typedText.textContent;
    await wait(typingSpeed);
  }
}

async function deletePhraseFromFront() {
  keepCursorAtFront();

  // Apaga os caracteres a partir da frente, junto com o cursor.
  for (let index = 0; index < phrase.length; index += 1) {
    typedText.textContent = typedText.textContent.slice(1);
    await wait(deletingSpeed);
  }
}

async function animationLoop() {
  while (true) {
    await typePhraseBackwards();
    await wait(pauseAfterTyping);
    await deletePhraseFromFront();
    await wait(pauseAfterDeleting);
  }
}

animationLoop();
