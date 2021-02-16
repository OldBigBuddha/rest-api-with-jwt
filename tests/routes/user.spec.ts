import userRouter from "../../src/routes/user";
import * as UserController from "../../src/controllers/UserController";

jest.mock("Express", () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
}));
jest.mock("../../src/controllers/UserController.ts");

describe("src/routes/user.ts", () => {
  test("'GET /api/users' では UserController.findAll が呼ばれる。", () => {
    expect(userRouter.get).toHaveBeenCalledWith("/", UserController.findAll);
  });

  test("'POST /api/users/' では UserController.addOne が呼ばれる。", () => {
    expect(userRouter.post).toHaveBeenCalledWith("/", UserController.addOne);
  });

  test("'GET /api/users/:id' では UserController.findOne が呼ばれる。", () => {
    expect(userRouter.get).toHaveBeenCalledWith("/:id", UserController.findOne);
  });

  test("'PUT /api/users/:id' では UserController.updateOne が呼ばれる。", () => {
    expect(userRouter.put).toHaveBeenCalledWith(
      "/:id",
      UserController.updateOne
    );
  });

  test("'DELETE /api/users/:id' では UserController.deleteOne が呼ばれる。", () => {
    expect(userRouter.delete).toHaveBeenCalledWith(
      "/:id",
      UserController.deleteOne
    );
  });
});
