
import { CreateWebWorkerMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const $ = el => document.querySelector(el)

const $form = $('form')
const $input = $('input')
const $template = $('#message-template')
const $messages = $('ul')
const $container = $('main')
const $button = $('button')
const $info = $('small')

let messages = [];

const SELECTED_MODEL = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

const engine = await CreateWebWorkerMLCEngine(
    new Worker('./assets/js/worker.js', { type: 'module' }),
    SELECTED_MODEL,
    {
        initProgressCallback: (info) => {
            $info.textContent = `${info.text}%`;
            if (info.progress === 1) {
                $button.removeAttribute('disabled')
            }
        }
    }
)

$form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const messageText = $input.value.trim()

    if (messageText != '') {
        $input.value = ''
    }

    addMessage(messageText, 'user')
    $button.setAttribute('disabled', true)

    const userMessage = {
        role: 'user',
        content: messageText
    }

    messages.push(userMessage)


    const chunks = await engine.chat.completions.create({
        messages,
        stream: true
    })

    let replay = ""

    const $botMessage = addMessage("", 'bot')

    for await (const chunk of chunks) {
        const choice = chunk.choices[0]
        const content = choice?.delta?.content ?? ""
        replay += content
        $botMessage.textContent = replay
    }

    messages.push({
        role: 'assistant',
        content: replay
    })
    $container.scrollTop = $container.scrollHeight
    $button.removeAttribute('disabled')
})

function addMessage(text, sender) {
    const cloneTemplate = $template.content.cloneNode(true)
    const $newMessage = cloneTemplate.querySelector('.message')

    const $who = $newMessage.querySelector('span')
    const $text = $newMessage.querySelector('p')

    $text.textContent = text;
    $who.textContent = sender === 'bot' ? 'IA' : 'Tú';
    $newMessage.classList.add(sender)

    $messages.appendChild($newMessage)
    $container.scrollTop = $container.scrollHeight

    return $text
}