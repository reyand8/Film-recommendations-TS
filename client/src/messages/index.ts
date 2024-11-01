import enMessages from './en-US';
import ukMessages from './uk-UA';
import deMessages from './de-DE';
import ruMessages from './ru-RU';
import esMessages from './es-ES';
import {IAllMessages} from "../types/messages.interface";

const allMessages: IAllMessages = {
    'en-US': enMessages,
    'uk-UA': ukMessages,
    'de-DE': deMessages,
    'es-ES': esMessages,
    'ru-RU': ruMessages,
};

export default allMessages;