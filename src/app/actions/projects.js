"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";



export const getProjects = async () => {
  let user = await auth();
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: user.user.userId },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { error: error.message };
  }
};

// create project
export const createProject = async ({ content }) => {
  let user = await auth();

  try {
    const project = await prisma.project.create({
      data: content,
      where: { userId: user.user.userId },
    });

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: error.message };
  }
};

// delete project
export const deleteProject = async ({ id }) => {
  let user = await auth();
  try {
    const project = await prisma.project.delete({
      where: { id: id, userId: user.user.userId },
    });

    return project;
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: error.message };
  }
};


// save article

export const saveArticle = async ({ content , projectId }) => {

  try {
    const article = await prisma.article.create({
      data: {
        content: content,
        projectId: projectId,
      },
     });

    return article;
  } catch (error) {
    console.error("Error saving article:", error);
    return { error: error.message };
  }
}