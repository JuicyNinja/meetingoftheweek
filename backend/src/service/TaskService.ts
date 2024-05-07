import { TaskRepository } from "../repositories";

export const fetchPaginatedData = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const tasks = await TaskRepository.findAll();

    const paginatedData = tasks.slice(startIndex, endIndex);
    const nextPage = endIndex < tasks.length ? page + 1 : null;

    return { paginatedData, nextPage };
}
