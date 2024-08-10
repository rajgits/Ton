import "@stdlib/deploy";

message Add{
    queryId : Int as uint64;
    amount: Int as uint32;
}
contract Defi with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    id: Int as uint32;
    counter: Int as uint32; 
    
    init(msg: Int) {
        self.id = msg;
        self.counter =  0;
    }

    receive(msg: Add){
        self.counter += msg.amount;
    }

    get fun counter(): Int{
        return self.counter;
    }

    get fun id(): Int{
        return self.id;
    }
}
