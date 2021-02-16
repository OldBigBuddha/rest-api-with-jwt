import express from "express";

type Role = "admin" | "member" | "watcher";
type Content = {
  id: number;
  title: string;
  content: string;
  accessable: Role;
  createdAt: Date;
};

type SpecificContentParams = {
  id: number;
};

const DUMMY_CONTENTS: Content[] = [
  {
    id: 1,
    title: "title",
    content: "hogehoge",
    accessable: "admin",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "title",
    content: "hogehoge",
    accessable: "member",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "title",
    content: "hogehoge",
    accessable: "watcher",
    createdAt: new Date(),
  },
];

// GET /api/contents
export const findAll = (
  _: express.Request,
  res: express.Response<Content[]>
): express.Response<Content[]> => {
  return res.json(DUMMY_CONTENTS);
};

// POST /api/contents
export const addOne = (
  req: express.Request,
  res: express.Response
): express.Response => {
  return res.status(201).json("NOT IMPLEMENTED");
};

// GET /api/contents/:id
export const findOne = (
  req: express.Request<SpecificContentParams>,
  res: express.Response<Content>
): express.Response<Content> => {
  const userId = req.params.id;
  if (userId > DUMMY_CONTENTS.length) {
    return res.status(404).json();
  }
  return res.json(DUMMY_CONTENTS[userId - 1]);
};

// PUT /api/contents/:id
export const updateOne = (
  req: express.Request<SpecificContentParams>,
  res: express.Response
): express.Response => {
  return res.json(`NOT IMPLEMENTED id:${req.params.id}`);
};

// DELETE /api/contents/:id
export const deleteOne = (
  req: express.Request<SpecificContentParams>,
  res: express.Response
): express.Response => {
  return res.json(`NOT IMPLEMENTED id:${req.params.id}`);
};
