import contentRouter from "../../src/routes/contents";
import * as ContentController from "../../src/controllers/ContentController";

jest.mock("Express", () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
}));
jest.mock("../../src/controllers/ContentController.ts");

describe("src/routes/content.ts", () => {
  test("'GET /api/contents' では ContentController.findAll が呼ばれる。", () => {
    expect(contentRouter.get).toHaveBeenCalledWith(
      "/",
      ContentController.findAll
    );
  });

  test("'POST /api/contents/' では ContentController.addOne が呼ばれる。", () => {
    expect(contentRouter.post).toHaveBeenCalledWith(
      "/",
      ContentController.addOne
    );
  });

  test("'GET /api/contents/:id' では ContentController.findOne が呼ばれる。", () => {
    expect(contentRouter.get).toHaveBeenCalledWith(
      "/:id",
      ContentController.findOne
    );
  });

  test("'PUT /api/contents/:id' では ContentController.updateOne が呼ばれる。", () => {
    expect(contentRouter.put).toHaveBeenCalledWith(
      "/:id",
      ContentController.updateOne
    );
  });

  test("'DELETE /api/contents/:id' では ContentController.deleteOne が呼ばれる。", () => {
    expect(contentRouter.delete).toHaveBeenCalledWith(
      "/:id",
      ContentController.deleteOne
    );
  });
});
