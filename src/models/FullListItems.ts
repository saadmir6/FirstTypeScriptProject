import ListItem from "./ListItems";

interface List {

    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    remove(id: string) : void,
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor (
        private _list: ListItem[] = []
    ){}

    get list():ListItem[] { return this._list }

    load(): void {
        const storeItems : string | null = localStorage.getItem("myList")
        if ( typeof storeItems !== "string" ) return 

        const parsedList: { _id: string, _item:string, _checked: boolean }[] = JSON.parse(storeItems) 

        parsedList.forEach(itemObj => {
           const newListItem = new ListItem( itemObj._id, itemObj._item, itemObj._checked )  
           FullList.instance.addItem(newListItem)
        })


        
    }

    save(): void { 
        localStorage.setItem("myList", JSON.stringify(this._list))
     }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    remove(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }




}