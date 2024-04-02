import { createContext } from "react";
import { TodoistApi } from '@doist/todoist-api-typescript'

export const apiContext = createContext(new TodoistApi(''))