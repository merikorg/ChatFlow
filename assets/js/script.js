
import {CreateMLCEngine} from "https://esm.run/@mlc-ai/web-llm";

const SELECTED_MODEL = 'gemma-2b-it-q4f32_1-MLC';

const engine = await CreateMLCEngine(
    SELECTED_MODEL,
    {
        initProgressCallback: (info)=>{
            console.log('initProgress', info);
        }
    }
) 

const $ = el => document.querySelector(el)

const $form = $('form')
const $input = $('input')
const $template = $('#message-template')
const $messages = $('ul')
const $container = $('main')
const $button = $('button')

$form.addEventListener('submit', event=>{
    event.preventDefault()
    const messageText = $input.value.trim()

    if(messageText !=''){
        $input.value = ''
    }

    addMessage(messageText, 'user')
    $button.setAttribute('disabled',true)

    setTimeout(()=>{
        addMessage('hola','bot')
        $button.removeAttribute('disabled')
    },2000)
})

function addMessage(text, sender){
    const cloneTemplate = $template.content.cloneNode(true)
    const $newMessage = cloneTemplate.querySelector('.message')

    const $who = $newMessage.querySelector('span')
    const $text = $newMessage.querySelector('p')

    $text.textContent = text;
    $who.textContent = sender === 'bot' ? 'IA':'Tú';
    $newMessage.classList.add(sender)

    $messages.appendChild($newMessage)
    $container.scrollTop = $container.scrollHeight
}