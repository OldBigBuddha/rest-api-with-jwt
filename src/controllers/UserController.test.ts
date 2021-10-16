import rewire from "rewire"
const UserController = rewire("./UserController")
const generateToken = UserController.__get__("generateToken")
// @ponicode
describe("generateToken", () => {
    test("0", () => {
        let callFunction: any = () => {
            generateToken({ name: "George", password: "accessdenied4u", role: "admin" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            generateToken({ name: "Michael", password: "!Lov3MyPianoPony", role: "watcher" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            generateToken({ name: "Jean-Philippe", password: "YouarenotAllowed2Use", role: "watcher" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            generateToken({ name: "Michael", password: "accessdenied4u", role: "watcher" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            generateToken({ name: "George", password: "$p3onyycat", role: "admin" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            generateToken({ name: "", password: "", role: "watcher" })
        }
    
        expect(callFunction).not.toThrow()
    })
})
