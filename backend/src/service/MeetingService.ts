import { MeetingRepository } from "../repositories";

export const fetchPaginatedData = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const meetings = await MeetingRepository.findAll();

    const paginatedData = meetings.slice(startIndex, endIndex);
    const nextPage = endIndex < meetings.length ? page + 1 : null;

    return { paginatedData, nextPage };
}
