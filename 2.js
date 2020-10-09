class node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class list {
    constructor() {
        this.size = 1
        this.head = new node(null,null);
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

        if (this.head.next == null) {
            this.head.next = new node(value, null)
        } else {
            let firstnode = this.head.next;
            this.head.next = new node(value,firstnode)
        }
    }
    search(index){
        if(index<0||index>this.size-1) return;
        let p = this.head.next;
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
        if (1 <= index && index <= this.size - 2) {

                let node = this.search(index-1);
                let current = node.next;
                node.next = current.next;

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