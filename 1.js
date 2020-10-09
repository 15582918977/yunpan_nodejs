class node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class list {
    constructor() {
        this.size = 0
        this.head = null
    }


    foreach(it) {
        let p = this.head
        while (p !== null) {
            it(p.value)
            p = p.next
        }
    }


    insert(value) {
        this.size++
        if (this.head === null) {
            this.head = new node(value, null)
        } else {
            let old_head = this.head
            this.head = new node(value, old_head)
        }
    }
    search(index){
        if(index<0||index>this.size) return;
        let p = this.head;
        let count = -1;
        while(p){
            count++;
            if(index===count){
                return p
            }
            p = p.next;
        }
    }
    delete(index) {
        if (0 <= index && index <= this.size - 1) {
            if(index===0&&this.size!==0){

                this.head = this.head.next;
            }
            else if(index===0&&this.size===1){
                this.head=null;
            }
            else if(index===this.size-1){
                let node = this.search(this.size-2);
                node.next = null;
            }else{
                let node = this.search(index-1);
                let current = node.next;
                node.next = current.next;
            }

        } else {
            throw "index is not right"
        }
    }

}

let l = new list()
l.insert(2)
l.insert(3)
l.insert(4)
console.log("size:" + l.size)

l.insert(3)
l.insert(4)
l.delete(4)
l.foreach(function (it) {
    console.log(it)
})