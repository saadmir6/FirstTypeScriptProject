import './css/style.css'
import FullList from './models/FullListItems'
import ListItem from './models/ListItems'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance
    const templates = ListTemplate.instance

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault()

        const input  = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if (!newEntryText.length) return

        const itemId: number = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) // Targets the input with the last id 
        + 1 : 1

        const newItem = new ListItem(itemId.toString(), newEntryText)

        fullList.addItem(newItem)

        templates.render(fullList)

    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        templates.clear()
    })
    fullList.load()
    templates.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)